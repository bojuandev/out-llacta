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
| `player-movement/` | Player movement controls (keyboard + joystick) | `joystick.tsx`, `constants.ts`, `types.ts` |
| `camera-follow/` | Camera tracking and touch rotation | `touch-rotation.tsx`, `types.ts` |

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
│   └── ecctrl-stub.tsx  # Temporary stub for ecctrl replacement
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

The project is transitioning from `ecctrl` to a custom player controller. Current status:

| Component | Status | Location |
|-----------|--------|----------|
| `ecctrl-stub.tsx` | ✓ Complete | `src/shared/lib/ecctrl-stub.tsx` |
| `JoystickMovement` | ✓ Implemented | `src/features/player-movement/joystick.tsx` |
| `TouchRotation` | ✓ Implemented | `src/features/camera-follow/touch-rotation.tsx` |
| Custom Player Controller | ⏳ Pending | Needs implementation |

The stub files will be replaced with actual implementations in future iterations.

## Physics Configuration

Physics are managed via `@react-three/rapier`:

```tsx
<Physics timeStep={1/60}>
  {children}
</Physics>
```

Key configurations:
- `timeStep={1/60}` - Fixed timestep for deterministic physics
- `colliders="cuboid"` - Used for floor collision (not `trimesh`)
- `ccd={true}` - Enabled for fast-moving objects to prevent tunneling

## Mobile Joystick (nipplejs)

Mobile controls use `nipplejs` for joystick input:

```tsx
<JoystickMovement
  onMove={(direction) => handleMove(direction)}
  onMoveEnd={() => handleMoveEnd()}
/>
```

Zone layout:
- **Left half**: Joystick for player movement
- **Right half**: Touch rotation for camera control
