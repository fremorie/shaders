import { RagingSeaPage } from './components/RagingSea/Page'
import { GradientShaderPage } from './components/Gradient/Page'
import { HomePage } from './components/Home/Page'
import { SmoothstepShaderPage } from './components/Smoothstep/Page'
import { StripesShaderPage } from './components/Stripes/Page'
import { VignetteShaderPage } from './components/Vignette/Page'
import { GradientStripesShaderPage } from './components/GradientStripes/Page'
import { ColoredGradientStripesShaderPage } from './components/ColoredGradientStripes/Page'
import { SDFCircleShaderPage } from './components/SDFCircle/Page'
import { SpiralShaderPage } from './components/Spiral/Page.jsx'
import { WavySpiralShaderPage } from './components/WavySpiral/Page.jsx'
import { SDFSphereShaderPage } from './components/SDFSphere/Page.jsx'

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
        label: 'SDF Sphere',
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

    // Three.js Journey
    {
        path: '/shaders/raging-sea',
        label: 'Raging Sea',
        element: <RagingSeaPage />,
        section: 'Three.js Journey',
    },
]
