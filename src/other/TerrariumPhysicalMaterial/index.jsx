import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Experience } from './Experience'

export function TerrariumPhysicalMaterial() {
    return (
        <Canvas
            flat
            camera={{
                fov: 45,
                near: 0.1,
                far: 31,
                position: [3.8, 1.6, -1.5],
            }}
            gl={{ stencil: true }}
        >
            <OrbitControls
                makeDefault
                maxDistance={30}
                minDistance={2}
                target={[0, 1.2, 0]}
            />

            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
    )
}
