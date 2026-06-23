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
            positions.push([x, intersections[0].point.y, z])
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
                centerX: { value: 0, min: -1, max: 1, step: 0.01 },
                centerZ: { value: 0, min: -1, max: 1, step: 0.01 },
                radius: { value: 0.01, min: 0.01, max: 2, step: 0.01 },
                count: { value: 20, min: 1, max: 1000, step: 1 },
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

    const clampA = getGrassBladesPositions(
        terrainRaycasterMesh,
        [-1, -0.13],
        0.08,
        102
    )

    const clampB = getGrassBladesPositions(
        terrainRaycasterMesh,
        [-0.05, -0.9],
        0.08,
        38
    )

    const clampC = getGrassBladesPositions(
        terrainRaycasterMesh,
        [-0.11, -0.25],
        0.08,
        108
    )

    const clampD = getGrassBladesPositions(
        terrainRaycasterMesh,
        [-0.12, -0.12],
        0.04,
        20
    )

    const clampE = getGrassBladesPositions(
        terrainRaycasterMesh,
        [0.22, 0.01],
        0.1,
        55
    )

    const clampF = getGrassBladesPositions(
        terrainRaycasterMesh,
        [0.33, 0.13],
        0.07,
        67
    )

    const clampG = getGrassBladesPositions(
        terrainRaycasterMesh,
        [0.44, 0.79],
        0.04,
        26
    )

    const clampH = getGrassBladesPositions(
        terrainRaycasterMesh,
        [-0.47, 0.41],
        0.08,
        60
    )

    const clamps = useMemo(
        () => [
            ...clampA,
            ...clampB,
            ...clampC,
            ...clampD,
            ...clampE,
            ...clampF,
            ...clampG,
            ...clampH,
            ...grassClampActive,
        ],
        // eslint-disable-next-line
        [grassClampActive]
    )

    return (
        <>
            <SpringModel />
            <GrassField positions={clamps} />
        </>
    )
}
