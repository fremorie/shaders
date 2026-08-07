import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { alea } from 'seedrandom'

const rng = alea('foliage')

const BUSH_RADIUS = 2
const LEAF_SIZE = 2
const SURFACE_BIAS = 3

export function createFoliage() {
    const count = 200
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

        plane.rotateZ(rng() * 9999)

        // Normal
        const normal = position.clone().normalize()
        const normalArray = new Float32Array(12)
        for (let j = 0; j < 4; j++) {
            const i3 = j * 3

            const vertexPosition = new THREE.Vector3(
                plane.attributes.position.array[i3],
                plane.attributes.position.array[i3 + 1],
                plane.attributes.position.array[i3 + 2]
            )

            const mixedNormal = vertexPosition.lerp(normal, 0.85).normalize()

            normalArray[i3] = mixedNormal.x
            normalArray[i3 + 1] = mixedNormal.y
            normalArray[i3 + 2] = mixedNormal.z
        }

        plane.setAttribute('normal', new THREE.BufferAttribute(normalArray, 3))
        plane.translate(position.x, position.y, position.z)

        // Save
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
