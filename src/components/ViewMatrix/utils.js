// prettier-ignore
export const DEFAULT_VIEW_MATRIX_ELEMENTS = [
    0.70,  0,      -0.7,  0,
    -0.4,  0.81,   -0.4,  0,
    0.57,  0.57,   0.57,  -17.32,
    0,     0,      0,     1,
]

// THREE stores matrix elements in column-major order, but the matrix input
// displays them row by row, so transpose before reading them out. Values are
// rounded to two decimals to match the look of the default matrix.
export function viewMatrixToDisplayElements(matrix) {
    return matrix
        .clone()
        .transpose()
        .elements.map((element) => String(Math.round(element * 100) / 100))
}
