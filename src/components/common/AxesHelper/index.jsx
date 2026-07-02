import * as THREE from 'three'

import { Arrow } from './Arrow'
import { Text } from '@react-three/drei'

const xMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000',
})

const yMaterial = new THREE.MeshBasicMaterial({
    color: '#00ff00',
})

const zMaterial = new THREE.MeshBasicMaterial({
    color: '#0000ff',
})

export function AxesHelper({ size = 1, labels }) {
    return (
        <>
            <Arrow material={xMaterial} size={size} label="X" />
            {labels && (
                <Text
                    color="#ff0000"
                    anchorX={-size + 0.025}
                    anchorY={0}
                    fontSize={0.2}
                >
                    X
                </Text>
            )}

            <Arrow
                material={yMaterial}
                size={size}
                rotation-z={Math.PI / 2}
                label="Y"
            />
            {labels && (
                <Text
                    color="#00ff00"
                    anchorX={-0.1}
                    anchorY={-size}
                    fontSize={0.2}
                >
                    Y
                </Text>
            )}

            <Arrow
                material={zMaterial}
                size={size}
                rotation-y={-Math.PI / 2}
                label="Z"
            />
            {labels && (
                <Text
                    color="#0000ff"
                    anchorX={0}
                    anchorY={0}
                    fontSize={0.2}
                    rotation-y={Math.PI / 2}
                    position-z={size}
                >
                    Z
                </Text>
            )}
        </>
    )
}
