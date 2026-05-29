import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { StripesShader } from './StripesShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function StripesShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <StripesShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Stripes">
                <p>
                    This fragment shader uses <code>mod</code> to create a
                    repeating gradient pattern along the Y axis:
                </p>

                <pre>
                    {`float strength = mod(vUv.y * uRepeatCount, uModulo);`}
                </pre>

                <p>The result is visualized as a grayscale color:</p>

                <pre>{`vec4 color = vec4(vec3(strength), 1.0);`}</pre>

                <p>
                    You can experiment by adjusting <code>uRepeatCount</code> to
                    control how many times the pattern repeats, and{' '}
                    <code>uModulo</code> to control the wrapping range.
                </p>

                <p>
                    <strong>How it works</strong>
                </p>

                <p>
                    <code>mod(x, y)</code> returns the remainder of{' '}
                    <code>x / y</code>. In this shader, the UV coordinate is
                    first scaled, then wrapped into a repeating interval.
                </p>

                <ul>
                    <li>
                        <code>vUv.y * uRepeatCount</code> scales the UV space
                    </li>
                    <li>
                        <code>mod(..., uModulo)</code> wraps the value
                        repeatedly
                    </li>
                    <li>The result cycles between 0.0 and the modulo value</li>
                </ul>

                <p>
                    <strong>Intuition</strong>
                </p>

                <p>It makes the gradient restart over and over again.</p>
            </Explanation>
        </>
    )
}
