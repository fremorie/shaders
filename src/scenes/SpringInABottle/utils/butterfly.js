// Do not let the butterfly fly out of the bottle
const MAX_X = 0.8
const MAX_Z = 0.8
const MAX_Y = 1.8

function bounded(value, max) {
    return value > 0 ? Math.min(max, value) : Math.max(-max, value)
}

function computeButterflyPosition(elapsedTime, orbit) {
    const angle = elapsedTime * orbit.angularSpeed + orbit.phaseOffset
    const { seed = 0 } = orbit

    const radius =
        orbit.radius +
        Math.sin(elapsedTime * orbit.wobbleSpeed + seed) * orbit.wobbleAmount +
        Math.sin(elapsedTime * orbit.wobbleSpeed * 1.7 + seed * 2) *
            orbit.wobbleAmount *
            0.5

    const driftX =
        Math.sin(elapsedTime * orbit.driftSpeed + seed) * orbit.driftAmount
    const driftZ =
        Math.cos(elapsedTime * orbit.driftSpeed * 0.8 + seed) *
        orbit.driftAmount

    const x = orbit.centerX + driftX + radius * Math.cos(angle)
    const y =
        orbit.centerY +
        Math.sin(elapsedTime * orbit.bobFrequency + orbit.phaseOffset) *
            orbit.bobAmplitude +
        Math.sin(elapsedTime * orbit.bobFrequency * 0.5 + seed) *
            orbit.bobAmplitude *
            0.5
    const z = orbit.centerZ + driftZ + radius * Math.sin(angle)

    return { x, y, z }
}

export function setButterflyNextPosition(elapsedTime, groupRef, orbit) {
    if (!groupRef.current) return

    const position = computeButterflyPosition(elapsedTime, orbit)
    const positionAhead = computeButterflyPosition(elapsedTime + 0.05, orbit)

    groupRef.current.position.set(
        bounded(position.x, MAX_X),
        bounded(position.y, MAX_Y),
        bounded(position.z, MAX_Z)
    )

    groupRef.current.rotation.y =
        Math.atan2(positionAhead.x - position.x, positionAhead.z - position.z) +
        orbit.headingOffset
}
