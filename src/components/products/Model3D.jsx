import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrthographicCamera } from '@react-three/drei'

const Model = ({ modelUrl }) => {
    const gltf = useLoader(GLTFLoader, modelUrl)
    return <primitive object={gltf.scene} position={[0, -0.3, 0]} />
}

export const Model3D = ({ modelUrl }) => {
    return (
        <Canvas style={{ width: '100%', height: '400px' }}>
            <OrthographicCamera
                makeDefault
                position={[5, 2, 6]}
                zoom={300}
                near={0.5}
                far={100}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Model modelUrl={modelUrl} />
            </Suspense>
            <OrbitControls
                enableZoom={true}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={0}
            />
        </Canvas>
    )
}