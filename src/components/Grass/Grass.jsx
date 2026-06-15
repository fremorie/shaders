import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { folder, useControls } from 'leva'

import { GrassField } from './GrassField'
import { Terrain } from './Terrain'

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
                radius: { value: 1.2, min: 0.01, max: 2, step: 0.01 },
                count: { value: 50000, min: 1, max: 100000, step: 1 },
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

    return (
        <>
            <Terrain />
            <GrassField positions={grassClampActive} />
        </>
    )
}
