import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { DistanceFieldShader } from './DistanceFieldShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function DistanceFieldShaderPage() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <DistanceFieldShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Credits">
                <p>
                    From The Book of Shaders:{' '}
                    <a target="_blank" href="https://thebookofshaders.com/12/">
                        Cellular Noise
                    </a>
                </p>
            </Explanation>
        </>
    )
}
