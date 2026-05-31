import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Experience } from './Experience'

export function WinterInBottlePage() {
    return (
        <Canvas gl={{ stencil: true }}>
            <color args={['#ffffff']} attach="background" />
            <OrbitControls makeDefault />
            <Experience />
        </Canvas>
    )
}
