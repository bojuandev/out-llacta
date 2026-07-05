# 3D System Documentation

> **AI-First Changelog (Jul 2026):** This system was refactored from `ecctrl` to a custom controller. See summary below.

## AI-First Quick Reference for Future Agents

### What Changed (July 2026 Session)

| Component | Before | After | Reason |
|-----------|--------|-------|--------|
| **Player Controller** | `ecctrl` package | Custom `PlayerController` with `RigidBody` + `CapsuleCollider` | ecctrl caused ground penetration and floating issues |
| **Camera** | Right-click drag | Click-and-hold drag + touch support | Better UX, mobile compatible |
| **Ground** | `grass-tile.glb` scaled | `planeGeometry` with `CuboidCollider` at `y=-0.1` | Visual/physics alignment |
| **Mobile** | Nipplejs joystick | Touch on canvas + "Caminar" button | Simpler UX, no overlay blocking UI |
| **Robot Position** | `[0, -0.85, 0]` | `[0, -0.75, 0]` | Empirically tested to touch ground |
| **Proximity** | `playerRef` (mesh ref) | `playerPosition` (Vector3) | Cleaner data flow |

### Critical Values (Do Not Change Without Testing)

| Value | File | Description |
|-------|------|-------------|
| `RigidBody Y: 0.75` | `player-controller.tsx` | Capsule center (bottom at y=0) |
| `Mesh offset Y: -0.75` | `player-controller.tsx` | Aligns robot feet with ground |
| `Ground collider: [100, 0.1, 100]` | `canvas-environment.tsx` | Thin collider at y=-0.1 |
| `Pitch limits: ±30°` | `camera-controller.tsx` | Prevents seeing under floor |
| `Camera distance: 7` | `camera-controller.tsx` | Third-person distance |

### Files Created
- `src/features/player-movement/player-controller.tsx` - Custom controller
- `src/features/player-movement/camera-controller.tsx` - Third-person camera
- `src/features/player-movement/mobile-controls.tsx` - Mobile walk button
- `src/shared/hooks/use-is-mobile.ts` - Mobile detection

