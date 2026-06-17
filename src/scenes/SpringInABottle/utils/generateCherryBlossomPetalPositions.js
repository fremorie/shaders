export function generateCherryBlossomPetalPositions(
    count = 5000,
    sceneRadius = 0.7,
    sceneHeight = 1.7
) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Keep petals inside a circle
        const angle = Math.random() * Math.PI * 2
        const radius = Math.sqrt(Math.random()) * sceneRadius

        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        positions[i3] = x
        positions[i3 + 1] = Math.random() * sceneHeight
        positions[i3 + 2] = z
    }

    return positions
}
