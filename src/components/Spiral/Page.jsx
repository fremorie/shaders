import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { SpiralShader } from './SpiralShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function SpiralShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <SpiralShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Credits">
                <p>
                    This shader uses a cosine palette implementation based on an
                    article by Inigo Quilez:
                </p>

                <p>
                    <a
                        target="_blank"
                        href="https://iquilezles.org/articles/palettes/"
                    >
                        iquilezles.org/articles/palettes
                    </a>
                </p>
            </Explanation>
        </>
    )
}
