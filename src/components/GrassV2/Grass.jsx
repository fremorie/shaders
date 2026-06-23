import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { folder, useControls } from 'leva'

import { GrassField } from '../common/Grass/GrassField'
import { SpringModel } from './SpringModel'

const TERRAIN_MESH_POSITION = new THREE.Vector3(0.005, 0.32, -0.003)
const RAYCAST_ORIGIN_HEIGHT = 5

const raycaster = new THREE.Raycaster()
const downDirection = new THREE.Vector3(0, -1, 0)
const rayOrigin = new THREE.Vector3()

const getGrassBladesPositions = (
    terrainRaycasterMesh,
    center,
    radius,
    count
) => {
    const positions = []
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.sqrt(Math.random()) * radius
        const x = center[0] + Math.cos(angle) * distance
        const z = center[1] + Math.sin(angle) * distance

        raycaster.set(rayOrigin.set(x, RAYCAST_ORIGIN_HEIGHT, z), downDirection)
        const intersections = raycaster.intersectObject(terrainRaycasterMesh)

        if (intersections.length > 0) {
            positions.push([
                x,
                // Push them down a little
                intersections[0].point.y - 0.01,
                z,
            ])
        }
    }
    return positions
}

export function Grass({ store }) {
    const { nodes } = useGLTF('./models/Spring/Terrain.glb')

    const terrainRaycasterMesh = useMemo(() => {
        const mesh = new THREE.Mesh(nodes.GrassPlane.geometry)
        mesh.position.copy(TERRAIN_MESH_POSITION)
        mesh.updateMatrixWorld(true)
        return mesh
    }, [nodes.GrassPlane.geometry])

    const { centerX, centerZ, radius, count } = useControls(
        {
            Grass: folder({
                //                 [-1, -0.13],
                //                 0.06,
                //                 102
                centerX: { value: -1, min: -1, max: 1, step: 0.01 },
                centerZ: { value: -0.13, min: -1, max: 1, step: 0.01 },
                radius: { value: 0.06, min: 0.01, max: 2, step: 0.01 },
                count: { value: 102, min: 1, max: 1000, step: 1 },
            }),
        },
        { store }
    )

    const grassClampActive = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [centerX, centerZ],
                radius,
                count
            ),
        [terrainRaycasterMesh, centerX, centerZ, radius, count]
    )

    const clamps = useMemo(
        () => [
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.94, -0.13],
                0.12,
                184
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.89, 0.05],
                0.1,
                102
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.05, -0.9],
                0.08,
                38
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.11, -0.25],
                0.08,
                108
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.12, -0.12],
                0.04,
                20
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.22, 0.01],
                0.1,
                55
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.33, 0.13],
                0.07,
                67
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.44, 0.79],
                0.04,
                26
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.47, 0.41],
                0.08,
                60
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.58, -0.24],
                0.05,
                73
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.61, -0.34],
                0.05,
                73
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.4, 0.47],
                0.09,
                143
            ),
            ...getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.33, 0.36],
                0.05,
                78
            ),
            ...grassClampActive,
        ],
        [grassClampActive, terrainRaycasterMesh]
    )

    return (
        <>
            <SpringModel />
            <GrassField positions={clamps} />
        </>
    )
}
