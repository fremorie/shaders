import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { SmoothstepShader } from './SmoothstepShader'
import { Explanation } from '../layout/Explanation/Explanation'

export function SmoothstepShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <SmoothstepShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Smoothstep">
                <p>
                    This fragment shader uses <code>smoothstep</code> to create
                    a smooth transition based on <code>vUv.x</code>:
                </p>

                <pre>
                    {`float strength = smoothstep(uEdge0, uEdge1, vUv.x);`}
                </pre>

                <p>The result is visualized as a grayscale color:</p>

                <pre>{`vec4 color = vec4(vec3(strength), 1.0);`}</pre>

                <p>
                    You can experiment by adjusting <code>uEdge0</code> and{' '}
                    <code>uEdge1</code> to control where the transition starts
                    and ends.
                </p>

                <p>
                    <strong>How it works</strong>
                </p>

                <p>
                    <code>smoothstep(edge0, edge1, x)</code> maps <code>x</code>{' '}
                    from <code>[edge0, edge1]</code> into a smooth 0 → 1
                    transition.
                </p>

                <ul>
                    <li>
                        <code>x &lt;= uEdge0</code> → 0.0 (black)
                    </li>
                    <li>
                        <code>x &gt;= uEdge1</code> → 1.0 (white)
                    </li>
                    <li>Between them → smooth interpolation</li>
                </ul>

                <p>
                    <strong>Intuition</strong>
                </p>

                <p>
                    It answers: how far is <code>vUv.x</code> between the two
                    edges, but with softened transitions instead of a hard
                    cutoff.
                </p>
            </Explanation>
        </>
    )
}
