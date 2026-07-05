# FSD Architecture v2.0

## Overview

This document describes the Feature-Sliced Design (FSD) architecture adopted for the Our Llacta project in the v2.0 refactor.

## Directory Structure

```
src/
├── entities/           # Business entities (Player, CulturalObject, SceneElement)
├── features/            # User features (player-movement, camera-follow)
├── widgets/             # Composed UI blocks (tour-canvas, ui-overlay)
├── pages/               # Route pages (reserved for future use)
└── shared/              # Cross-cutting code
    ├── 3d/              # 3D rendering utilities
    ├── ui/              # UI components and icons
    ├── lib/             # Libraries and stubs
    └── config/          # Configuration files
```

## Layer Rules

### Entities (`src/entities/`)

Business entities that represent domain objects.

| Entity | Description | Key Files |
|--------|-------------|-----------|
| `player/` | 3D player model and configuration | `model.tsx`, `types.ts` |
| `cultural-object/` | Cultural artifacts and panel data | `data/shuar-data.ts`, `types.ts` |
| `scene-element/` | Environmental elements (floor, rocks, trees) | `grass-floor.tsx`, `main-environment.tsx`, `proximity-detector.tsx` |

**Imports:** Can import from `shared/` only.

### Features (`src/features/`)

User-facing features that provide functionality.

| Feature | Description | Key Files |
|---------|-------------|-----------|
| `player-movement/` | Player movement controls (keyboard + mobile walk button) | `player-controller.tsx`, `camera-controller.tsx`, `mobile-controls.tsx`, `constants.ts`, `types.ts` |
| `camera-follow/` | Camera tracking (merged into player-movement) | *(DEPRECATED - use `player-movement/camera-controller.tsx`)* |

**Imports:** Can import from `entities/` and `shared/` only.

### Widgets (`src/widgets/`)

Composed UI blocks that combine entities and features.

| Widget | Description |
|--------|-------------|
| `ui-overlay/` | Loading screen and menu components |
| `tour-canvas/` | 3D canvas with physics (pending implementation) |

**Imports:** Can import from all layers above (`entities/`, `features/`, `shared/`).

### Shared (`src/shared/`)

Cross-cutting code used throughout the application.

```
shared/
├── 3d/                  # 3D rendering utilities (future)
├── ui/                  # Reusable UI components and icons
├── lib/                 # Libraries, stubs, and utilities
│   └── ecctrl-stub.tsx  # Stub - ecctrl replaced by custom controller (pending cleanup)
└── config/              # Configuration files
```

## Imports Convention

Follow the FSD rule: **only import from layers below or at the same level**.

```
✓ Allowed:
  features → entities
  features → shared
  widgets → features
  widgets → entities
  widgets → shared

✗ Not Allowed:
  entities → features
  shared → entities
  entities → widgets
```

## Path Aliases

The project uses the `@/` alias for imports:

```typescript
// Instead of:
import { PlayerModel } from "../../../entities/player";

// Use:
import { PlayerModel } from "@/entities/player";
```

The alias points to `src/` directory.

## Pending Replacements

### ecctrl Replacement

The project has completed the transition from `ecctrl` to a custom player controller.

| Component | Status | Location |
|-----------|--------|----------|
| `ecctrl-stub.tsx` | ✓ Replaced | `src/shared/lib/ecctrl-stub.tsx` (pending cleanup) |
| `Custom Player Controller` | ✓ Implemented | `src/features/player-movement/player-controller.tsx` |
| `Custom Camera Controller` | ✓ Implemented | `src/features/player-movement/camera-controller.tsx` |
| `Mobile Walk Button` | ✓ Implemented | `src/features/player-movement/mobile-controls.tsx` |
| `Touch Rotation` | ✓ Merged | Into `camera-controller.tsx` |
| `JoystickMovement` | ✗ Removed | Nipplejs dependency eliminated |

## Physics Configuration

Physics are managed via `@react-three/rapier`:

```tsx
<Physics timeStep={1/60} gravity={[0, -20, 0]}>
  <RigidBody type="fixed" position={[0, -0.1, 0]}>
    <CuboidCollider args={[100, 0.1, 100]} />
  </RigidBody>
  {children}
</Physics>
```

Key configurations:
- `timeStep={1/60}` - Fixed timestep for deterministic physics
- `gravity={[0, -20, 0]}` - Stronger gravity for snappy movement
- Floor: `RigidBody type="fixed"` + `CuboidCollider` at `y=-0.1` (thin, aligned with visual)
- Player: `RigidBody type="dynamic"` + `CapsuleCollider args={[0.5, 0.25]}`

## Mobile Controls (No Joystick)

Mobile controls were simplified after empirical testing. The best UX is:
1. **Rotate camera** by touch-dragging on the canvas
2. **Walk forward** by holding the "Caminar" button

This mirrors common mobile games (e.g., Minecraft PE) and avoids overlay blocking UI.

**Implementation:**
- **Touch rotation**: `onPointerDown/Move/Up` on `<Canvas>` element (in `camera-controller.tsx`)
- **Walk button**: Fixed bottom-right `z-50`, `onPointerDown/Up` toggles `forward` state (in `mobile-controls.tsx`)

**Removed:**
- `nipplejs` dependency
- `src/features/player-movement/joystick.tsx`
- `src/features/camera-follow/touch-rotation.tsx`
- **Right half**: Touch rotation for camera control
