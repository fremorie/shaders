import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { TemplateShader } from './TemplateShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function TemplateShaderPage() {
    return (
        <>
            <Canvas>
                <TemplateShader />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Lorem ipsum">
                Lorem ipsum
            </Explanation>
        </>
    )
}
