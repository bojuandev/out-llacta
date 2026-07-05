"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Environment, KeyboardControls } from "@react-three/drei";
import { Vector3, BoxGeometry, MeshStandardMaterial } from "three";
import TestPlayerController, { TestPlayerControllerRef } from "./components/test-player-controller";
import CameraController from "@/features/player-movement/camera-controller";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

export default function TestPage() {
  const [meshOffsetY, setMeshOffsetY] = useState(-0.73);
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
              <meshStandardMaterial color="#4a7c4e" />
            </mesh>

            {/* Player */}
            <TestPlayerController ref={playerRef} cameraYawRef={cameraYawRef} positionRef={positionRef} meshOffsetY={meshOffsetY} />

            {/* Obstacle to test collisions - Box 1x1x1 at z=5 */}
            <RigidBody type="fixed" position={[0, 0.5, 5]}>
              <CuboidCollider args={[0.5, 0.5, 0.5]} />
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
              </mesh>
            </RigidBody>
          </Physics>
        </KeyboardControls>
      </Canvas>

      {/* Debug UI Panel */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded font-mono text-sm w-80">
        <h2 className="font-bold mb-3 text-lg border-b border-white/30 pb-2">
          🧪 TEST SANDBOX
        </h2>

        {/* Robot Section */}
        <div className="mb-4">
          <h3 className="font-bold text-yellow-400 mb-1">ROBOT</h3>
          <div className="grid grid-cols-2 gap-x-4 text-xs">
            <div className="text-gray-400">RigidBody Y:</div>
            <div>{debugData.robotRbPos.y.toFixed(3)}</div>

            <div className="text-gray-400">Mesh Offset Y:</div>
            <div>{debugData.robotMeshOffset.y.toFixed(3)}</div>

            <div className="text-gray-400">Mesh World Y:</div>
            <div>{debugData.robotMeshWorld.y.toFixed(3)}</div>

            <div className="text-gray-400">Capsule Bottom:</div>
            <div>{debugData.capsuleBottom.toFixed(3)}</div>
          </div>
        </div>

        {/* Floor Section */}
        <div className="mb-4">
          <h3 className="font-bold text-green-400 mb-1">FLOOR</h3>
          <div className="grid grid-cols-2 gap-x-4 text-xs">
            <div className="text-gray-400">Collider Y:</div>
            <div>{debugData.floorColliderY.toFixed(2)}</div>

            <div className="text-gray-400">HalfHeight:</div>
            <div>{debugData.floorColliderHalfHeight.toFixed(2)}</div>

            <div className="text-gray-400">Top Surface:</div>
            <div>{debugData.floorTop.toFixed(2)}</div>
          </div>
        </div>

        {/* Penetration Section */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">
            <span className={debugData.penetration > 0 ? "text-red-400" : "text-green-400"}>
              {debugData.penetration > 0 ? "❌ PENETRATION" : "✅ NO PENETRATION"}
            </span>
          </h3>
          <div className="text-xs">
            <span className="text-gray-400">Distance: </span>
            <span className={debugData.penetration > 0 ? "text-red-400" : "text-green-400"}>
              {debugData.penetration.toFixed(4)}m
            </span>
          </div>
        </div>

        {/* Adjust Offset Section */}
        <div className="mb-4 p-2 bg-gray-800 rounded">
          <h3 className="font-bold text-purple-400 mb-1 text-xs">ADJUST MESH OFFSET</h3>
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
          <div className="text-xs text-gray-500 mt-1">
            Drag slider to adjust robot height
          </div>
        </div>

        {/* Keys Section */}
        <div className="mb-4">
          <h3 className="font-bold text-blue-400 mb-1">KEYS</h3>
          <div className="flex gap-2">
            {[
              { key: "w", label: "W", active: debugData.keys.w },
              { key: "a", label: "A", active: debugData.keys.a },
              { key: "s", label: "S", active: debugData.keys.s },
              { key: "d", label: "D", active: debugData.keys.d },
            ].map(({ key, label, active }) => (
              <div
                key={key}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold border ${
                  active
                    ? "bg-blue-500 border-blue-400 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-400"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
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
