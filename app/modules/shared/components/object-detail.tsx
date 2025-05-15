"use-client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls, CameraShake } from "@react-three/drei";

function ObjectDetail({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Canvas shadows camera={{ fov: 50, position: [0, 2, 10]  }}>
      <Environment files="/assets-3D/night.hdr" ground={{ scale: 100 }} />
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
        intensity={0.3}
        castShadow
        shadow-bias={-0.0004}
        position={[0, -1, -1]}
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
