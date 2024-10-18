import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Model = ({ modelUrl }) => {
    const gltf = useLoader(GLTFLoader, modelUrl)
    return <primitive object={gltf.scene} position={[0, -0.3, 0]} />
}

export const Model3D = ({ modelUrl }) => {

    return (
        <Canvas style={{ width: '100%', height: '350px' }}>
            <PerspectiveCamera makeDefault fov={30}
                position={[4, 2, 3]} zoom={2}>
                <directionalLight intensity={8} />
            </PerspectiveCamera>
            <ambientLight intensity={1} />
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