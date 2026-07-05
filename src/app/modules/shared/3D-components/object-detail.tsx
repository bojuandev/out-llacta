"use-client";

import { CameraProps, Canvas } from "@react-three/fiber";
import { OrbitControls, CameraShake } from "@react-three/drei";

function ObjectDetail({
  children,
  canvasProps,
}: Readonly<{
  children: React.ReactNode;
  canvasProps?: {
    camera?: CameraProps;
  };
}>) {
  return (
    <Canvas
      shadows
      camera={canvasProps?.camera ?? { fov: 50, position: [0, 2, 10] }}
    >
      <OrbitControls makeDefault />

      <directionalLight
        intensity={3}
        castShadow
        shadow-bias={-0.0004}
        position={[-20, 20, 20]}
      />
      <directionalLight
        intensity={0.7}
        castShadow
        shadow-bias={-0.0004}
        position={[20, 20, 20]}
      />
      <directionalLight
        intensity={0.8}
        castShadow
        shadow-bias={-0.0004}
        position={[0, -1, -10]}
      />
      {children}

      <CameraShake
        maxYaw={0.1}
        maxPitch={0.05}
        maxRoll={0.05}
        yawFrequency={0.05}
        pitchFrequency={0.2}
        rollFrequency={0.2}
        intensity={0.5}
        decayRate={0.65}
      />
    </Canvas>
  );
}

export default ObjectDetail;
