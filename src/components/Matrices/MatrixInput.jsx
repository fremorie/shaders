import './MatrixInput.css'

export function MatrixInput({ matrixElements, onChange }) {
    const handleCellChange = (index) => (event) => {
        onChange(index, event.target.value)
    }

    return (
        <div className="transformation-matrix-container">
            <h1>Transformation matrix</h1>
            <p>
                Change the values in the matrix and see how they affect the
                cube.
            </p>
            <div className="matrix-container">
                <div className="matrix">
                    {[0, 1, 2, 3].map((rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {[0, 1, 2, 3].map((columnIndex) => {
                                const index = rowIndex * 4 + columnIndex
                                return (
                                    <div className="cell" key={columnIndex}>
                                        <input
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
