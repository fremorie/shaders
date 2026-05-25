import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RagingSeaPage } from './components/RagingSea/Page'

import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/shaders/raging-sea" element={<RagingSeaPage />} />
            </Routes>

            <Outlet />
        </BrowserRouter>

    )
}

export default App
