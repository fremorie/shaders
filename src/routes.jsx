import { RagingSeaPage } from './components/RagingSea/Page'
import { GradientShaderPage } from './components/Gradient/Page'
import { HomePage } from './components/Home/Page'

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

    // Three.js Journey
    {
        path: '/shaders/raging-sea',
        label: 'Raging Sea',
        element: <RagingSeaPage />,
        section: 'Three.js Journey',
    },
]
