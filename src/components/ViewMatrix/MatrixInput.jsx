import './MatrixInput.css'

export function MatrixInput({ matrixElements, onChange }) {
    const handleCellChange = (index) => (event) => {
        onChange(index, event.target.value)
    }

    return (
        <div className="model-matrix-container">
            <h1>View matrix</h1>
            <p>Rotate the camera and see how it affects the view matrix.</p>
            <div className="matrix-container">
                <div className="matrix">
                    {[0, 1, 2, 3].map((rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {[0, 1, 2, 3].map((columnIndex) => {
                                const index = rowIndex * 4 + columnIndex
                                return (
                                    <div className="cell" key={columnIndex}>
                                        <input
                                            disabled
                                            type="text"
                                            inputMode="decimal"
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
        </div>
    )
}
