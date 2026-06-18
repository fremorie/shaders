import { SpringModel } from './SpringModel'
import { Butterflies } from './Butterflies'
import { CherryBlossomPetals } from './CherryBlossomPetals'
import { DriftingPetal } from './DriftingPetal'

export function SpringScene({ store }) {
    return (
        <>
            <SpringModel store={store} />
            <Butterflies store={store} />
            <CherryBlossomPetals store={store} />
            <DriftingPetal />
        </>
    )
}
