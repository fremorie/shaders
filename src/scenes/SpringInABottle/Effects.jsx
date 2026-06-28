import { EffectComposer, Vignette, SMAA } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'

export function Effects({ store }) {
    const { vignetteEnabled, vignetteOffset, vignetteDarkness } = useControls(
        'Postprocessing',
        {
            Vignette: folder({
                vignetteEnabled: { value: true, label: 'enabled' },
                vignetteOffset: {
                    value: 0.3,
                    min: 0,
                    max: 1,
                    step: 0.01,
                    label: 'offset',
                },
                vignetteDarkness: {
                    value: 0.6,
                    min: 0,
                    max: 1.5,
                    step: 0.01,
                    label: 'darkness',
                },
            }),
        },
        { store }
    )

    return (
        <>
            <EffectComposer
                multisampling={0}
                stencilBuffer
                enableNormalPass={false}
            >
                {vignetteEnabled && (
                    <Vignette
                        offset={vignetteOffset}
                        darkness={vignetteDarkness}
                    />
                )}
                <SMAA />
            </EffectComposer>
        </>
    )
}
