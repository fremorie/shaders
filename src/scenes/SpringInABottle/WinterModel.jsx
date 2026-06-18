import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'

import { SEASONS, useStencil } from './utils/stencilBuffer'
import vertexShader from './shaders/snow/vertex.glsl'
import fragmentShader from './shaders/snow/fragment.glsl'

const SnowMaterial = shaderMaterial(
    {
        uTime: 0,
        uBakedTexture: null,
        uPerlinNoise: null,
    },
    vertexShader,
    fragmentShader
)

extend({ SnowMaterial })

export function WinterModel() {
    const stencil = useStencil(SEASONS.winter)

    const { nodes } = useGLTF('./models/Winter/WinterMerged2.glb')
    const bakedTexture = useTexture('./models/Winter/BakedWinter.jpg')
    // eslint-disable-next-line
    bakedTexture.flipY = false

    const perlinNoise = useTexture('./textures/perlinNoise/perlin.png')

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.river002.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <meshPhysicalMaterial
                    anisotropy={0.5}
                    roughness={0.1}
                    color="#767D93"
                    {...stencil}
                />
            </mesh>
            <mesh
                geometry={nodes.snow001.geometry}
                position={[0.859, 0.707, -0.054]}
            >
                <snowMaterial
                    key={SnowMaterial.key}
                    uBakedTexture={bakedTexture}
                    uPerlinNoise={perlinNoise}
                    {...stencil}
                />
            </mesh>
            <mesh
                geometry={nodes.winterMerged.geometry}
                position={[0.316, 0.539, 0.82]}
            >
                <meshBasicMaterial map={bakedTexture} {...stencil} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Winter/WinterMerged2.glb')
useTexture.preload('./models/Winter/BakedWinter.jpg')
useTexture.preload('./textures/perlinNoise/perlin.png')
