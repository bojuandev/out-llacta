"use-client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  OrbitControls,
  CameraShake,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";

function ObjectDetail({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("render");

  let a = true;

  if (!a) {
    return (
      <Canvas shadows camera={{ fov: 50 }}>
        <Environment files="/assets-3D/night.hdr" ground={{ scale: 100 }} />
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

        <Physics timeStep="vary">{children}</Physics>
      </Canvas>
    );
  }

  return (
    <Canvas shadows camera={{ fov: 50 }}>
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
        maxYaw={0.1} // Max amount camera can yaw in either direction
        maxPitch={0.05} // Max amount camera can pitch in either direction
        maxRoll={0.05} // Max amount camera can roll in either direction
        yawFrequency={0.05} // Frequency of the the yaw rotation
        pitchFrequency={0.2} // Frequency of the pitch rotation
        rollFrequency={0.2} // Frequency of the roll rotation
        intensity={0.5} // initial intensity of the shake
        decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
      />
    </Canvas>
  );
}

export default ObjectDetail;
