'use client'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { Gltf } from '@react-three/drei'


const Shuar = () => {
    return (
        <div className='w-full h-screen'>

            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                {/* <mesh >
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> */}

                <Physics timeStep="vary">

                    <RigidBody type="fixed" colliders="trimesh">
                        <Gltf castShadow receiveShadow  scale={0.8} src="/ghost_w_tophat-transformed.glb" />
                    </RigidBody>
                </Physics>
            </Canvas>
        </div>);
}

export default Shuar;