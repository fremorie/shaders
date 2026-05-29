import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { WavySpiralShader } from './WavySpiralShader'

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
        </>
    )
}
