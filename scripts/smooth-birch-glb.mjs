import { readFileSync, writeFileSync } from 'node:fs'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'

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

const INPUT_PATH = new URL('../public/models/Birch.glb', import.meta.url)
const OUTPUT_PATH = new URL(
    '../public/models/Birch_smooth.glb',
    import.meta.url
)

const source = readFileSync(INPUT_PATH)
const sourceArrayBuffer = source.buffer.slice(
    source.byteOffset,
    source.byteOffset + source.byteLength
)

const gltf = await new GLTFLoader().parseAsync(sourceArrayBuffer, '')

// A hard edge is baked into a glTF as split vertices: the triangles meeting
// along it each carry their own copy of the shared corner, so every copy can
// hold its own face normal. Recomputing normals in place would therefore change
// nothing, because no two of those triangles share a vertex to average across.
// So drop the normals first, weld the corners that now match, and let the
// recomputed normals average over the welded fans. Vertices that still differ in
// another attribute (a UV seam) stay split, which is the same hard edge Blender
// would export from a smooth-shaded mesh.
//
// A weld that merges nothing is the signal to stop: with no vertices joined,
// recomputing normals cannot add any smoothness, it can only overwrite whatever
// normals the mesh already carries. That is exactly the foliage case here, where
// every leaf card is a separate quad holding hand-authored normals that point
// out from the bush centre so the canopy shades as one sphere rather than as a
// pile of flat quads (see src/components/Bush/utils/foliage.js). Those meshes
// keep their original geometry untouched.
gltf.scene.traverse((object) => {
    if (!object.isMesh) return

    const originalGeometry = object.geometry
    const originalVertexCount = originalGeometry.attributes.position.count

    const smoothedGeometry = mergeVertices(
        originalGeometry.clone().deleteAttribute('normal')
    )
    const smoothedVertexCount = smoothedGeometry.attributes.position.count
    const weldedVertexCount = originalVertexCount - smoothedVertexCount

    if (weldedVertexCount === 0) {
        smoothedGeometry.dispose()

        console.log(
            `${object.name}: left as authored, no vertices to weld ` +
                `(${originalVertexCount} vertices)`
        )
        return
    }

    smoothedGeometry.computeVertexNormals()

    object.geometry = smoothedGeometry
    originalGeometry.dispose()

    console.log(
        `${object.name}: smoothed, ${originalVertexCount} -> ${smoothedVertexCount} vertices ` +
            `(${weldedVertexCount} welded)`
    )
})

const glb = await new GLTFExporter().parseAsync(gltf.scene, { binary: true })

writeFileSync(OUTPUT_PATH, Buffer.from(glb))

console.log(
    `Wrote ${(glb.byteLength / 1024).toFixed(1)} kB to ${OUTPUT_PATH.pathname}`
)
