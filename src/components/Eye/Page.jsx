import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { EyeShader } from './EyeShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function EyeShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel
                store={store}
                theme={{ sizes: { rootWidth: '350px' } }}
            />
            <Canvas>
                <EyeShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Credits">
                <p>Created by following this video by Inigo Quilez:</p>

                <p>
                    <a
                        target="_blank"
                        href="https://www.youtube.com/watch?v=emjuqqyq_qc"
                    >
                        https://www.youtube.com/watch?v=emjuqqyq_qc
                    </a>
                </p>
            </Explanation>
        </>
    )
}
