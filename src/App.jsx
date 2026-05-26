import { BrowserRouter, Routes, Route } from 'react-router'

import { RagingSeaPage } from './components/RagingSea/Page'

import './App.css'
import { GradientShader } from './components/Gradient/GradientShader'
import { GradientShaderPage } from './components/Gradient/Page.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/shaders/" element={<RagingSeaPage />} />
                <Route path="/shaders/raging-sea" element={<RagingSeaPage />} />
                <Route path="/shaders/gradient" element={<GradientShaderPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
