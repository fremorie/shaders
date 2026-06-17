import { SpringModel } from './SpringModel'
import { Butterflies } from './Butterflies'

export function SpringScene({ store }) {
    return (
        <>
            <SpringModel store={store} />
            <Butterflies store={store} />
        </>
    )
}
