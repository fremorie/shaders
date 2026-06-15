import { useGLTF } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'
import { folder, useControls } from 'leva'

import { GrassField } from './GrassField'
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

export function SpringScene({ store }) {
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
                centerX: { value: 0.25, min: -1, max: 1, step: 0.01 },
                centerZ: { value: 0.25, min: -1, max: 1, step: 0.01 },
                radius: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
                count: { value: 100, min: 1, max: 1000, step: 1 },
            }),
        },
        { store }
    )

    const grassClamp1 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.17, -0.3],
                0.1,
                100
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp2 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.2, -0.4],
                0.06,
                58
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp3 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.42, 0.26],
                0.08,
                100
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp4 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.2, -0.8],
                0.07,
                100
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp5 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.1, -0.9],
                0.1,
                200
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp6 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.15, -0.4],
                0.1,
                100
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp7 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0.1, -0.5],
                0.09,
                100
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp8 = useMemo(
        () =>
            getGrassBladesPositions(terrainRaycasterMesh, [0, -0.6], 0.07, 60),
        [terrainRaycasterMesh]
    )
    const grassClamp9 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [-0.9, -0.2],
                0.06,
                60
            ),
        [terrainRaycasterMesh]
    )
    const grassClamp10 = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [-1, 0],
                0.05,
                100
            ),
        [terrainRaycasterMesh]
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

    const grassBladePositions = useMemo(
        () => [
            ...grassClampActive,
        ],
        [
            grassClampActive,
        ]
    )

    const grass = useMemo(
        () =>
            getGrassBladesPositions(
                terrainRaycasterMesh,
                [0, 0],
                1.2,
                10000
            ),
        [terrainRaycasterMesh]
    )

    return (
        <>
            <SpringModel />
            <GrassField positions={grassBladePositions} />
        </>
    )
}
