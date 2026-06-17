// Bottle bounds: the butterfly can never fly past these
const MAX_X = 0.9
const MAX_Z = 0.9
const MAX_Y = 1.8

// How far ahead on the path we peek to work out which way the butterfly faces
const LOOK_AHEAD = 0.05

function clampAxis(value, max) {
    return value > 0 ? Math.min(max, value) : Math.max(-max, value)
}

function breathingRadius(elapsedTime, orbit, seed) {
    const slow = Math.sin(elapsedTime * orbit.wobbleSpeed + seed)
    const fast = Math.sin(elapsedTime * orbit.wobbleSpeed * 1.7 + seed * 2)

    return (
        orbit.radius +
        slow * orbit.wobbleAmount +
        fast * orbit.wobbleAmount * 0.5
    )
}

function centerDrift(elapsedTime, orbit, seed) {
    return {
        x: Math.sin(elapsedTime * orbit.driftSpeed + seed) * orbit.driftAmount,
        z:
            Math.cos(elapsedTime * orbit.driftSpeed * 0.8 + seed) *
            orbit.driftAmount,
    }
}

function verticalBob(elapsedTime, orbit, seed) {
    const quick = Math.sin(elapsedTime * orbit.bobFrequency + orbit.phaseOffset)
    const slow = Math.sin(elapsedTime * orbit.bobFrequency * 0.5 + seed)

    return quick * orbit.bobAmplitude + slow * orbit.bobAmplitude * 0.5
}

function computeButterflyPosition(elapsedTime, orbit) {
    const seed = orbit.seed ?? 0
    const angle = elapsedTime * orbit.angularSpeed + orbit.phaseOffset

    const radius = breathingRadius(elapsedTime, orbit, seed)
    const drift = centerDrift(elapsedTime, orbit, seed)
    const bob = verticalBob(elapsedTime, orbit, seed)

    return {
        x: orbit.centerX + drift.x + radius * Math.cos(angle),
        y: orbit.centerY + bob,
        z: orbit.centerZ + drift.z + radius * Math.sin(angle),
    }
}

export function setButterflyNextPosition(elapsedTime, groupRef, orbit) {
    if (!groupRef.current) return

    const position = computeButterflyPosition(elapsedTime, orbit)
    const positionAhead = computeButterflyPosition(
        elapsedTime + LOOK_AHEAD,
        orbit
    )

    groupRef.current.position.set(
        clampAxis(position.x, MAX_X),
        clampAxis(position.y, MAX_Y),
        clampAxis(position.z, MAX_Z)
    )

    groupRef.current.rotation.y =
        Math.atan2(positionAhead.x - position.x, positionAhead.z - position.z) +
        orbit.headingOffset
}
