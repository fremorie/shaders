export const SECTIONS = [
    {
        name: 'Basics',
        summary:
            'Single-purpose shaders, each isolating one idea: UV coordinates, interpolation, repetition, distance fields and the matrices behind every vertex.',
    },
    {
        name: 'Experiments',
        summary:
            'Longer pieces where the basics get combined into something with a bit of atmosphere.',
    },
    {
        name: 'Models',
        summary:
            'Blender exports wired up in React Three Fiber, from single props to whole baked dioramas.',
    },
    {
        name: 'Scenes',
        summary:
            'Finished experiences with sound, interaction and post-processing.',
    },
    {
        name: 'Other',
        summary:
            'Side-by-side comparisons of techniques that behave differently depending on the material they run on.',
    },
]

export const PAGE_DESCRIPTIONS = {
    '/shaders/gradient':
        'The first raw shader: interpolated UV coordinates written straight into the fragment color.',
    '/shaders/smoothstep':
        'A smoothstep ramp with both edges exposed as controls, so the transition between the two thresholds can be pulled apart.',
    '/shaders/stripes':
        'Repetition through modulo: two controls turn a single gradient into a stack of stripes.',
    '/shaders/vignette':
        'A radial falloff around the center of the screen, with an adjustable halo threshold and scale.',
    '/shaders/gradient-stripes':
        'Stripes that keep their gradient inside each band instead of flattening into hard edges.',
    '/shaders/colored-gradient-stripes':
        'The same striped gradient split into red, green and blue channels, each with its own strength.',
    '/shaders/distance-field':
        'A distance field built from five points, one of which follows the mouse, colored by the distance to the nearest one.',
    '/shaders/matrices':
        'A hand-edited 4×4 matrix applied to a cube before the model matrix, so every cell can be typed in and its effect watched immediately.',
    '/shaders/model-matrix':
        'The model matrix taken over by hand: the built-in one is dropped and the cube is placed entirely by the values in the input grid.',
    '/shaders/view-matrix':
        'The view matrix as the inverse of the camera transform, mirrored from the orbiting camera into an editable grid next to a labelled axes helper.',
    '/shaders/sdf-circle':
        'The signed distance to a circle drawn as grayscale — the starting point for every other SDF page here.',
    '/shaders/sdf-sphere':
        'Ray marching a sphere: rays step through the scene until they reach the surface, then get shaded from a normal sampled out of the distance function.',

    '/shaders/spiral':
        'A circle distance field twisted by the polar angle into a rotating spiral, tinted with an animated cosine palette.',
    '/shaders/wavy-spiral':
        'The spiral again, with its rings rippling at their own speed and a switch between the cosine palette and a flat color.',
    '/shaders/pulsating-spiral':
        'A superellipse whose exponent breathes with time, morphing the shape between a diamond, a circle and a square.',
    '/shaders/stencil-buffer':
        'Masking with the stencil buffer: a torus knot that only exists where a circular mask has been painted.',
    '/shaders/grass':
        'Instanced grass blades scattered across a terrain by raycasting straight down onto it, planted on a baked spring model.',
    '/shaders/grass-v2':
        'The grass rebuilt around a shared blade material: segmented blades that curve along their length, an alpha map for the tips and real-time directional shadows.',
    '/shaders/grass-v3':
        'A fresh start for the next iteration of the grass — currently a placeholder standing under an empty sky.',

    '/shaders/glass-bottle':
        'A smoothed bottle rendered with a transmissive physical material, low roughness and a lot of refraction.',
    '/shaders/low-poly-glass-bottle':
        'The same glass treatment on a low poly bottle, where the flat faces catch the light in visibly larger pieces.',
    '/shaders/low-poly-sakura-tree':
        'A low poly cherry tree, the first model that made it out of Blender and into the project.',
    '/shaders/low-poly-sakura-tree-v2':
        'The cherry tree reworked with a denser crown and cleaner topology.',
    '/shaders/bottled-sakura':
        'The cherry tree scene placed inside the glass bottle, the first sketch of what later became the terrarium.',
    '/shaders/spring':
        'The full spring diorama — tree, terrain, river and props — still lit by real lights and materials.',
    '/shaders/spring-baked':
        'The same diorama with all lighting baked into a single texture and drawn with an unlit material.',
    '/shaders/spring-river-shader':
        'The baked spring scene with a custom river shader on top: depth-tinted water, a fresnel rim and animated foam along the banks.',
    '/shaders/winter-v1':
        'The first winter pass over the spring terrain, swapping materials for snow and ice.',
    '/shaders/winter-v2':
        'Winter with reworked geometry and a colder, more consistent material set.',
    '/shaders/winter-v3':
        'The final winter model, with snowed bushes and a directional light casting shadows across the terrain.',
    '/shaders/winter-baked':
        'The merged winter scene, lit entirely by one baked texture.',
    '/shaders/butterfly':
        'A rigged butterfly whose skeletal animation is cloned and played back at triple speed.',

    '/shaders/spring-in-a-bottle':
        'A whole world inside a bottle: a start screen, ambient music, a cork that can be pulled, drifting cherry blossom petals, butterflies, snow and post-processing.',

    '/shaders/terrarium-physical-material':
        'The terrarium with a MeshPhysicalMaterial for the glass, showing how the stencil mask behaves with a standard transmissive material.',
    '/shaders/terrarium-transmission-material':
        'The same setup with MeshTransmissionMaterial, which resolves refraction in its own render pass and needs the mask handled differently.',
}
