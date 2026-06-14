import { WinterScene } from './WinterScene'
import { SpringScene } from './SpringScene'

export function Scene({store}) {
    return (
        <>
            <WinterScene />
            <SpringScene store={store} />
        </>
    )
}
