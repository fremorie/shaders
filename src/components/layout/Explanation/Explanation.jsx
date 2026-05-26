import './Explanation.css'

export function Explanation({ title, children }) {
    return (
        <div className="explanation">
            <h1 className="explanation__title">{title}</h1>
            <p className="explanation__details">{children}</p>
        </div>
    )
}
