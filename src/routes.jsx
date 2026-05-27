import { RagingSeaPage } from './components/RagingSea/Page'
import { GradientShaderPage } from './components/Gradient/Page'
import { HomePage } from './components/Home/Page'
import { SmoothstepShaderPage } from './components/Smoothstep/Page'
import { StripesShaderPage } from './components/Stripes/Page'
import { VignetteShaderPage } from './components/Vignette/Page'
import { GradientStripesShaderPage } from './components/GradientStripes/Page'
import { ColoredGradientStripesShaderPage } from './components/ColoredGradientStripes/Page'

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

    // Three.js Journey
    {
        path: '/shaders/raging-sea',
        label: 'Raging Sea',
        element: <RagingSeaPage />,
        section: 'Three.js Journey',
    },
]
