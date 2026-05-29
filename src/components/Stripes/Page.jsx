import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { StripesShader } from './StripesShader'

export function StripesShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <StripesShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}
