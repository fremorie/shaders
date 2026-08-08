import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import seedrandom from 'seedrandom'

const { alea } = seedrandom

const BUSH_RADIUS = 2
const LEAF_SIZE = 2
const SURFACE_BIAS = 3

export function createFoliage(seed) {
    const rng = alea(seed)

    const count = 100
    const planes = []

    for (let i = 0; i < count; i++) {
        const plane = new THREE.PlaneGeometry(LEAF_SIZE, LEAF_SIZE)

        // Position
        const radius = BUSH_RADIUS * (1 - Math.pow(rng(), SURFACE_BIAS))
        const spherical = new THREE.Spherical(
            radius,
            Math.PI * rng(),
            Math.PI * 2 * rng()
        )
        const position = new THREE.Vector3().setFromSpherical(spherical)

        plane.rotateX(rng() * 9999)
        plane.rotateY(rng() * 9999)
        plane.rotateZ(rng() * 9999)
        plane.translate(position.x, position.y, position.z)

        // Normal: point every vertex straight out from the bush centre, so the
        // foliage shades as one sphere rather than as 100 separate quads
        const normal = position.clone().normalize()
        const normalArray = new Float32Array(12)

        for (let vertexIndex = 0; vertexIndex < 4; vertexIndex++) {
            const i3 = vertexIndex * 3

            const vertexNormal = new THREE.Vector3(
                plane.attributes.position.array[i3],
                plane.attributes.position.array[i3 + 1],
                plane.attributes.position.array[i3 + 2]
            ).normalize()

            const mixedNormal = vertexNormal.lerp(normal, 0.4)

            normalArray[i3] = mixedNormal.x
            normalArray[i3 + 1] = mixedNormal.y
            normalArray[i3 + 2] = mixedNormal.z
        }

        plane.setAttribute('normal', new THREE.BufferAttribute(normalArray, 3))

        // Save the leaf twice with opposite winding, so it stays visible from both sides
        // const backFace = plane.clone()
        // backFace.setIndex([...plane.index.array].reverse())

        planes.push(plane)
    }

    // Merge all planes
    const finalGeometry = mergeGeometries(planes)

    if (!finalGeometry) {
        throw new Error('Failed to merge foliage geometries')
    }

    finalGeometry.translate(0, BUSH_RADIUS + LEAF_SIZE / 2, 0)

    return finalGeometry
}
