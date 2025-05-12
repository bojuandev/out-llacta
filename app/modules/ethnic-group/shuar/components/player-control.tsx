import { KeyboardControls } from "@react-three/drei";
import Controller from "ecctrl";
import Player from "@/app/modules/ethnic-group/shuar/components/player";
import { useState } from "react";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

function PlayerControl() {
  const [currentAnimation, setCurrentAnimation] = useState<"Idle" | "Walking">(
    "Idle"
  );

  const handleAnimationChange = (name: string, pressed: boolean) => {
    const movements = ["forward", "backward", "leftward", "rightward"];

    if (movements.includes(name) && pressed) {
      setCurrentAnimation("Walking");
    }
    if (movements.includes(name) && !pressed) {
      setCurrentAnimation("Idle");
    }
  };

  return (
    <KeyboardControls
      map={keyboardMap}
      onChange={handleAnimationChange}
    >
      <Controller maxVelLimit={5}>
        <Player
          currentAnimation={currentAnimation}
          scale={0.3}
          position={[0, -0.9, 0]}
        />
      </Controller>
    </KeyboardControls>
  );
}

export default PlayerControl;
