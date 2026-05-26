import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { ROUTES } from '../../routes'

import './Sidebar.css'

export function Sidebar() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    const currentLabel =
        ROUTES.find((route) => route.path === pathname)?.label ?? 'Shaders'

    const sections = useMemo(() => {
        return ROUTES.reduce((acc, value) => {
            const sectionName = value.section ?? 'None'

            if (!value.section) return acc

            const section = acc[sectionName] ?? []

            return {
                ...acc,
                [sectionName]: [...section, value],
            }
        }, {})
    }, [])

    return (
        <>
            <button
                className="sidebar__trigger"
                onClick={() => setOpen((isOpen) => !isOpen)}
            >
                {currentLabel}
            </button>
            <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
                <NavLink
                    key="home"
                    to="/shaders/"
                    className="sidebar__link sidebar__section_title"
                    onClick={() => setOpen(false)}
                >
                    About
                </NavLink>

                {Object.keys(sections).map((section) => (
                    <div key={section} className="sidebar__section">
                        <h1 className="sidebar__section_title">{section}</h1>
                        {sections[section].map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className="sidebar__link"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
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
