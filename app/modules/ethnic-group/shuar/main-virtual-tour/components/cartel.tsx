import { Gltf, Text } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";

interface CartelProps {
  label?: string;
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

function Cartel({ label, position, rotation, scale }: CartelProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Text
        fontSize={0.5}
        color="#ffe8c8"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        position={[0, 0, -0.001]}
        font="/Merienda-SemiBold.ttf"
      >
        {label}
      </Text>

      <Gltf
        scale={[2, 0.8, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        src="/planks.glb"
      />
    </group>
  );
}

export default Cartel;
