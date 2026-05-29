import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { VignetteShader } from './VignetteShader'

export function VignetteShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <VignetteShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}
