import { BrowserRouter, Routes, Route, Outlet } from 'react-router'

import { Sidebar } from './components/layout/Sidebar'
import { pages } from './routes'

import './App.css'

function Layout() {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {pages.map((page) => (
                        <Route path={page.path} element={page.component()} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
