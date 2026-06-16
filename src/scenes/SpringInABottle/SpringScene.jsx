import { SpringModel } from './SpringModel'
import { ButterflyModel } from './ButterflyModel'

export function SpringScene() {
    return (
        <>
            <SpringModel />
            <ButterflyModel position={[0.7, 1, 0]} />
            <ButterflyModel position={[-0.2, 1.3, -0.4]} rotation-y={Math.PI} />
        </>
    )
}
