import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Bush } from './Bush'
import { Ground } from './Ground'
import { Explanation } from '../layout/Explanation/Explanation.jsx'

export function BushPage() {
    return (
        <>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-8, 3, 10],
                }}
                shadows
            >
                <color args={['#ffffff']} attach="background" />

                <OrbitControls makeDefault />

                <directionalLight
                    castShadow
                    position={[1, 2, 3]}
                    intensity={4.5}
                    shadow-normalBias={0.04}
                />
                <ambientLight intensity={1.5} />

                <Bush />
                <Ground />
            </Canvas>
            <Explanation title="Credits">
                <p>Inspired by Bruno Simon's video:</p>

                <p>
                    <a
                        target="_blank"
                        href="https://youtu.be/cesPK0kYkyE?si=lZsxgFWYpX_o_CF5&t=54"
                    >
                        https://youtu.be/cesPK0kYkyE?si=lZsxgFWYpX_o_CF5&t=54
                    </a>
                </p>
            </Explanation>
        </>
    )
}
