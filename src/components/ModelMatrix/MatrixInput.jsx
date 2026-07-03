import './MatrixInput.css'

export function MatrixInput({ matrixElements, onChange }) {
    const handleCellChange = (index) => (event) => {
        onChange(index, event.target.value)
    }

    return (
        <div className="model-matrix-container">
            <h1>Model matrix</h1>
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
            <p>
                This matrix is passed to the vertex shader as{' '}
                <b>uModelMatrix</b>&nbsp; and is used instead of the standard{' '}
                <b>modelMatrix</b> to calculate the final vertex position:
                <pre>gl_Position = </pre>
                <pre> projectionMatrix *</pre>
                <pre> viewMatrix *</pre>
                <pre> uModelMatrix *</pre>
                <pre> vec4(position, 1);</pre>
            </p>
        </div>
    )
}
