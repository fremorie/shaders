import { useEffect } from 'react'
import * as THREE from 'three'

import {
    OrbitControls,
    Text3D,
    Center,
    useMatcapTexture,
    Float,
} from '@react-three/drei'

export function Home() {
    const [matcapTexture] = useMatcapTexture('8194AB_D6DFEB_C0CEDE_B0BFD1', 256)

    useEffect(() => {
        // eslint-disable-next-line
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <OrbitControls makeDefault />

            <Center>
                <Float>
                    <Text3D
                        font={'./fonts/helvetiker_regular.typeface.json'}
                        size={0.35}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled={true}
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        All kinds of shaders
                        <meshMatcapMaterial matcap={matcapTexture} />
                    </Text3D>
                </Float>
            </Center>
        </>
    )
}
