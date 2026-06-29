import { BrowserRouter, Routes, Route, Outlet } from 'react-router'

import { Sidebar } from './components/layout/Sidebar'
import { ROUTES } from './routes'

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
                    {ROUTES.map(({ path, element, label }) => (
                        <Route path={path} element={element} key={label} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
