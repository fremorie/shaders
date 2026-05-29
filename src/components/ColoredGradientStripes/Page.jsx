import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { ColoredGradientStripesShader } from './ColoredGradientStripesShader'

export function ColoredGradientStripesShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <ColoredGradientStripesShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}
