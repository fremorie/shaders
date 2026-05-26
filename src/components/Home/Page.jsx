import { Canvas } from '@react-three/fiber'

import { Home } from './Home'

export function HomePage() {
    return (
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [4, -2, 6],
            }}
        >
            <Home />
        </Canvas>
    )
}
