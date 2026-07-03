import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'
import * as THREE from 'three'

import { MatricesShader } from './MatricesShader'
import { MatrixInput } from './MatrixInput'
import {
    DEFAULT_VIEW_MATRIX_ELEMENTS,
    viewMatrixToDisplayElements,
} from './utils'

import { AxesHelper } from '../common/AxesHelper'

// Mirrors the active camera's view matrix (matrixWorldInverse) into the matrix
// input whenever it changes, so orbiting the camera updates the displayed
// matrix. Lives inside the Canvas because it needs useThree/useFrame.
function CameraMatrixTracker({ onCameraMatrixChange }) {
    const camera = useThree((state) => state.camera)
    const previousElementsRef = useRef(null)

    useFrame(() => {
        const nextElements = viewMatrixToDisplayElements(
            camera.matrixWorldInverse
        )

        const previousElements = previousElementsRef.current
        const hasChanged =
            previousElements === null ||
            nextElements.some(
                (element, index) => element !== previousElements[index]
            )

        if (hasChanged) {
            previousElementsRef.current = nextElements
            onCameraMatrixChange(nextElements)
        }
    })

    return null
}

export function ViewMatrixPage() {
    const store = useCreateStore()

    const [matrixElements, setMatrixElements] = useState(
        DEFAULT_VIEW_MATRIX_ELEMENTS
    )

    const viewMatrix = useMemo(() => {
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
                <CameraMatrixTracker onCameraMatrixChange={setMatrixElements} />
                <MatricesShader store={store} viewMatrix={viewMatrix} />
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
