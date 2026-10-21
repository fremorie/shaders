import { writeFileSync } from 'node:fs'

import * as THREE from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'

import { createFoliage } from '../src/components/Bush/utils/foliage.js'

// GLTFExporter builds the GLB binary chunk with FileReader, the one browser
// global Node lacks here. Blob is already native, so this is all it needs.
if (typeof globalThis.FileReader === 'undefined') {
    globalThis.FileReader = class {
        readAsArrayBuffer(blob) {
            blob.arrayBuffer().then((result) => {
                this.result = result
                this.onloadend()
            })
        }
    }
}

// `flat` is the camera-facing foliage; `nice` mirrors the scene in
// src/components/Bush/Bush.jsx: fully rotated leaves and its material values
const PRESETS = {
    flat: {
        output: 'bush.glb',
        frontSide: true,
        color: '#7aa823',
        alphaTest: 0.7,
        bushes: [
            { name: 'BushA', seed: 'bushA', x: 0 },
            { name: 'BushB', seed: 'bushB', x: 6 },
            { name: 'BushC', seed: 'bushC', x: 12 },
        ],
    },
    nice: {
        output: 'niceBushes.glb',
        frontSide: false,
        color: '#597932',
        alphaTest: 0.5,
        bushes: [
            { name: 'BushC_Left', seed: 'bushC', x: -6 },
            { name: 'BushA', seed: 'bushA', x: 0 },
            { name: 'BushB', seed: 'bushB', x: 6 },
            { name: 'BushC', seed: 'bushC', x: 12 },
        ],
    },
}

const presetName = process.argv[2] ?? 'flat'
const preset = PRESETS[presetName]

if (!preset) {
    throw new Error(
        `Unknown preset "${presetName}", expected one of: ${Object.keys(PRESETS).join(', ')}`
    )
}

const OUTPUT_PATH = new URL(
    `../public/models/${preset.output}`,
    import.meta.url
)

// glTF has no alphaMap slot, so the leaf cutout cannot travel inside the file.
// Reattach foliage.png on load, or bake it into the alpha channel of a
// baseColorTexture. MASK rather than BLEND: the exporter drops alphaTest
// entirely when transparent is true, and cutout foliage does not want sorting.
const foliageMaterial = new THREE.MeshStandardMaterial({
    name: 'Foliage',
    color: preset.color,
    alphaTest: preset.alphaTest,
    transparent: false,
    side: THREE.FrontSide,
})

const scene = new THREE.Scene()
scene.name = 'Foliage'

// Bushes sharing a seed share one geometry, so the GLB stores it only once
const geometries = new Map()

for (const bush of preset.bushes) {
    if (!geometries.has(bush.seed)) {
        geometries.set(bush.seed, createFoliage(bush.seed, preset.frontSide))
    }

    const mesh = new THREE.Mesh(geometries.get(bush.seed), foliageMaterial)
    mesh.name = bush.name
    mesh.position.x = bush.x
    mesh.castShadow = true
    mesh.receiveShadow = true

    scene.add(mesh)
}

const glb = await new GLTFExporter().parseAsync(scene, { binary: true })

writeFileSync(OUTPUT_PATH, Buffer.from(glb))

console.log(
    `Wrote ${(glb.byteLength / 1024).toFixed(1)} kB to ${OUTPUT_PATH.pathname}`
)
