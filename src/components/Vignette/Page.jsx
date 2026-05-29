import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { VignetteShader } from './VignetteShader'
import { Explanation } from '../layout/Explanation/Explanation'
import { Image } from '../layout/Image/Image.jsx'

export function VignetteShaderPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <VignetteShader store={store} />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
            <Explanation title="Vignette">
                <p>
                    <strong>Step 1: draw a circle</strong>
                </p>
                <p>
                    We calculate the distance between the vector UV and the
                    center of the plane:
                </p>
                <p>
                    <code>float strength = length(vec2(0.5) - vUv);</code>
                </p>
                <Image src="./drawings/distance-to-center.jpg" />
                <p>
                    This gives us a blurry shape that is darker at the center
                    and lighter at the edges.
                </p>
                <p>
                    <strong>Step 2: invert</strong>
                </p>
                <p>
                    To invert it and make the shape sharper, we then divide a
                    small value (<code>uScale</code>) by our result:
                </p>
                <p>
                    <code>strength = uScale / strength;</code>
                </p>
                <p>
                    Finally, to make the edges of the plane completely dark, we
                    subtract yet another small value:{' '}
                    <code>uHaloThreshold</code>.
                </p>
                <p>
                    <code>strength = uScale / strength - uHaloThreshold;</code>
                </p>
            </Explanation>
        </>
    )
}