### Files Removed
- `src/features/player-movement/joystick.tsx` - Nipplejs joystick
- `src/features/camera-follow/touch-rotation.tsx` - Separate touch component
- `src/app/modules/shared/3D-components/player-control.tsx` - ecctrl wrapper

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Canvas Hierarchy](#canvas-hierarchy)
3. [Physics System (Rapier)](#physics-system-rapier)
4. [Player Controller (Custom)](#player-controller-custom)
5. [Camera System](#camera-system)
6. [Mobile Controls](#mobile-controls)
7. [Proximity Detection System](#proximity-detection-system)
8. [Asset Pipeline](#asset-pipeline)
9. [Lighting and Environment](#lighting-and-environment)
10. [Animation System](#animation-system)
11. [3D Components Reference](#3d-components-reference)

---

## Technology Stack

### Core 3D Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `three` | ^0.176.0 | Core WebGL rendering |
| `@react-three/fiber` | ^9.1.2 | React renderer for Three.js |
| `@react-three/drei` | ^10.0.7 | Helpers and utilities |
| `@react-three/rapier` | ^2.1.0 | Physics engine integration |
| `ecctrl` | ^1.0.92 | **DEPRECATED** - Replaced by custom controller |

### Why These Libraries?

| Library | Rationale |
|---------|-----------|
| **React Three Fiber** | Declarative Three.js - components instead of imperative code |
| **Rapier** | Rust-based physics, fast and WASM-powered |
| **Custom Controller** | Replaced ecctrl to fix positioning/ground alignment issues |
| **Drei** | Common 3D helpers (loaders, controls, text rendering) |

---

## Canvas Hierarchy

### Main Canvas (CanvasEnvironment)

**File:** `app/modules/shared/3D-components/canvas-environment.tsx`

```typescript
<Canvas shadows camera={{ fov: 50 }}>
  <Environment files="/assets-3D/je_gray_02_1k.hdr" ground={{ scale: 100 }} />
  <ambientLight intensity={1} />
  <directionalLight intensity={0.1} castShadow ... />
  <Physics timeStep="vary">
    {props.children}
  </Physics>
</Canvas>
```

### Canvas Props

| Prop | Value | Purpose |
|------|-------|---------|
| `shadows` | `true` | Enable shadow mapping |
| `camera` | `{ fov: 50 }` | Field of view |
| `timeStep` | `"vary"` | Variable timestep for physics |

### Detail Canvas (ObjectDetail)

**File:** `app/modules/shared/3D-components/object-detail.tsx`

```typescript
<Canvas shadows camera={canvasProps?.camera ?? { fov: 50, position: [0, 2, 10] }}>
  <OrbitControls makeDefault />
  <directionalLight intensity={3} castShadow ... />
  <directionalLight intensity={0.7} ... />
  <directionalLight intensity={0.8} ... />
  {children}
  <CameraShake maxYaw={0.1} maxPitch={0.05} ... />
</Canvas>
```

### Canvas Hierarchy Structure

```
CanvasEnvironment (Main 3D Tour)
├── Environment (HDR lighting)
├── ambientLight (Global illumination)
├── directionalLight (Main shadows)
├── Physics (Rapier)
│   ├── MainEnvironment
│   │   ├── GrassFloor
│   │   ├── Trees (RigidBody)
│   │   ├── Rocks (RigidBody)
│   │   └── Grass instances
│   ├── PlayerControl
│   │   ├── KeyboardControls
│   │   ├── Controller (ecctrl)
│   │   └── Player (GLTF)
│   └── ObjectList
│       ├── Door (RigidBody)
│       │   ├── Cartel
│       │   └── CustomRigidBody
│       └── ObjectWithBase (RigidBody)
│           ├── Gltf (Cultural model)
│           ├── Cartel
│           └── CustomRigidBody

ObjectDetail (Individual Object View)
├── OrbitControls (User rotation)
├── directionalLights (3-point lighting)
├── Gltf (Cultural model)
└── CameraShake (Subtle movement)
```

---

## Physics System (Rapier)

### Physics Configuration

**File:** `app/modules/shared/3D-components/canvas-environment.tsx:26`

```typescript
<Physics timeStep="vary">
  {props.children}
</Physics>
```

### RigidBody Types

| Component | RigidBody Type | Colliders | Purpose |
|-----------|----------------|-----------|---------|
| `GrassFloor` | `"fixed"` | `"trimesh"` | Static ground |
| `tree` | (default) | (default) | Static obstacle |
| `littleRock` | (default) | (default) | Static obstacle |
| `Door` | `"fixed"` | `"trimesh"` | Interactive but static |
| `ObjectWithBase` | `"fixed"` | `"trimesh"` | Display object |

### RigidBody Usage Examples

```typescript
// Floor - always fixed
<RigidBody type="fixed" colliders="trimesh">
  <Gltf src="/objects-3D/commons/grass-tile.glb" />
</RigidBody>

// Interactive door with custom colliders
<RigidBody type="fixed" colliders="trimesh">
  <Gltf src="/objects-3D/commons/door-round.glb" />
</RigidBody>

// Object with base (table)
<RigidBody
  type="fixed"
  colliders="trimesh"
  position={[0, 0, 0]}
>
  <Gltf scale={7} position={[-1.85, 0.3, 0]} src="..." />
</RigidBody>
```

### Physics Colliders

| Collider Type | Use Case |
|---------------|----------|
| `"trimesh"` | Complex mesh collision (floor, furniture) |
| `"hull"` | Convex hull approximation |
| `"ball"` | Spherical collision |
| `"cuboid"` | Box collision |

---

## Player Controller (ecctrl)

### ecctrl Overview

`ecctrl` es un controlador de personajes 3D que maneja:
- Movement input (keyboard, joystick)
- Character physics (walking, jumping)
- Animation state machine
- Camera follow

### Controller Configuration

**File:** `app/modules/shared/3D-components/player-control.tsx`

```typescript
<KeyboardControls map={keyboardMap} onChange={handleAnimationChange}>
  <Controller maxVelLimit={5}>
    <Player
      currentAnimation={props.currentAnimation}
      scale={0.3}
      position={[0, -0.85, 0]}
      playerRef={props.playerRef}
    />
  </Controller>
</KeyboardControls>
```

### Keyboard Map

```typescript
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];
```

### Controller Props

| Prop | Value | Purpose |
|------|-------|---------|
| `maxVelLimit` | `5` | Maximum velocity |

### Player Component

**File:** `app/modules/shared/3D-components/player.tsx`

```typescript
export default function Player(props: PlayerProps) {
  const { scene, animations } = useGLTF("/objects-3D/commons/robot-expressive.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
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

  return <primitive ref={props.playerRef} object={scene} {...props} />;
}
```

### Player Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `currentAnimation` | `"Idle" \| "Walking" \| "Running"` | Required | Animation state |
| `position` | `Vector3` | `[0, -0.85, 0]` | Initial position |
| `scale` | `number` | `0.3` | Model scale |
| `playerRef` | `any` | - | Reference to player object |

---

## Proximity Detection System

### How It Works

El sistema de deteccion de proximidad calcula la distancia 2D entre el jugador y objetos interactivos usando `useFrame`:

**File:** `app/modules/shared/3D-components/custom-rigid-body.tsx`

```typescript
useFrame(() => {
  if (!objectRef.current || !props.playerRef) return;

  const zoneDoorPos = new V3();
  const zonePlayerPos = new V3();

  const doorPos = objectRef.current.getWorldPosition(zoneDoorPos);
  const playerPos = props.playerRef.current.getWorldPosition(zonePlayerPos);

  // Calculate 2D distance (ignoring Y axis for floor-level detection)
  const horizontalDistance = Math.sqrt(
    Math.pow(playerPos.x - doorPos.x, 2) +
      Math.pow(playerPos.z - doorPos.z, 2)
  );

  const radius = props.detectionRadius ?? 1;
  setIsInsideArea(horizontalDistance <= radius);
});
```

### Detection Flow

```
Player moves in 3D space
        │
        ▼
CustomRigidBody.useFrame() cada frame
        │
        ▼
Get world positions of player and object
        │
        ▼
Calculate horizontal (XZ plane) distance
        │
        ▼
Compare with detectionRadius (default: 4)
        │
        ▼
Update isInsideArea state
        │
        ▼
useEffect triggers onEnterArea callback
        │
        ▼
ViewMoreWindow appears / disappears
```

### DetectionRadius

Cada objeto tiene su propio `detectionRadius`:

```typescript
// From shuar-data.ts
{
  id: "armadillo-bolso",
  objectData: {
    detectionRadius: 4,
    // ...
  }
}

// Passed through component chain
<CustomRigidBody detectionRadius={4} ... />
```

### CustomRigidBody Props

```typescript
interface CustomRigidBodyProps {
  rigidBody?: RigidBodyProps;           // Rapier RigidBody props
  gltf: Omit<CloneProps, "object"> & { src: string };  // GLTF loading
  ref?: React.Ref<any>;
  playerRef?: any;                       // Player reference
  detectionRadius?: number;              // Detection distance (default: 1)
  onEnterArea?: (isEnter: boolean) => void;  // Callback
}
```

---

## Asset Pipeline

### Asset Locations

| Type | Location | Format |
|------|----------|--------|
| 3D Models | `/public/objects-3D/` | `.glb` |
| Environment | `/public/assets-3D/` | `.hdr` |
| Fonts | `/public/assets-3D/` | `.ttf` |
| Images | `/public/objects-3D/shuar/**/*.webp` | `.webp` |

### Directory Structure

```
public/
├── objects-3D/
│   ├── commons/                    # Shared assets
│   │   ├── ash-tree.glb          # Environment trees
│   │   ├── door-round.glb        # Panel doors
│   │   ├── grass-1.glb          # Grass instances
│   │   ├── grass-tile.glb       # Floor tile
│   │   ├── planks.glb           # Sign boards
│   │   ├── rocks.glb            # Decorative rocks
│   │   ├── robot-expressive.glb # Player character
│   │   └── table-coffee-square.glb  # Object display base
│   └── shuar/                    # Shuar-specific assets
│       ├── hombre-shuar/          # Main character model
│       ├── adornos-corporales/   # Body ornaments category
│       │   ├── armadillo-bolso/
│       │   ├── collar-caracoles/
│       │   ├── natsum/
│       │   ├── tawashap/
│       │   └── temash/
│       ├── alfareria-cocina/     # Pottery category
│       │   ├── ichinkian/
│       │   ├── pinink/
│       │   ├── pumput/
│       │   ├── tsatsa/
│       │   ├── wempenk/
│       │   └── yukunt/
│       ├── caceria-armas/        # Hunting weapons
│       │   ├── nanki/
│       │   ├── tantar/
│       │   └── tsantsa/
│       ├── instrumentos-musicales/
│       │   ├── kantash/
│       │   ├── kitiar/
│       │   ├── pinkiui/
│       │   ├── tampur/
│       │   ├── tumank/
│       │   └── tuntui/
│       ├── navegacion-pesca/
│       │   ├── kanantiu/
│       │   ├── kanu/
│       │   ├── neka/
│       │   └── waiakar/
│       └── tejidos-canastos/
│           ├── chankin/
│           ├── itip/
│           ├── kamush/
│           ├── pitiak/
│           ├── shikiar/
│           └── uyunt/
└── assets-3D/
    ├── je_gray_02_1k.hdr         # Environment lighting
    └── Merienda-SemiBold.ttf     # 3D Text font
```

### Loading Assets

#### GLTF Models

```typescript
// Using Drei's Gltf component
<Gltf
  src="/objects-3D/shuar/adornos-corporales/armadillo-bolso/armadillo-bolso.glb"
  position={[0, 0, 1.5]}
  rotation={[0, Math.PI, 0]}
  scale={1}
/>
```

#### useGLTF Hook

```typescript
// For programmatic access to the model
const { scene, animations } = useGLTF("/objects-3D/commons/robot-expressive.glb");
const { actions } = useAnimations(animations, scene);
```

#### Environment Maps

```typescript
// HDR environment for lighting
<Environment files="/assets-3D/je_gray_02_1k.hdr" ground={{ scale: 100 }} />
```

#### Fonts

```typescript
// 3D Text with custom font
<Text
  font="/assets-3D/Merienda-SemiBold.ttf"
  fontSize={0.5}
  color="#ffe8c8"
  anchorX="center"
  anchorY="middle"
>
  {label}
</Text>
```

---

## Lighting and Environment

### Environment Component

```typescript
<Environment
  files="/assets-3D/je_gray_02_1k.hdr"
  ground={{ scale: 100 }}
/>
```

| Prop | Value | Purpose |
|------|-------|---------|
| `files` | HDR path | Environment map |
| `ground` | `{ scale: 100 }` | Create infinite ground plane |

### Lighting Setup

#### Main Canvas (CanvasEnvironment)

```typescript
<ambientLight intensity={1} />

<directionalLight
  intensity={0.1}
  castShadow
  shadow-bias={-0.0004}
  position={[-20, 20, 20]}
>
  <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
</directionalLight>
```

#### Detail Canvas (ObjectDetail)

```typescript
// 3-point lighting setup
<directionalLight intensity={3} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]} />
<directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[20, 20, 20]} />
<directionalLight intensity={0.8} castShadow shadow-bias={-0.0004} position={[0, -1, -10]} />
```

### Shadow Configuration

| Setting | Value | Purpose |
|---------|-------|---------|
| `castShadow` | `true` | Enable shadow casting |
| `shadow-bias` | `-0.0004` | Prevent shadow acne |
| `shadow-camera` | Orthographic | Shadow map resolution |

---

## Animation System

### Animation States

| State | Trigger | Animation |
|-------|---------|-----------|
| `Idle` | No movement input | Robot idle pose |
| `Walking` | WASD/Arrow keys pressed | Robot walk cycle |
| `Running` | (Future - not implemented) | Robot run cycle |

### Animation Control

```typescript
// Player.tsx
useEffect(() => {
  if (!actions) return;

  if (props.currentAnimation === "Idle") {
    (actions as any).Idle.play();
    (actions as any).Walking.stop();
  } else if (props.currentAnimation === "Walking") {
    (actions as any).Idle.stop();
    (actions as any).Walking.play();
  }
}, [props.currentAnimation]);
```

### Animation Change Handler

```typescript
// PanelView.tsx
const handleAnimationChange = (name: string, pressed: boolean) => {
  const movements = ["forward", "backward", "leftward", "rightward"];

  if (movements.includes(name) && pressed) {
    setCurrentAnimation("Walking");
  }
  if (movements.includes(name) && !pressed) {
    setCurrentAnimation("Idle");
  }
};
```

### CameraShake

For object detail view, subtle camera movement adds life:

```typescript
<CameraShake
  maxYaw={0.1}      // Maximum rotation Y
  maxPitch={0.05}    // Maximum rotation X
  maxRoll={0.05}     // Maximum rotation Z
  yawFrequency={0.05}
  pitchFrequency={0.2}
  rollFrequency={0.2}
  intensity={0.5}
  decayRate={0.65}
/>
```

---

## 3D Components Reference

### CanvasEnvironment

**File:** `app/modules/shared/3D-components/canvas-environment.tsx`

Main 3D canvas with physics world.

### PlayerControl

**File:** `app/modules/shared/3D-components/player-control.tsx`

Keyboard input + ecctrl Controller wrapper.

### Player

**File:** `app/modules/shared/3D-components/player.tsx`

GLTF model with animation state machine.

### MainEnvironment

**File:** `app/modules/shared/3D-components/main-environment.tsx`

Static scene elements (floor, trees, rocks, grass).

### GrassFloor

**File:** `app/modules/shared/3D-components/grass-floor.tsx`

Floor tile with physics body.

### CustomRigidBody

**File:** `app/modules/shared/3D-components/custom-rigid-body.tsx`

Physics body + proximity detection.

### ObjectWithBase

**File:** `app/modules/shared/3D-components/object-with-base.tsx`

Cultural object on a table base.

### ObjectDetail

**File:** `app/modules/shared/3D-components/object-detail.tsx`

Detail view canvas with OrbitControls.

### ObjectList

**File:** `app/modules/ethnic-group/shuar/main-virtual-tour/components/object-list.tsx`

Positions objects in circular arrangement.

### Door

**File:** `app/modules/ethnic-group/shuar/main-virtual-tour/components/door.tsx`

Interactive panel door with label.

### Cartel

**File:** `app/modules/ethnic-group/shuar/main-virtual-tour/components/cartel.tsx`

3D text label on wooden board.

---

## ecctrl Patch

### Why the Patch?

`ecctrl` 1.0.92 tiene errores de TypeScript que fallan en strict mode:

- `joystickBaseGeo` y `joystickStickGeo` no son asignables a `Geometry`
- `window.visualViewport` puede ser null
- `document.querySelector()` retorna `Element | null`

### Patch File

**Location:** `patches/ecctrl+1.0.92.patch`

### Applied Fixes

```typescript
// Problem: Type 'Geometry' is not assignable to type 'Geometry &
//'
geometry={joystickBaseGeo as any}

// Problem: 'window.visualViewport' is possibly 'null'
window.visualViewport!.addEventListener("resize", onWindowResize)

// Problem: 'document.querySelector()' returns 'Element | null'
const joystickDiv: HTMLDivElement = document.querySelector("#ecctrl-joystick")!
```

### How the Patch Works

1. `npm install` runs `postinstall` script
2. `postinstall` runs `patch-package`
3. `patch-package` applies `.patch` files to `node_modules/`
4. Changes persist across `npm install`

### Verification

After `npm install`, verify patch was applied:

```bash
grep -n "as any" node_modules/ecctrl/src/EcctrlJoystick.tsx
```

Should show the patched lines.

---

## Common Patterns

### Creating a New 3D Component

```typescript
// app/modules/shared/3D-components/new-component.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf } from "@react-three/drei";

interface NewComponentProps {
  position?: [number, number, number];
  scale?: number;
  playerRef?: any;
  onEnterArea?: (isEnter: boolean) => void;
}

export default function NewComponent({
  position = [0, 0, 0],
  scale = 1,
  playerRef,
  onEnterArea,
}: NewComponentProps) {
  const ref = useRef<any>(null);

  useFrame(() => {
    // Proximity detection if needed
  });

  return (
    <group position={position}>
      <Gltf
        ref={ref}
        src="/objects-3D/commons/new-model.glb"
        scale={scale}
      />
    </group>
  );
}
```

### Adding a New Object to shuar-data

```typescript
// In shuar-data.ts
{
  id: "new-object-id",
  label: "New Object Name",
  type: "object",  // or "panel"
  objectData: {
    srcObject: "/objects-3D/shuar/category/new-object/new-object.glb",
    description: "Description in Spanish...",
    images: [
      "/objects-3D/shuar/category/new-object/new-object-1.webp",
    ],
    objectProps: {
      position: [0, 0, 1],
      rotation: [0, Math.PI, 0],
      scale: 1,
    },
    objectViewProps: {
      position: [0, 0, 0],
      rotation: [0, Math.PI, 0],
      scale: 1.5,
    },
    detectionRadius: 4,
  },
},
```

### Creating a New Panel Category

```typescript
// 1. Add to Panels type in object-props.ts
export type Panels =
  | "adornos-corporales"
  | "alfareria-cocina"
  | "new-category";

// 2. Add panel entry in mainShuarData
{
  id: "new-category",
  label: "New Category",
  type: "panel"
},

// 3. Add objects array in objectsOfPanel
"new-category": [
  {
    id: "new-object-1",
    label: "New Object 1",
    type: "object",
    objectData: { ... }
  },
],
```
