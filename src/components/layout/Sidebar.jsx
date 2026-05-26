import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { pages } from '../../routes'

import './Sidebar.css'

export function Sidebar() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    const currentLabel =
        pages.find((p) => p.path === pathname)?.label ?? 'Shaders'

    return (
        <>
            <button
                className="sidebar__trigger"
                onClick={() => setOpen((o) => !o)}
            >
                {currentLabel}
            </button>
            <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
                {pages.map(({ path, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className="sidebar__link"
                        onClick={() => setOpen(false)}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            {open && (
                <div
                    className="sidebar__backdrop"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}
