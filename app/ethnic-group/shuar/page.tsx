"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  useGLTF,
  useAnimations,
  Gltf,
  KeyboardControls,
} from "@react-three/drei";
import Controller from "ecctrl";
import { useEffect } from "react";

function Model(props: any) {
  const { scene, animations } = useGLTF("/RobotExpressive.glb");
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    (actions as any).Idle.play();
  }, [actions, scene]);
  return <primitive object={scene} {...props} />;
}

const Shuar = () => {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ fov: 50 }}>
        <ambientLight intensity={1} />

        <directionalLight
          intensity={0.7}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-20, 20, 20, -20]}
          />
        </directionalLight>

        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Controller maxVelLimit={5}>
              <Model scale={0.5} position={[0, -0.7, 0]} />
            </Controller>
          </KeyboardControls>

          <RigidBody type="fixed" colliders="trimesh">
            <Gltf
              castShadow
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              scale={0.11}
              src="/fantasy_game_inn2-transformed.glb"
            />
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  );
};

export default Shuar;
