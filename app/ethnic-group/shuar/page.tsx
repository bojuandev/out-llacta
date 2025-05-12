"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  useGLTF,
  useAnimations,
  Gltf,
  KeyboardControls,
} from "@react-three/drei";
import Controller from "ecctrl";
import { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Image } from "@heroui/react";

function Box(props: any) {
  // This reference will give us direct access to the mesh
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color ?? "lightsteelblue"} />
    </mesh>
  );
}

function Model(props: any) {
  const { scene, animations } = useGLTF("/RobotExpressive.glb");
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    console.log("actions", actions);
    (actions as any).Idle.play();
  }, [actions, scene]);

  useEffect(() => {
    if (!actions) return;

    if (props.currentAnimation === "Idle") {
      (actions as any).Idle.play();
      (actions as any).Walking.stop();
      (actions as any).Running.stop();
    } else if (props.currentAnimation === "Walking") {
      (actions as any).Idle.stop();
      (actions as any).Walking.play();
    }
  }, [props.currentAnimation]);

  return <primitive object={scene} {...props} />;
}

const Shuar = () => {
  const [currentAnimation, setCurrentAnimation] = useState("Idle");
  const [isThereCollision, setIsThereCollision] = useState(false);

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ fov: 50 }}>
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

        <Physics timeStep="vary">
          <KeyboardControls
            map={keyboardMap}
            onChange={(name, pressed) => {
              const movements = [
                "forward",
                "backward",
                "leftward",
                "rightward",
              ];

              if (movements.includes(name) && pressed) {
                setCurrentAnimation("Walking");
              }
              if (movements.includes(name) && !pressed) {
                setCurrentAnimation("Idle");
              }
            }}
          >
            <Controller maxVelLimit={5}>
              <Model
                currentAnimation={currentAnimation}
                scale={0.5}
                position={[0, -0.9, 0]}
              />
            </Controller>
          </KeyboardControls>

          {/* <RigidBody
            type="fixed"
            colliders="trimesh"
            onCollisionEnter={() => {
              console.log("Collision detected");
            }}
          >
            <Gltf
              castShadow
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              scale={0.11}
              src="/fantasy_game_inn2-transformed.glb"
            />
          </RigidBody> */}

          <RigidBody type="fixed" colliders="trimesh">
            <Box position={[0, 0, 0]} scale={[10, 1, 30]} />
          </RigidBody>

          <RigidBody
            type="fixed"
            colliders="trimesh"
            onCollisionEnter={() => {
              setIsThereCollision(true);
            }}
            /* onCollisionExit={() => {
             setIsThereCollision(false);
            }} */
          >
            <Gltf
              position={[0, 0.5, 10]}
              rotation={[0, Math.PI, 0]}
              scale={6}
              src="/door-round.glb"
            />
          </RigidBody>
        </Physics>
      </Canvas>

      <Modal
        isOpen={isThereCollision}
        onOpenChange={() => setIsThereCollision(false)}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody>
                <div className="flex items-center justify-center gap-8">
                  <Image
                    isBlurred
                    alt="HeroUI Album Cover"
                    className="m-5"
                    src="/amor.jpeg"
                    width={240}
                  />

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl text-center font-bold">
                      {" "}
                      TE AMO ❤️❤️❤️❤️❤️
                    </h2>
                    <p className="text-center">Eres mi todo mi vida </p>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Shuar;
