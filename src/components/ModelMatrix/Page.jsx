import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'
import * as THREE from 'three'

import { MatricesShader } from './MatricesShader'
import { MatrixInput } from './MatrixInput'
import { IDENTITY_MATRIX_ELEMENTS } from './utils'

import { AxesHelper } from '../common/AxesHelper'

export function ModelMatrixPage() {
    const store = useCreateStore()

    const [matrixElements, setMatrixElements] = useState(
        IDENTITY_MATRIX_ELEMENTS
    )

    const modelMatrix = useMemo(() => {
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
                    position={[10, 10, 10]}
                />
                <color args={['#f7eed5']} attach="background" />
                <OrbitControls makeDefault />
                <MatricesShader store={store} modelMatrix={modelMatrix} />
                <gridHelper args={[10, 10]} />
                <AxesHelper size={5} labels />
            </Canvas>
            <MatrixInput
                matrixElements={matrixElements}
                onChange={handleMatrixChange}
            />
        </>
    )
}
