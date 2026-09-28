// Captures a thumbnail of every page listed on the home page.
//
// Usage: start the dev server (`npm run dev`), then run
//   npm run screenshots [-- --base http://localhost:5173] [-- --only eye,blobs]
//
// Drives a headless Chrome through the DevTools protocol directly, so no extra
// dependency is needed. Screenshots land in public/screenshots/<slug>.jpg.

import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const CHROME_BINARY = process.env.CHROME_BINARY ?? 'google-chrome'
const DEBUGGING_PORT = 9333
const VIEWPORT_WIDTH = 1280
const VIEWPORT_HEIGHT = 800
const THUMBNAIL_SCALE = 0.5
const RENDER_WAIT_MILLISECONDS = 6000
const OUTPUT_DIRECTORY = resolve('public/screenshots')

// Overlays that belong to the chrome of the site, not to the sketch itself:
// the sidebar, credits, r3f-perf (positioned by corner class) and Leva panels
const HIDDEN_OVERLAYS_CSS = `
    .sidebar, .sidebar__trigger, .sidebar__backdrop, .explanation,
    .top-left, .top-right, .bottom-left, .bottom-right,
    [class*="-hideTitleBar-"] {
        display: none !important;
    }
`

// Pages that need a click before there is anything worth capturing
const ENTRY_BUTTON_LABELS = {
    'spring-in-a-bottle': 'Enter in silence',
}

function readArgument(name) {
    const index = process.argv.indexOf(`--${name}`)
    return index === -1 ? undefined : process.argv[index + 1]
}

function readRoutePaths() {
    const source = readFileSync(resolve('src/routes.jsx'), 'utf8')
    return Array.from(
        source.matchAll(/path: '(\/shaders\/[^']+)',[\s\S]*?section: '/g),
        (match) => match[1]
    )
}

function sleep(milliseconds) {
    return new Promise((resolvePromise) =>
        setTimeout(resolvePromise, milliseconds)
    )
}

async function waitForDebugger() {
    for (let attempt = 0; attempt < 50; attempt++) {
        try {
            const response = await fetch(
                `http://127.0.0.1:${DEBUGGING_PORT}/json/version`
            )
            if (response.ok) return
        } catch {
            // Chrome is still starting
        }
        await sleep(200)
    }
    throw new Error('Chrome did not open its debugging port')
}

async function openPageSession() {
    const response = await fetch(
        `http://127.0.0.1:${DEBUGGING_PORT}/json/new?about:blank`,
        { method: 'PUT' }
    )
    const target = await response.json()
    const socket = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolvePromise) =>
        socket.addEventListener('open', resolvePromise, { once: true })
    )

    let nextMessageId = 1
    const pendingCommands = new Map()

    socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        const pending = pendingCommands.get(message.id)
        if (!pending) return
        pendingCommands.delete(message.id)
        if (message.error) pending.reject(new Error(message.error.message))
        else pending.resolve(message.result)
    })

    function send(method, params = {}) {
        const id = nextMessageId++
        socket.send(JSON.stringify({ id, method, params }))
        return new Promise((resolvePromise, rejectPromise) =>
            pendingCommands.set(id, {
                resolve: resolvePromise,
                reject: rejectPromise,
            })
        )
    }

    return { send, close: () => socket.close() }
}

async function main() {
    const baseUrl = readArgument('base') ?? 'http://localhost:5173'
    const onlySlugs = readArgument('only')?.split(',')

    const routePaths = readRoutePaths().filter((routePath) => {
        const slug = routePath.replace('/shaders/', '')
        return !onlySlugs || onlySlugs.includes(slug)
    })

    mkdirSync(OUTPUT_DIRECTORY, { recursive: true })

    const chrome = spawn(
        CHROME_BINARY,
        [
            '--headless=new',
            `--remote-debugging-port=${DEBUGGING_PORT}`,
            `--user-data-dir=${mkdtempSync(join(tmpdir(), 'shaders-chrome-'))}`,
            '--enable-unsafe-swiftshader',
            '--use-angle=swiftshader',
            '--ignore-gpu-blocklist',
            '--autoplay-policy=no-user-gesture-required',
            '--mute-audio',
            `--window-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT}`,
        ],
        { stdio: 'ignore' }
    )

    try {
        await waitForDebugger()
        const page = await openPageSession()

        await page.send('Page.enable')
        await page.send('Emulation.setDeviceMetricsOverride', {
            width: VIEWPORT_WIDTH,
            height: VIEWPORT_HEIGHT,
            deviceScaleFactor: 1,
            mobile: false,
        })

        for (const routePath of routePaths) {
            const slug = routePath.replace('/shaders/', '')
            process.stdout.write(`${slug}… `)

            await page.send('Page.navigate', { url: baseUrl + routePath })
            await sleep(RENDER_WAIT_MILLISECONDS)

            const entryButtonLabel = ENTRY_BUTTON_LABELS[slug]
            if (entryButtonLabel) {
                await page.send('Runtime.evaluate', {
                    expression: `Array.from(document.querySelectorAll('button'))
                        .find((button) => button.textContent.trim() === ${JSON.stringify(entryButtonLabel)})
                        ?.click()`,
                })
                await sleep(RENDER_WAIT_MILLISECONDS)
            }

            await page.send('Runtime.evaluate', {
                expression: `(() => {
                    const style = document.createElement('style')
                    style.textContent = ${JSON.stringify(HIDDEN_OVERLAYS_CSS)}
                    document.head.appendChild(style)
                })()`,
            })
            await sleep(300)

            const { data } = await page.send('Page.captureScreenshot', {
                format: 'jpeg',
                quality: 82,
                clip: {
                    x: 0,
                    y: 0,
                    width: VIEWPORT_WIDTH,
                    height: VIEWPORT_HEIGHT,
                    scale: THUMBNAIL_SCALE,
                },
            })
            writeFileSync(
                join(OUTPUT_DIRECTORY, `${slug}.jpg`),
                Buffer.from(data, 'base64')
            )
            console.log('done')
        }

        page.close()
    } finally {
        chrome.kill()
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
