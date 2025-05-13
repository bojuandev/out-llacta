import { Gltf } from "@react-three/drei";
import GrassFloor from "./grass-floor";
import CustomRigidBody from "./custom-rigid-body";
import { Vector3 } from "@react-three/fiber";
import { Vector3 as V3 } from "three";
import { useMemo } from "react";

type Range = {
  x: [number, number];
  y: [number, number];
  z: [number, number];
};

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomPosition(range: Range): Vector3 {
  const x = getRandomInRange(range.x[0], range.x[1]);
  //const y = getRandomInRange(range.y[0], range.y[1]);
  const z = getRandomInRange(range.z[0], range.z[1]);
  return [x, 0, z];
}

function getRandomObjectPositions(grassNumber: number) {
  const radius = 20;
  const range: Range = {
    x: [-radius, radius],
    y: [-radius, radius],
    z: [-radius, radius],
  };
  const positions = [];
  for (let i = 0; i < grassNumber; i++) {
    positions.push(generateRandomPosition(range));
  }

  return positions;
}

function MainEnvironment() {
  const tree = (position: Vector3) => {
    return (
      <CustomRigidBody
        rigidBody={{
          position,
        }}
        gltf={{
          src: "/objects-3D/commons/ash-tree.glb",
        }}
      />
    );
  };

  const grass = (position: Vector3, id?: number) => {
    return (
      <group position={position} key={id}>
        <Gltf
          src="/objects-3D/commons/grass-1.glb"
          scale={1}
          position={[-64, 0.3, 0]}
        />
      </group>
    );
  };

  const littleRock = (position: Vector3) => {
    return (
      <group position={position}>
        <CustomRigidBody
          rigidBody={{
            position,
          }}
          gltf={{
            src: "/objects-3D/commons/rocks.glb",
            scale: 3,
            position: [0, 1, 0],
          }}
        />
      </group>
    );
  };


  const grassList = useMemo(() => getRandomObjectPositions(80), []);

  return (
    <group>
      <GrassFloor scale={[30, 2, 30]} />

      {littleRock([2, 0, 9])}
      {littleRock([-2, 0, -10])}
      {littleRock([8, 0, -2])}
      {littleRock([9, 0, 2])}
      {littleRock([-8, 0, -2])}
      {littleRock([-8, 0, 2])}

      {littleRock([-1.5, 0, 7.5])}
      {littleRock([0.5, 0, -8])}

      {tree([15, 0, 15])}
      {tree([-15, 0, 15])}
      {tree([15, 0, -15])}
      {tree([-15, 0, -15])}

      {grassList.map(grass)}
    </group>
  );
}

export default MainEnvironment;
