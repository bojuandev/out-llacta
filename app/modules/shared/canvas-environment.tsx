"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";

interface CanvasEnvironmentProps {
  children: React.ReactNode;
}

function CanvasEnvironment(props: CanvasEnvironmentProps) {
  return (
    <Canvas shadows camera={{ fov: 50 }}>
      <Environment files="/night.hdr" ground={{ scale: 100 }} />
      <ambientLight intensity={1} />

      <directionalLight
        intensity={0.7}
        castShadow
        shadow-bias={-0.0004}
        position={[-20, 20, 20]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>

      <Physics timeStep="vary">{props.children}</Physics>
    </Canvas>
  );
}

export default CanvasEnvironment;
