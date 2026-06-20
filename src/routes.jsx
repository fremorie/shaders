import { GradientShaderPage } from './components/Gradient/Page'
import { HomePage } from './components/Home/Page'
import { SmoothstepShaderPage } from './components/Smoothstep/Page'
import { StripesShaderPage } from './components/Stripes/Page'
import { VignetteShaderPage } from './components/Vignette/Page'
import { GradientStripesShaderPage } from './components/GradientStripes/Page'
import { ColoredGradientStripesShaderPage } from './components/ColoredGradientStripes/Page'
import { SDFCircleShaderPage } from './components/SDFCircle/Page'
import { SpiralShaderPage } from './components/Spiral/Page'
import { WavySpiralShaderPage } from './components/WavySpiral/Page'
import { SDFSphereShaderPage } from './components/SDFSphere/Page'
import { PulsatingSpiralShaderPage } from './components/PulsatingSpiral/Page'
import { StencilBufferPage } from './components/StencilBuffer/Page'
import { GlassBottle } from './models/GlassBottle'
import { LowPolyGlassBottle } from './models/LowPolyGlassBottle'
import { Sakura } from './models/Sakura'
import { SakuraV2 } from './models/SakuraV2'
import { BottledSakura } from './models/BottledSakura'
import { SakuraScene } from './models/SakuraScene'
import { SakuraSceneBaked } from './models/SakuraSceneBaked'
import { SpringShadedRiver } from './models/SpringShadedRiver'
import { SpringInABottle } from './scenes/SpringInABottle'
import { WinterV1 } from './models/WinterV1'
import { WinterV2 } from './models/WinterV2'
import { WinterV3 } from './models/WinterV3'
import { WinterSceneBaked } from './models/WinterSceneBaked'
import { GrassPage } from './components/Grass/Page'
import { Butterfly } from './models/Butterfly'
import { DistanceFieldShaderPage } from './components/DistanceField/Page'
import { TerrariumPhysicalMaterial } from './other/TerrariumPhysicalMaterial'
import { TerrariumTransmissionMaterial } from './other/TerrariumTransmissionMaterial'

export const ROUTES = [
    {
        path: '/shaders/',
        label: 'About',
        element: <HomePage />,
    },

    {
        path: '/shaders/spiral',
        label: 'Spiral',
        element: <SpiralShaderPage />,
        section: 'Experiments',
    },
    {
        path: '/shaders/wavy-spiral',
        label: 'Wavy Spiral',
        element: <WavySpiralShaderPage />,
        section: 'Experiments',
    },
    {
        path: '/shaders/pulsating-spiral',
        label: 'Pulsating Spiral',
        element: <PulsatingSpiralShaderPage />,
        section: 'Experiments',
    },
    {
        path: '/shaders/stencil-buffer',
        label: 'Stencil Buffer',
        element: <StencilBufferPage />,
        section: 'Experiments',
    },
    {
        path: '/shaders/grass',
        label: 'Grass',
        element: <GrassPage />,
        section: 'Experiments',
    },

    // Scenes
    {
        path: '/shaders/spring-in-a-bottle',
        label: 'Terrarium',
        element: <SpringInABottle />,
        section: 'Scenes',
    },

    // Models
    {
        path: '/shaders/glass-bottle',
        label: 'Glass bottle',
        element: <GlassBottle />,
        section: 'Models',
    },
    {
        path: '/shaders/low-poly-glass-bottle',
        label: 'Low poly glass bottle',
        element: <LowPolyGlassBottle />,
        section: 'Models',
    },
    {
        path: '/shaders/low-poly-sakura-tree',
        label: 'Low poly sakura tree',
        element: <Sakura />,
        section: 'Models',
    },
    {
        path: '/shaders/low-poly-sakura-tree-v2',
        label: 'Low poly sakura tree, version 2',
        element: <SakuraV2 />,
        section: 'Models',
    },
    {
        path: '/shaders/bottled-sakura',
        label: 'Sakura in a bottle',
        element: <BottledSakura />,
        section: 'Models',
    },
    {
        path: '/shaders/spring',
        label: 'Spring',
        element: <SakuraScene />,
        section: 'Models',
    },
    {
        path: '/shaders/spring-baked',
        label: 'Spring (baked)',
        element: <SakuraSceneBaked />,
        section: 'Models',
    },
    {
        path: '/shaders/spring-river-shader',
        label: 'Spring (baked, with river shader)',
        element: <SpringShadedRiver />,
        section: 'Models',
    },
    {
        path: '/shaders/winter-v1',
        label: 'Winter V1',
        element: <WinterV1 />,
        section: 'Models',
    },
    {
        path: '/shaders/winter-v2',
        label: 'Winter V2',
        element: <WinterV2 />,
        section: 'Models',
    },
    {
        path: '/shaders/winter-v3',
        label: 'Winter V3',
        element: <WinterV3 />,
        section: 'Models',
    },
    {
        path: '/shaders/winter-baked',
        label: 'Winter (baked)',
        element: <WinterSceneBaked />,
        section: 'Models',
    },
    {
        path: '/shaders/butterfly',
        label: 'Butterfly',
        element: <Butterfly />,
        section: 'Models',
    },

    // Basics
    {
        path: '/shaders/gradient',
        label: 'Gradient',
        element: <GradientShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/smoothstep',
        label: 'Smooth step',
        element: <SmoothstepShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/stripes',
        label: 'Stripes',
        element: <StripesShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/vignette',
        label: 'Vignette',
        element: <VignetteShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/gradient-stripes',
        label: 'Gradient stripes',
        element: <GradientStripesShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/colored-gradient-stripes',
        label: 'Colored gradient stripes',
        element: <ColoredGradientStripesShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/distance-field',
        label: 'Distance Field',
        element: <DistanceFieldShaderPage />,
        section: 'Basics',
    },

    // SDF
    {
        path: '/shaders/sdf-circle',
        label: 'SDF Circle',
        element: <SDFCircleShaderPage />,
        section: 'Basics',
    },
    {
        path: '/shaders/sdf-sphere',
        label: 'Ray marching: Sphere',
        element: <SDFSphereShaderPage />,
        section: 'Basics',
    },

    // Other
    {
        path: '/shaders/terrarium-physical-material',
        label: 'Stencil buffer: MeshPhysicalMaterial',
        element: <TerrariumPhysicalMaterial />,
        section: 'Other',
    },
    {
        path: '/shaders/terrarium-transmission-material',
        label: 'Stencil buffer: MeshTransmissionMaterial',
        element: <TerrariumTransmissionMaterial />,
        section: 'Other',
    },
]
