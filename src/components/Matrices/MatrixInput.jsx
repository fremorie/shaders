import './MatrixInput.css'

export function MatrixInput({ matrixElements, onChange }) {
    const handleCellChange = (index) => (event) => {
        const parsedValue = parseFloat(event.target.value)
        onChange(index, Number.isNaN(parsedValue) ? 0 : parsedValue)
    }

    return (
        <div className="transformation-matrix-container">
            <h1>Transformation matrix</h1>
            <div className="matrix">
                {[0, 1, 2, 3].map((rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {[0, 1, 2, 3].map((columnIndex) => {
                            const index = rowIndex * 4 + columnIndex
                            return (
                                <div className="cell" key={columnIndex}>
                                    <input
                                        type="number"
                                        value={matrixElements[index]}
                                        onChange={handleCellChange(index)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
