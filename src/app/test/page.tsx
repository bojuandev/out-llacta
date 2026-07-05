"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Environment, KeyboardControls, Gltf } from "@react-three/drei";
import { Vector3 } from "three";
import TestPlayerController, { TestPlayerControllerRef } from "./components/test-player-controller";
import CameraController from "@/features/player-movement/camera-controller";
import TestObjectWithBase from "./components/test-object-with-base";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

export default function TestPage() {
  const [meshOffsetY, setMeshOffsetY] = useState(-0.75);
  
  // Offsets internos ajustables (los que están hardcodeados en ObjectWithBase)
  const [objectInternalY, setObjectInternalY] = useState(2.5);    // ObjectWithBase: Gltf position={[0, 2.5, 1]}
  const [cartelInternalY, setCartelInternalY] = useState(1.5);    // ObjectWithBase: Cartel position={[0, 1.5, -0.8]}
  const [tableInternalY, setTableInternalY] = useState(0.3);     // ObjectWithBase: table position={[-1.85, 0.3, 0]}
  const [grassY, setGrassY] = useState(0);                      // Grass offset
  
  const [debugData, setDebugData] = useState({
    robotRbPos: { x: 0, y: 0, z: 0 },
    robotMeshOffset: { x: 0, y: -0.50, z: 0 },
    robotMeshWorld: { x: 0, y: 0, z: 0 },
    capsuleBottom: 0,
    floorColliderY: -0.1,
    floorColliderHalfHeight: 0.1,
    floorTop: 0,
    penetration: 0,
    keys: { w: false, a: false, s: false, d: false },
  });

  const playerRef = useRef<TestPlayerControllerRef>(null);
  const cameraYawRef = useRef(Math.PI);
  const cameraPitchRef = useRef(0);
  const positionRef = useRef(new Vector3(0, 0.75, 0));

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setDebugData(playerRef.current.getData());
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Canvas 3D */}
      <Canvas shadows camera={{ fov: 50 }}>
        <KeyboardControls map={keyboardMap}>
          <Environment
            files="/assets-3D/je_gray_02_1k.hdr"
            ground={{ scale: 100 }}
          />
          <ambientLight intensity={1} />
          <directionalLight
            intensity={0.1}
            castShadow
            shadow-bias={-0.0004}
            position={[-20, 20, 20]}
          >
            <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
          </directionalLight>

          <CameraController
            targetPosition={positionRef}
            cameraYawRef={cameraYawRef}
            cameraPitchRef={cameraPitchRef}
          />

          <Physics timeStep={1 / 60} gravity={[0, -20, 0]}>
            {/* Ground plane collider */}
            <RigidBody type="fixed" position={[0, -0.1, 0]}>
              <CuboidCollider args={[100, 0.1, 100]} />
            </RigidBody>

            {/* Simple green ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <planeGeometry args={[200, 200]} />
              <meshStandardMaterial color="#4CAF50" />
            </mesh>

            {/* Player */}
            <TestPlayerController 
              ref={playerRef} 
              cameraYawRef={cameraYawRef} 
              positionRef={positionRef} 
              meshOffsetY={meshOffsetY} 
            />

            {/* Caja roja para test de colisiones */}
            <RigidBody type="fixed" position={[5, 0.5, 5]}>
              <CuboidCollider args={[0.5, 0.5, 0.5]} />
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
              </mesh>
            </RigidBody>

            {/* HIERBA - separada en x=-10, z=0 */}
            <group position={[-10, 0, 0]}>
              <Gltf 
                src="/objects-3D/commons/grass-1.glb" 
                scale={1}
                position={[0, grassY, 0]} 
              />
            </group>

            {/* HOMBRE SHUAR COMPLETO - usando TestObjectWithBase con offsets ajustables */}
            <TestObjectWithBase
              srcObject="/objects-3D/shuar/hombre-shuar/hombre-shuar.glb"
              labelObject="Hombre Shuar"
              groupProps={{ position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 }}
              objectInternalY={objectInternalY}
              cartelInternalY={cartelInternalY}
              tableInternalY={tableInternalY}
            />

          </Physics>
        </KeyboardControls>
      </Canvas>

      {/* Debug UI Panel */}
      <div className="absolute top-4 left-4 bg-black/90 text-white p-4 rounded font-mono text-sm w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="font-bold mb-3 text-lg border-b border-white/30 pb-2">
          🧪 OBJECT HEIGHT ADJUSTER
        </h2>

        {/* Robot Section */}
        <div className="mb-4 p-2 bg-gray-800 rounded">
          <h3 className="font-bold text-yellow-400 mb-1">ROBOT</h3>
          <div className="grid grid-cols-2 gap-x-4 text-xs mb-2">
            <div className="text-gray-400">RigidBody Y:</div>
            <div>{debugData.robotRbPos.y.toFixed(3)}</div>
            <div className="text-gray-400">Mesh World Y:</div>
            <div>{debugData.robotMeshWorld.y.toFixed(3)}</div>
            <div className="text-gray-400">Capsule Bottom:</div>
            <div>{debugData.capsuleBottom.toFixed(3)}</div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="-1.0"
              max="0"
              step="0.01"
              value={meshOffsetY}
              onChange={(e) => setMeshOffsetY(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs font-mono w-12 text-right">{meshOffsetY.toFixed(2)}</span>
          </div>
        </div>

        {/* ObjectWithBase Section */}
        <div className="space-y-3 mb-4">
          <h3 className="font-bold text-orange-400 border-b border-white/20 pb-1">
            HOMBRE SHUAR (ObjectWithBase)
          </h3>
          
          <div className="p-2 bg-gray-800/50 rounded">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold">👤 objectInternalY</span>
              <span className="text-xs font-mono text-yellow-400">Y: {objectInternalY.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step="0.01"
              value={objectInternalY}
              onChange={(e) => setObjectInternalY(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">
              {`Gltf position={[0, ${objectInternalY.toFixed(2)}, 1]}`}
            </div>
          </div>

          <div className="p-2 bg-gray-800/50 rounded">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold">🏷️ cartelInternalY</span>
              <span className="text-xs font-mono text-yellow-400">Y: {cartelInternalY.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step="0.01"
              value={cartelInternalY}
              onChange={(e) => setCartelInternalY(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">
              {`Cartel position={[0, ${cartelInternalY.toFixed(2)}, -0.8]}`}
            </div>
          </div>

          <div className="p-2 bg-gray-800/50 rounded">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold">🪑 tableInternalY</span>
              <span className="text-xs font-mono text-yellow-400">Y: {tableInternalY.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-2}
              max={2}
              step="0.01"
              value={tableInternalY}
              onChange={(e) => setTableInternalY(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">
              {`Table position={[-1.85, ${tableInternalY.toFixed(2)}, 0]}`}
            </div>
          </div>
        </div>

        {/* Hierba Section */}
        <div className="mb-4 p-2 bg-gray-800/50 rounded">
          <h3 className="font-bold text-green-400 mb-1 text-xs">HIERBA (x=-10)</h3>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={-2}
              max={2}
              step="0.01"
              value={grassY}
              onChange={(e) => setGrassY(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs font-mono w-12 text-right">{grassY.toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-500">
            Offset aplicado al grupo (original tenía y=0.3 interno)
          </div>
        </div>

        {/* Copy Values Button */}
        <div className="mt-4 p-2 bg-gray-800 rounded">
          <button
            onClick={() => {
              const values = [
                `objectInternalY: ${objectInternalY.toFixed(2)}`,
                `cartelInternalY: ${cartelInternalY.toFixed(2)}`,
                `tableInternalY: ${tableInternalY.toFixed(2)}`,
                `grassY: ${grassY.toFixed(2)}`,
              ].join('\n');
              navigator.clipboard.writeText(values);
              alert('Valores copiados al clipboard!');
            }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-xs font-bold"
          >
            📋 COPY ALL VALUES
          </button>
        </div>

        {/* Legend */}
        <div className="text-xs text-gray-500 border-t border-white/20 pt-2 mt-2">
          <div>Click + Drag = Rotate camera</div>
          <div>WASD = Move robot</div>
        </div>
      </div>
    </div>
  );
}
