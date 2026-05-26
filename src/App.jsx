import { BrowserRouter, Routes, Route } from 'react-router'

import { RagingSeaPage } from './components/RagingSea/Page'

import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/shaders/" element={<RagingSeaPage />} />
                <Route path="/shaders/raging-sea" element={<RagingSeaPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
