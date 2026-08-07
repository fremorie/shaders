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

const BUSHES = [
    { name: 'BushA', seed: 'bushA', x: 0 },
    { name: 'BushB', seed: 'bushB', x: 6 },
    { name: 'BushC', seed: 'bushC', x: 12 },
]

const OUTPUT_PATH = new URL('../public/models/bush.glb', import.meta.url)

// glTF has no alphaMap slot, so the leaf cutout cannot travel inside the file.
// Reattach foliage.png on load, or bake it into the alpha channel of a
// baseColorTexture. MASK rather than BLEND: the exporter drops alphaTest
// entirely when transparent is true, and cutout foliage does not want sorting.
const foliageMaterial = new THREE.MeshStandardMaterial({
    name: 'Foliage',
    color: '#7aa823',
    alphaTest: 0.7,
    transparent: false,
    side: THREE.FrontSide,
})

const scene = new THREE.Scene()
scene.name = 'Foliage'

for (const bush of BUSHES) {
    const mesh = new THREE.Mesh(createFoliage(bush.seed), foliageMaterial)
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
