import { KeyboardControls } from "@react-three/drei";
import Controller from "ecctrl";
import Player from "@/app/modules/shared/3D-components/player";

interface PlayerControlProps {
  playerRef?: any;
  currentAnimation: "Idle" | "Walking";
  onAnimationChange: (name: string, pressed: boolean) => void
}

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

function PlayerControl(props: PlayerControlProps) {

  return (
    <KeyboardControls map={keyboardMap} onChange={props.onAnimationChange}>
      <Controller maxVelLimit={5}>
        <Player
          currentAnimation={props.currentAnimation}
          scale={0.3}
          position={[0, -0.85, 0]}
          playerRef={props.playerRef}
        />
      </Controller>
    </KeyboardControls>
  );
}

export default PlayerControl;
