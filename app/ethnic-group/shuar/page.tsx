"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  CameraShake,
} from "@react-three/drei";
import Controller from "ecctrl";
import { useEffect} from "react";

function Model3(props: any) {
  const { scene, animations } = useGLTF("/RobotExpressive.glb");
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    (actions as any).Idle.play();
  }, [actions, scene]);
  return <primitive object={scene} {...props} />;
}

const Shuar = () => {

  const keyboardMap = [
    { name: "Walking", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ fov: 50 }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 10, 5]} />
        <OrbitControls makeDefault/>
        <Model3 />
        <CameraShake
          maxYaw={0.1} // Max amount camera can yaw in either direction
          maxPitch={0.05} // Max amount camera can pitch in either direction
          maxRoll={0.05} // Max amount camera can roll in either direction
          yawFrequency={0.05} // Frequency of the the yaw rotation
          pitchFrequency={0.2} // Frequency of the pitch rotation
          rollFrequency={0.2} // Frequency of the roll rotation
          intensity={1} // initial intensity of the shake
          decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
        />ß
      </Canvas>
    </div>
  );
};

export default Shuar;
