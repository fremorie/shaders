import { RagingSeaPage } from './components/RagingSea/Page'
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
import { SpringInABottle } from './scenes/SpringInABottle/index.jsx'
import { WinterV1 } from './models/WinterV1'

export const ROUTES = [
    {
        path: '/shaders/',
        label: 'About',
        element: <HomePage />,
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
    // Scenes
    {
        path: '/shaders/spring-in-a-bottle',
        label: 'Spring in a bottle',
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

    // Three.js Journey
    {
        path: '/shaders/raging-sea',
        label: 'Raging Sea',
        element: <RagingSeaPage />,
        section: 'Three.js Journey',
    },
]
