import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { MatricesShader } from './MatricesShader'

export function MatricesPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel
                store={store}
                theme={{ sizes: { rootWidth: '350px' } }}
            />
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[2, 2, 2]}
                />
                <color args={['#f7eed5']} attach="background" />
                <OrbitControls makeDefault />
                <MatricesShader store={store} />
            </Canvas>
        </>
    )
}
