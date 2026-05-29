import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { WavySpiralShader } from './WavySpiralShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function WavySpiralShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel
                store={store}
                theme={{ sizes: { rootWidth: '350px' } }}
            />
            <Canvas>
                <WavySpiralShader store={store} />
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
