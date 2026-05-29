import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { SmoothstepShader } from './SmoothstepShader'

export function SmoothstepShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <SmoothstepShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}
