import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import { Home } from './Home'

export function HomePage() {
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                fov={45}
                near={0.1}
                far={200}
                position={[0, 0, 10]}
            />
            <Home />
        </Canvas>
    )
}
