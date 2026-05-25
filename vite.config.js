import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
    base: '/shaders/',
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        glsl(),
    ],
    server: {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
})
