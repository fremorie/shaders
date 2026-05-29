import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { TemplateShader } from './TemplateShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function TemplateShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <TemplateShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Lorem ipsum">Lorem ipsum</Explanation>
        </>
    )
}
