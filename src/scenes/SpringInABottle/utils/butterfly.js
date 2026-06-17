export function setButterflyNextPosition(elapsedTime, groupRef, orbit) {
    if (!groupRef.current) return

    const angle = elapsedTime * orbit.angularSpeed + orbit.phaseOffset

    groupRef.current.position.set(
        orbit.centerX + orbit.radius * Math.cos(angle),
        orbit.centerY +
            Math.sin(elapsedTime * orbit.bobFrequency + orbit.phaseOffset) *
                orbit.bobAmplitude,
        orbit.centerZ + orbit.radius * Math.sin(angle)
    )
    groupRef.current.rotation.y = -angle + orbit.headingOffset
}
