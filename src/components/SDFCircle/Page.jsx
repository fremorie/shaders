import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { SDFCircleShader } from './SDFCircleShader.jsx'

export function SDFCircleShaderPage() {
    return (
        <>
            <Canvas>
                <SDFCircleShader />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}
