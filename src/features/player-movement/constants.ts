export const PLAYER_CONFIG = {
  MAX_SPEED: 5,
  ACCELERATION: 40,
  DECELERATION: 40,
  CAMERA_DISTANCE: 10,
  CAMERA_HEIGHT: 5,
} as const;

export const KEYBOARD_MAP = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
] as const;
