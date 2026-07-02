import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'
import * as THREE from 'three'

import { MatricesShader } from './MatricesShader'
import { MatrixInput } from './MatrixInput'
import { IDENTITY_MATRIX_ELEMENTS } from './utils'

export function MatricesPage() {
    const store = useCreateStore()

    const [matrixElements, setMatrixElements] = useState(
        IDENTITY_MATRIX_ELEMENTS
    )

    const transformationMatrix = useMemo(() => {
        const numericElements = matrixElements.map((element) => {
            const parsedValue = parseFloat(element)
            return isNaN(parsedValue) ? 0 : parsedValue
        })

        return new THREE.Matrix4().set(...numericElements)
    }, [matrixElements])

    const handleMatrixChange = (index, newValue) => {
        setMatrixElements((previousElements) => {
            const nextElements = [...previousElements]
            nextElements[index] = newValue

            return nextElements
        })
    }

    return (
        <>
            <LevaPanel
                store={store}
                theme={{ sizes: { rootWidth: '350px' } }}
            />
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[2, 2, 2]}
                />
                <color args={['#f7eed5']} attach="background" />
                <OrbitControls makeDefault />
                <MatricesShader
                    store={store}
                    transformationMatrix={transformationMatrix}
                />
                <gridHelper args={[10, 10]} />
            </Canvas>
            <MatrixInput
                matrixElements={matrixElements}
                onChange={handleMatrixChange}
            />
        </>
    )
}
