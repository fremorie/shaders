import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { StencilBuffer } from './StencilBuffer'

export function StencilBufferPage() {
    return (
        <Canvas gl={{ stencil: true }}>
            <PerspectiveCamera
                makeDefault
                fov={45}
                near={0.1}
                far={200}
                position={[5, 0, 4]}
            />
            <color args={['#ffffff']} attach="background" />
            <OrbitControls makeDefault />
            <StencilBuffer />
        </Canvas>
    )
}
