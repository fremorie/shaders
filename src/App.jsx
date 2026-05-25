import { Canvas } from '@react-three/fiber'

import { Experience } from './components/Experience'
import './App.css'

function App() {
    return (
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 10, 15, 25 ]
            } }
        >
            <Experience />
        </Canvas>
    )
}

export default App
