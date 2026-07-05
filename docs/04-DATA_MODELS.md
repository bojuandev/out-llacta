# Data Models Documentation

## Table of Contents

1. [Interfaces Overview](#interfaces-overview)
2. [Core Interfaces](#core-interfaces)
3. [Panel Hierarchy](#panel-hierarchy)
4. [shuar-data Structure](#shuar-data-structure)
5. [Data Relationships](#data-relationships)
6. [Type Unions](#type-unions)

---

## Interfaces Overview

### Location

All interfaces are defined in:

```
app/modules/shared/interfaces/
├── object-props.ts    # Main data interfaces
└── detect-object.ts   # Detection-specific interface
```

### Files Summary

| File | Purpose |
|------|---------|
| `object-props.ts` | Core interfaces for objects, panels, and 3D properties |
| `detect-object.ts` | Interface for proximity detection state |

---

## Core Interfaces

### ObjectProps

**File:** `app/modules/shared/interfaces/object-props.ts:3-7`

Base interface for 3D object positioning:

```typescript
export interface ObjectProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}
```

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `position` | `Vector3` | No | `[0, 0, 0]` | X, Y, Z coordinates |
| `rotation` | `Euler` | No | `[0, 0, 0]` | Rotation in radians |
| `scale` | `number \| Vector3` | No | `1` | Uniform or per-axis scale |

**Usage Example:**

```typescript
// In shuar-data.ts
objectProps: {
  position: [0, 1.5, 1],
  rotation: [0, Math.PI, 0],
  scale: 0.3,
}
```

### ObjectData

**File:** `app/modules/shared/interfaces/object-props.ts:9-25`

Main interface for all objects and panels in the tour:

```typescript
export interface ObjectData extends ObjectProps {
  id: string;
  label: string;
  type: "object" | "panel";
  objectData?: {
    srcObject: string;
    groupProps?: ObjectProps;
    objectProps?: ObjectProps;
    objectViewProps?: ObjectProps;
    detectionRadius?: number;
    description?: string;
    images?: string[];
  };
  canvasProps?: {
    camera?: CameraProps;
  };
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | **Yes** | Unique identifier |
| `label` | `string` | **Yes** | Display name (Spanish) |
| `type` | `"object" \| "panel"` | **Yes** | Object vs panel distinction |
| `objectData` | `ObjectDataObject` | No | Object-specific data (if type === "object") |
| `canvasProps` | `ObjectDataCanvas` | No | Camera props (if type === "object") |

#### ObjectDataObject (objectData property)

```typescript
objectData?: {
  srcObject: string;              // Path to .glb file
  groupProps?: ObjectProps;        // Position of object in scene
  objectProps?: ObjectProps;       // Offset within group
  objectViewProps?: ObjectProps;   // Props for detail view
  detectionRadius?: number;        // Proximity trigger distance
  description?: string;            // Spanish description
  images?: string[];               // Additional images
};
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `srcObject` | `string` | Required | Path to `.glb` model |
| `groupProps` | `ObjectProps` | - | Main group transform |
| `objectProps` | `ObjectProps` | - | Model offset within group |
| `objectViewProps` | `ObjectProps` | - | Props for orbit view |
| `detectionRadius` | `number` | `4` | Trigger distance |
| `description` | `string` | - | Cultural description |
| `images` | `string[]` | `[]` | Image gallery |

#### ObjectDataCanvas (canvasProps property)

```typescript
canvasProps?: {
  camera?: CameraProps;
};
```

Used for custom camera in object detail view:

```typescript
canvasProps: {
  camera: {
    fov: 100,
    position: [0, 2, 10],
  },
},
```

### ObjectDetected

**File:** `app/modules/shared/interfaces/detect-object.ts:3-5`

Extends `ObjectData` with detection state:

```typescript
import { ObjectData } from "./object-props";

export interface ObjectDetected extends ObjectData {
  isEnter: boolean;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `isEnter` | `boolean` | `true` if player is within detectionRadius |

---

## Panel Hierarchy

### Panels Type

**File:** `app/modules/shared/interfaces/object-props.ts:27`

```typescript
export type Panels =
  | "adornos-corporales"
  | "alfareria-cocina"
  | "caceria-armas"
  | "instrumentos-musicales"
  | "navegacion-pesca"
  | "tejidos-canastos";
```

### Panel Categories

| ID | Spanish Label | English Translation | Object Count |
|----|---------------|---------------------|--------------|
| `adornos-corporales` | Adornos corporales | Body Ornaments | 5 |
| `alfareria-cocina` | Alfareria y Cocina | Pottery and Kitchen | 6 |
| `caceria-armas` | Cacería y Armas | Hunting and Weapons | 3 |
| `instrumentos-musicales` | Instrumentos musicales | Musical Instruments | 6 |
| `navegacion-pesca` | Navegación y pesca | Navigation and Fishing | 4 |
| `tejidos-canastos` | Tejidos y Canastos | Weaving and Baskets | 6 |

### Panel vs Object Distinction

| Property | Panel | Object |
|----------|-------|--------|
| `type` | `"panel"` | `"object"` |
| `objectData` | `undefined` | Required |
| `purpose` | Category entrance (Door) | Individual cultural item |
| `rendered as` | `Door` component | `ObjectWithBase` component |

**Example Panel Entry:**

```typescript
// mainShuarData entry - type "panel"
{
  id: "adornos-corporales",
  label: "Adornos corporales",
  type: "panel",
  // No objectData - panels don't have 3D models
}
```

**Example Object Entry:**

```typescript
// mainShuarData entry - type "object"
{
  id: "hombre-shuar",
  label: "Hombre Shuar",
  type: "object",
  objectData: {
    srcObject: "/objects-3D/shuar/hombre-shuar/hombre-shuar.glb",
    description: "El hombre comunmente viste una falda...",
    objectProps: {
      position: [0, 1.65, 1.5],
      rotation: [0, Math.PI, 0],
    },
    detectionRadius: 4,
    images: [
      "/objects-3D/shuar/hombre-shuar/hombre-shuar-1.webp",
      // ...
    ],
  },
}
```

---

## shuar-data Structure

### Location

**File:** `app/modules/shared/data/shuar-data.ts` (793 lines)

### Exports

```typescript
import { ObjectData, ObjectOfPanel } from "../interfaces/object-props";

export const mainShuarData: ObjectData[] = [...];
export const objectsOfPanel: ObjectOfPanel = {...};
```

### mainShuarData

First level data - the main menu entries:

```typescript
export const mainShuarData: ObjectData[] = [
  {
    id: "hombre-shuar",
    label: "Hombre Shuar",
    type: "object",
    objectData: { ... }
  },
  { id: "adornos-corporales", label: "Adornos corporales", type: "panel" },
  { id: "alfareria-cocina", label: "Alfarería y Cocina", type: "panel" },
  { id: "caceria-armas", label: "Cacería y Armas", type: "panel" },
  { id: "instrumentos-musicales", label: "Instrumentos musicales", type: "panel" },
  { id: "navegacion-pesca", label: "Navegación y pesca", type: "panel" },
  { id: "tejidos-canastos", label: "Tejidos y Canastos", type: "panel" },
];
```

**Structure:**

```
mainShuarData (7 entries)
├── 1 object (Hombre Shuar - main character)
└── 6 panels (category doors)
```

### objectsOfPanel

Second level data - objects within each panel:

```typescript
export type ObjectOfPanel = Record<string, ObjectData[]>;

export const objectsOfPanel: ObjectOfPanel = {
  "adornos-corporales": [
    { id: "armadillo-bolso", label: "Bolso de Armadillo", type: "object", objectData: {...} },
    { id: "collar-caracoles", label: "Collar de Caracoles", type: "object", objectData: {...} },
    // ...
  ],
  "alfareria-cocina": [...],
  // ...
};
```

**Structure:**

```
objectsOfPanel
├── adornos-corporales (5 objects)
├── alfareria-cocina (6 objects)
├── caceria-armas (3 objects)
├── instrumentos-musicales (6 objects)
├── navegacion-pesca (4 objects)
└── tejidos-canastos (6 objects)

Total: 30 cultural objects
```

### Total Object Count

| Category | Count |
|----------|-------|
| Main character (Hombre Shuar) | 1 |
| Panel categories | 6 |
| Cultural objects | 30 |
| **Total 3D models** | **31** (1 character + 30 objects) |

---

## Data Relationships

### Entry Point Flow

```
shuar-data.ts
    │
    ├── mainShuarData (7 entries)
    │       │
    │       └── hombre-shuar (object) + 6 panels
    │
    └── objectsOfPanel (30 objects)
            │
            └── keyed by panel id
```

### Navigation Data Flow

```
1. User starts at main panel
   └── currentDataView = undefined
   └── PanelView renders mainShuarData

2. User clicks "Adornos corporales" panel
   └── handleGoView({ id: "adornos-corporales", type: "panel", ... })
   └── breadcrumbList = [{ id: "adornos-corporales", type: "panel", ... }]
   └── currentDataView = adornos-corporales entry
   └── PanelView renders objectsOfPanel["adornos-corporales"]

3. User clicks "Armadillo Bolso" object
   └── handleGoView({ id: "armadillo-bolso", type: "object", ... })
   └── breadcrumbList = [
     { id: "adornos-corporales", type: "panel", ... },
     { id: "armadillo-bolso", type: "object", ... }
   ]
   └── currentDataView = armadillo-bolso entry
   └── ObjectDetailView renders armadillo-bolso detail
```

### Component Data Usage

| Component | Data Source | Usage |
|-----------|-------------|-------|
| `PanelView` | `mainShuarData` or `objectsOfPanel[id]` | Renders circle of objects |
| `ObjectList` | `objectsOfPanel[id]` | Positions objects in scene |
| `Door` | Panel entry from `mainShuarData` | Panel entrance |
| `ObjectWithBase` | Object entry | Cultural object display |
| `ObjectDetailView` | Object entry | Detail view rendering |
| `InterfaceLayout` | `currentDataView` | Shows object name/description |

---

## Type Unions

### ObjectOfPanel Type

**File:** `app/modules/shared/interfaces/object-props.ts:28`

```typescript
export type ObjectOfPanel = Record<string, ObjectData[]>;
```

A dictionary mapping panel ID to array of objects:

```typescript
// Usage
const objects: ObjectData[] = objectsOfPanel["adornos-corporales"];
```

### Type Guards

The `type` field acts as a discriminant:

```typescript
function renderView(currentDataView: ObjectData | undefined) {
  if (!currentDataView) {
    // Main panel view
    return <PanelView objectsOfPanel={mainShuarData} />;
  }

  if (currentDataView.type === "panel") {
    // Category panel view
    return <PanelView objectsOfPanel={objectsOfPanel[currentDataView.id]} />;
  }

  if (currentDataView.type === "object") {
    // Object detail view
    return <ObjectDetailView object={currentDataView} />;
  }
}
```

### Union Types

```typescript
// Panel IDs union
type PanelId = "adornos-corporales" | "alfareria-cocina" | ...;

// Object or Panel
type TourEntry = { type: "object", objectData: {...} } | { type: "panel" };

// Modal content types
type ModalContentType = "menu" | "indications" | "controls";

// Animation states
type AnimationState = "Idle" | "Walking" | "Running";
```

---

## CameraProps

From `@react-three/fiber`:

```typescript
interface CameraProps {
  fov?: number;           // Field of view
  aspect?: number;        // Aspect ratio
  near?: number;          // Near clipping plane
  far?: number;           // Far clipping plane
  zoom?: number;          // Zoom level
  position?: Vector3;     // Camera position
  rotation?: Euler;       // Camera rotation
  film?: number;          // Film gate
  filmOffset?: number;    // Film offset
  makeDefault?: boolean;   // Set as default camera
}
```

**Example Custom Camera:**

```typescript
canvasProps: {
  camera: {
    fov: 100,
    position: [0, 2, 10],
  },
},
```

---

## Usage Examples

### Getting Panel Objects

```typescript
import { objectsOfPanel } from "@/app/modules/shared/data/shuar-data";

const adornosObjects = objectsOfPanel["adornos-corporales"];
// Returns: ObjectData[] with 5 objects
```

### Checking Object Type

```typescript
if (currentObject?.type === "object") {
  // Has objectData
  console.log(currentObject.objectData?.description);
}

if (currentObject?.type === "panel") {
  // Is a panel entry
  console.log("Panel:", currentObject.label);
}
```

### Creating New Object Entry

```typescript
{
  id: "new-object-id",
  label: "Nombre del Objeto",
  type: "object",
  objectData: {
    srcObject: "/objects-3D/shuar/category/new-object/new-object.glb",
    description: "Descripcion cultural del objeto...",
    objectProps: {
      position: [0, 1, 1.5],
      rotation: [0, Math.PI, 0],
      scale: 1,
    },
    objectViewProps: {
      position: [0, 0, 0],
      rotation: [0, Math.PI, 0],
      scale: 1.2,
    },
    detectionRadius: 4,
    images: [
      "/objects-3D/shuar/category/new-object/new-object-1.webp",
      "/objects-3D/shuar/category/new-object/new-object-2.webp",
    ],
  },
  canvasProps: {
    camera: {
      fov: 50,
      position: [0, 2, 10],
    },
  },
}
```

### Creating New Panel Entry

```typescript
{
  id: "nueva-categoria",
  label: "Nueva Categoria",
  type: "panel",
  // No objectData needed for panels
}
```

---

## Type Safety

### Required vs Optional Properties

```typescript
// ObjectData
{
  id: string;           // Required
  label: string;        // Required
  type: "object" | "panel";  // Required
  objectData?: {...};   // Only for type="object"
  canvasProps?: {...};  // Only for type="object"
}

// ObjectProps
{
  position?: Vector3;   // All optional
  rotation?: Euler;
  scale?: number | Vector3;
}
```

### Null Safety

```typescript
// Using optional chaining
const images = currentObject?.objectData?.images ?? [];

// Using nullish coalescing
const radius = props.detectionRadius ?? 4;

// Safe property access
if (currentObject?.type === "object") {
  const desc = currentObject.objectData?.description;
}
```
