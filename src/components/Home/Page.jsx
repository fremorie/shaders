import { useMemo } from 'react'
import { Link } from 'react-router'

import { ROUTES } from '../../routes'
import { SECTIONS, PAGE_DESCRIPTIONS } from './content'

import './Page.css'

const REPOSITORY_URL = 'https://github.com/fremorie/shaders'

function toAnchor(sectionName) {
    return sectionName.toLowerCase().replace(/\s+/g, '-')
}

function groupRoutesBySection() {
    const summaries = new Map(
        SECTIONS.map((section) => [section.name, section.summary])
    )
    const grouped = new Map(SECTIONS.map((section) => [section.name, []]))

    ROUTES.forEach((route) => {
        if (!route.section) return

        const entries = grouped.get(route.section)

        if (entries) {
            entries.push(route)
        } else {
            grouped.set(route.section, [route])
        }
    })

    return Array.from(grouped, ([name, entries]) => ({
        name,
        entries,
        summary: summaries.get(name) ?? '',
        anchor: toAnchor(name),
    })).filter((section) => section.entries.length > 0)
}

export function HomePage() {
    const sections = useMemo(() => groupRoutesBySection(), [])

    const totalCount = sections.reduce(
        (count, section) => count + section.entries.length,
        0
    )

    return (
        <div className="about">
            <div className="about__aurora" aria-hidden="true" />

            <div className="about__content">
                <header>
                    <p className="about__eyebrow">
                        GLSL · three.js · React Three Fiber
                    </p>
                    <h1 className="about__title">All kinds of shaders</h1>

                    <p className="about__lead">
                        A playground for learning WebGL out loud. Every page is
                        a self-contained sketch, ordered roughly the way it was
                        built: from a first gradient written by hand, through
                        distance fields and the transformation pipeline, up to
                        instanced grass and a whole scene living inside a
                        bottle.
                    </p>
                    <p className="about__lead">
                        Most pages expose their uniforms through a Leva panel,
                        so the fastest way to understand one is to drag its
                        sliders until it breaks. Pick anything below, or use the
                        menu in the top left corner.
                    </p>

                    <div className="about__meta">
                        <p className="about__meta_item">
                            <span className="about__meta_value">
                                {totalCount}
                            </span>
                            <span className="about__meta_label">pages</span>
                        </p>
                        <p className="about__meta_item">
                            <span className="about__meta_value">
                                {sections.length}
                            </span>
                            <span className="about__meta_label">sections</span>
                        </p>
                        <p className="about__meta_item">
                            <span className="about__meta_label">
                                Built with React, three.js and a lot of GLSL
                            </span>
                        </p>
                    </div>

                    <nav className="about__jump" aria-label="Sections">
                        {sections.map((section) => (
                            <a
                                key={section.name}
                                className="about__chip"
                                href={`#${section.anchor}`}
                            >
                                {section.name}
                                <span className="about__chip_count">
                                    {section.entries.length}
                                </span>
                            </a>
                        ))}
                    </nav>
                </header>

                {sections.map((section) => (
                    <section
                        key={section.name}
                        className="about__section"
                        id={section.anchor}
                    >
                        <div className="about__section_heading">
                            <h2 className="about__section_title">
                                {section.name}
                            </h2>
                            <span className="about__section_count">
                                {section.entries.length}
                            </span>
                            <span
                                className="about__section_rule"
                                aria-hidden="true"
                            />
                        </div>

                        {section.summary && (
                            <p className="about__section_summary">
                                {section.summary}
                            </p>
                        )}

                        <ul className="about__cards">
                            {section.entries.map(({ path, label }) => (
                                <li key={path}>
                                    <Link className="about__card" to={path}>
                                        <span className="about__card_label">
                                            {label}
                                            <span
                                                className="about__card_arrow"
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </span>
                                        {PAGE_DESCRIPTIONS[path] && (
                                            <span className="about__card_description">
                                                {PAGE_DESCRIPTIONS[path]}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <footer className="about__footer">
                    <span>Daria Borisiak</span>
                    <span>MIT licensed</span>
                    <a
                        href={REPOSITORY_URL}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Source on GitHub
                    </a>
                </footer>
            </div>
        </div>
    )
}
