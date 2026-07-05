# Project Structure Documentation

> **AI-First Changelog (Jul 2026):** Player controller refactored from ecctrl to custom. Mobile simplified. `/test` page removed.

## Table of Contents

1. [Root Directory](#root-directory)
2. [Source Directory (app/)](#source-directory-app)
3. [Modules Directory](#modules-directory)
4. [Public Directory](#public-directory)
5. [Configuration Files](#configuration-files)
6. [Entry Points](#entry-points)

---

## Root Directory

```
out-llacta/
├── app/                           # Next.js App Router
├── public/                         # Static assets
├── docs/                          # Documentation
│   ├── 01-ARCHITECTURE.md
│   ├── 02-CODE_CONVENTIONS.md
│   ├── 03-3D_SYSTEM.md
│   ├── 04-DATA_MODELS.md
│   └── 05-PROJECT_STRUCTURE.md
├── patches/                       # patch-package patches
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── AGENTS.md                      # AI documentation orchestrator
└── README.md                      # Project README
```

### Root Files Summary

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, dependencies, npm scripts |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS with HeroUI plugin |
| `postcss.config.js` | PostCSS for Tailwind processing |
| `AGENTS.md` | AI-First documentation orchestrator |
| `README.md` | Human-facing project overview |
| `patches/` | Patched dependencies |

---

## Source Directory (app/)

```
app/
├── layout.tsx                     # Root layout with metadata
├── page.tsx                       # Landing page (home)
├── providers.tsx                   # HeroUI provider wrapper
├── globals.css                     # Tailwind CSS imports
├── favicon.ico                     # Site favicon
├── ethnic-group/
│   └── shuar/
│       └── page.tsx              # Shuar virtual tour page
└── modules/
    ├── landing/                   # Landing page feature
    ├── ethnic-group/shuar/        # Shuar feature module
    └── shared/                    # Shared cross-cutting modules
```

### Key Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout with HTML structure, metadata, HeroUI provider |
| `page.tsx` | Landing page with project introduction |
| `providers.tsx` | HeroUI React component provider |
| `globals.css` | Tailwind CSS import statements |
| `ethnic-group/shuar/page.tsx` | Main 3D tour experience |

---

## Modules Directory

### Module Organization

```
app/modules/
├── landing/                        # Landing page module
│   └── components/
│       └── cover/
├── ethnic-group/
│   └── shuar/
│       ├── views/                # View components
│       │   ├── panel-view.tsx    # Main 3D panel view
│       │   └── object-detail-view.tsx
│       └── main-virtual-tour/
│           └── components/
│               ├── object-list.tsx   # Object positioning
│               ├── door.tsx          # Panel doors
│               └── cartel.tsx        # 3D labels
└── shared/                        # Shared modules
    ├── 3D-components/            # Three.js components
    ├── 3D-ui-components/        # UI overlays
    ├── components/              # Reusable UI
    ├── data/                   # Static data
    ├── icons/                  # Icon components
    ├── interfaces/             # TypeScript interfaces
    └── layouts/                # Layout wrappers
```

### Module Descriptions

#### Landing Module

**Purpose:** Landing page with project introduction

```
app/modules/landing/
└── components/
    └── cover/
        └── (cover component files)
```

#### Ethnic Group Shuar Module

**Purpose:** Shuar-specific tour components and views

```
app/modules/ethnic-group/shuar/
├── views/
│   ├── panel-view.tsx          # 3D panel with objects
│   └── object-detail-view.tsx  # Individual object viewer
└── main-virtual-tour/
    └── components/
        ├── object-list.tsx      # Circle positioning
        ├── door.tsx            # Interactive doors
        └── cartel.tsx          # 3D text labels
```

#### Shared Module

**Purpose:** Cross-cutting components used throughout

```
app/modules/shared/
├── 3D-components/
│   ├── canvas-environment.tsx  # Main 3D canvas
│   ├── player-control.tsx      # DEPRECATED: Replaced by custom controller in src/features/
│   ├── player.tsx              # Player 3D model
│   ├── main-environment.tsx    # Static scene
│   ├── custom-rigid-body.tsx   # Physics + detection
│   ├── grass-floor.tsx         # Floor physics
│   ├── object-with-base.tsx    # Object + base
│   └── object-detail.tsx       # Detail canvas
├── 3D-ui-components/
│   ├── menu.tsx                # Instructions modal
│   ├── view-more-window.tsx    # Proximity popup
│   ├── floating-image-panel.tsx # Image gallery
│   ├── loading-screen.tsx      # Loading overlay
│   └── return-button.tsx       # Back navigation
├── components/
│   └── card.tsx                # UI card component
├── data/
│   └── shuar-data.ts           # All cultural data (793 lines)
├── icons/
│   ├── menu-icon.tsx            # Menu icon component
│   └── (other icon files)
├── interfaces/
│   ├── object-props.ts          # Core interfaces
│   └── detect-object.ts        # Detection interface
└── layouts/
    └── interface-layout.tsx     # Main UI layout wrapper
```

### New Files (v2.0 Refactor - July 2026)

**Location:** `src/` (Feature-Sliced Design structure)

```
src/
├── features/
│   ├── player-movement/
│   │   ├── player-controller.tsx  # Custom RigidBody controller (replaces ecctrl)
│   │   ├── camera-controller.tsx  # Third-person click-and-hold camera
│   │   └── mobile-controls.tsx    # Mobile walk button (replaces joystick)
│   └── camera-follow/
│       └── (removed - merged into camera-controller.tsx)
├── entities/
│   ├── scene-element/
│   │   └── grass-floor.tsx      # Visual ground (no collider)
│   └── (other entities)
└── shared/
    ├── hooks/
    │   └── use-is-mobile.ts     # Mobile detection hook
    └── lib/
        └── ecctrl-stub.tsx      # Stub (pending removal)
```

**Removed Files:**
- `src/features/player-movement/joystick.tsx` (Nipplejs joystick)
- `src/features/camera-follow/touch-rotation.tsx` (merged into camera controller)
- `src/app/test/` (sandbox page - removed after refactor)

---

## Public Directory

### Static Assets Structure

```
public/
├── objects-3D/                    # 3D model files
│   ├── commons/                   # Shared 3D assets
│   │   ├── ash-tree.glb          # Environment tree
│   │   ├── door-round.glb        # Panel door model
│   │   ├── grass-1.glb           # Grass decoration
│   │   ├── grass-tile.glb        # Floor tile
│   │   ├── planks.glb            # Sign board
│   │   ├── rocks.glb             # Rock decoration
│   │   ├── robot-expressive.glb  # Player character
│   │   └── table-coffee-square.glb # Object display base
│   └── shuar/                     # Shuar-specific assets
│       ├── hombre-shuar/          # Main character
│       │   └── hombre-shuar.glb
│       ├── adornos-corporales/    # Body ornaments
│       │   ├── armadillo-bolso/
│       │   │   └── armadillo-bolso.glb
│       │   ├── collar-caracoles/
│       │   ├── natsum/
│       │   ├── tawashap/
│       │   └── temash/
│       ├── alfareria-cocina/      # Pottery
│       │   ├── ichinkian/
│       │   ├── pinink/
│       │   ├── pumput/
│       │   ├── tsatsa/
│       │   ├── wempenk/
│       │   └── yukunt/
│       ├── caceria-armas/         # Weapons
│       │   ├── nanki/
│       │   ├── tantar/
│       │   └── tsantsa/
│       ├── instrumentos-musicales/ # Instruments
│       │   ├── kantash/
│       │   ├── kitiar/
│       │   ├── pinkiui/
│       │   ├── tampur/
│       │   ├── tumank/
│       │   └── tuntui/
│       ├── navegacion-pesca/      # Fishing
│       │   ├── kanantiu/
│       │   ├── kanu/
│       │   ├── neka/
│       │   └── waiakar/
│       └── tejidos-canastos/       # Weaving
│           ├── chankin/
│           ├── itip/
│           ├── kamush/
│           ├── pitiak/
│           ├── shikiar/
│           └── uyunt/
├── assets-3D/                     # Environment assets
│   ├── je_gray_02_1k.hdr         # HDR environment map
│   └── Merienda-SemiBold.ttf     # 3D font
├── images/                        # 2D images
│   ├── our-llacta-image.webp     # OG image
│   ├── shuar-photo.webp         # Landing card image
│   ├── door-image.webp          # Instructions
│   ├── object-image.webp        # Instructions
│   ├── keys-image.webp          # Instructions
│   └── button-image.webp        # Instructions
├── amor.jpeg                      # Placeholder image
├── our-llacta-logo.svg           # Logo
└── bojuan-logo.svg              # Developer logo
```

### Public Assets Summary

| Category | Count | Formats |
|----------|-------|---------|
| 3D Models (commons) | 8 | .glb |
| 3D Models (shuar) | 30 | .glb |
| Images | 7+ | .webp, .jpeg, .svg |
| Environment | 1 | .hdr |
| Fonts | 1 | .ttf |

---

## Configuration Files

### package.json

**Location:** `package.json`

```json
{
  "name": "our-llacta",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "patch-package"
  },
  "dependencies": {
    "@heroui/react": "^2.7.8",
    "@react-three/drei": "^10.0.7",
    "@react-three/fiber": "^9.1.2",
    "@react-three/rapier": "^2.1.0",
    "ecctrl": "^1.0.92",
    "framer-motion": "^12.10.1",
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.176.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "patch-package": "^8.0.0",
    "postcss": "^8.5.3",
    "postinstall-postinstall": "^2.1.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

### tsconfig.json

**Location:** `tsconfig.json`

Key settings:
- **Strict mode:** `true`
- **Path alias:** `@/*` maps to `./*`
- **Module resolution:** `bundler`

### next.config.ts

**Location:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};

export default nextConfig;
```

### tailwind.config.js

**Location:** `tailwind.config.js`

Key settings:
- **Content paths:** `app/`, `components/`, `node_modules/@heroui/`
- **Plugin:** HeroUI plugin

### patches/

**Location:** `patches/`

```
patches/
└── ecctrl+1.0.92.patch          # TypeScript fix for ecctrl
```

---

## Entry Points

### Application Entry Points

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing page |
| `/ethnic-group/shuar` | `app/ethnic-group/shuar/page.tsx` | 3D tour |

### Component Entry Points

| Component | File | Purpose |
|-----------|------|---------|
| Root Layout | `app/layout.tsx` | HTML structure, metadata |
| Providers | `app/providers.tsx` | HeroUI provider |
| Shuar Page | `app/ethnic-group/shuar/page.tsx` | Main tour logic |
| Interface Layout | `app/modules/shared/layouts/interface-layout.tsx` | UI chrome |

### Data Entry Points

| Data | File | Purpose |
|------|------|---------|
| Main Data | `app/modules/shared/data/shuar-data.ts` | All cultural data |

---

## Directory Purpose Summary

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - all pages and layouts |
| `app/modules/` | Feature modules and shared components |
| `app/modules/landing/` | Landing page feature |
| `app/modules/ethnic-group/shuar/` | Shuar tour feature |
| `app/modules/shared/` | Cross-cutting components |
| `public/` | Static assets served directly |
| `public/objects-3D/` | 3D model files (.glb) |
| `public/assets-3D/` | Environment HDR, fonts |
| `public/images/` | 2D images |
| `docs/` | AI-First documentation |
| `patches/` | Dependency patches |

---

## Import Path Examples

### Path Alias Usage

```typescript
// Using @ alias (preferred)
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";
import { mainShuarData } from "@/app/modules/shared/data/shuar-data";
import CanvasEnvironment from "@/app/modules/shared/3D-components/canvas-environment";

// Relative imports (when in same module)
import Door from "./door";
import Cartel from "./cartel";
```

### Common Import Paths

```typescript
// Interfaces
import { ObjectData, ObjectProps } from "@/app/modules/shared/interfaces/object-props";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";

// Data
import { mainShuarData, objectsOfPanel } from "@/app/modules/shared/data/shuar-data";

// 3D Components
import CanvasEnvironment from "@/app/modules/shared/3D-components/canvas-environment";
import PlayerControl from "@/app/modules/shared/3D-components/player-control";
import MainEnvironment from "@/app/modules/shared/3D-components/main-environment";
import CustomRigidBody from "@/app/modules/shared/3D-components/custom-rigid-body";

// UI Components
import Menu from "@/app/modules/shared/3D-ui-components/menu";
import ViewMoreWindow from "@/app/modules/shared/3D-ui-components/view-more-window";

// Views
import PanelView from "@/app/modules/ethnic-group/shuar/views/panel-view";
import ObjectDetailView from "@/app/modules/ethnic-group/shuar/views/object-detail-view";

// Shuar Components
import ObjectList from "@/app/modules/ethnic-group/shuar/main-virtual-tour/components/object-list";
import Door from "@/app/modules/ethnic-group/shuar/main-virtual-tour/components/door";
import Cartel from "@/app/modules/ethnic-group/shuar/main-virtual-tour/components/cartel";
```

---

## File Naming by Type

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase `.tsx` | `PanelView.tsx`, `ObjectDetail.tsx` |
| Interfaces | kebab-case `.ts` | `object-props.ts`, `detect-object.ts` |
| Data | kebab-case `.ts` | `shuar-data.ts` |
| Utils | kebab-case `.ts` | (none currently) |
| Config | kebab-case `.js/.ts` | `next.config.ts`, `tailwind.config.js` |
