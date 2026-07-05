"use client";

import { Gltf } from "@react-three/drei";

interface TestObjectWithBaseProps {
  srcObject: string;
  labelObject: string;
  groupProps?: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];
  };
  // Ajustes de offset internos (lo que está hardcodeado en ObjectWithBase)
  objectInternalY?: number;  // Default 2.5 en ObjectWithBase
  cartelInternalY?: number;  // Default 1.5 en ObjectWithBase
  tableInternalY?: number;   // Default 0.3 en ObjectWithBase
  tablePositionX?: number;   // Default -1.85 en ObjectWithBase
}

export default function TestObjectWithBase({
  srcObject,
  labelObject,
  groupProps,
  objectInternalY = 2.5,
  cartelInternalY = 1.5,
  tableInternalY = 0.3,
  tablePositionX = -1.85,
}: TestObjectWithBaseProps) {
  return (
    <group
      position={groupProps?.position}
      rotation={groupProps?.rotation}
      scale={groupProps?.scale}
    >
      {/* Objeto principal (hombre) - con offset interno ajustable */}
      <group>
        <Gltf 
          position={[0, objectInternalY, 1]} 
          scale={0.7} 
          src={srcObject} 
        />
      </group>
      
      {/* Base: Cartel + Mesa */}
      <group>
        {/* Cartel/Planks */}
        <group position={[0, cartelInternalY, -0.8]}>
          {/* Texto */}
          <mesh>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#8B4513" />
          </mesh>
          {/* Planks backing */}
          <Gltf
            scale={[2.5, 0.8, 0.5]}
            rotation={[Math.PI / 2, 0, 0]}
            src="/objects-3D/commons/planks.glb"
          />
        </group>

        {/* Mesa */}
        <Gltf
          scale={7}
          position={[tablePositionX, tableInternalY, 0]}
          src="/objects-3D/commons/table-coffee-square.glb"
        />
      </group>
    </group>
  );
}
