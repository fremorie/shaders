import { RagingSeaPage } from './components/RagingSea/Page'
import { GradientShaderPage } from './components/Gradient/Page'
import { HomePage } from './components/Home/Page'

export const pages = [
    { path: '/shaders/', label: 'About', component: HomePage },
    {
        path: '/shaders/raging-sea',
        label: 'Raging Sea',
        component: RagingSeaPage,
    },
    {
        path: '/shaders/gradient',
        label: 'Gradient',
        component: GradientShaderPage,
    },
]
