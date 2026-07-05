# Code Conventions Documentation

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [Import Organization](#import-organization)
3. [TypeScript Patterns](#typescript-patterns)
4. [Component Patterns](#component-patterns)
5. [Props Interfaces](#props-interfaces)
6. [Styling Conventions](#styling-conventions)
7. [File Structure](#file-structure)
8. [Code Formatting](#code-formatting)

---

## Naming Conventions

### Files

**Pattern:** kebab-case

| Type | Example | Location |
|------|---------|----------|
| TypeScript interfaces | `object-props.ts` | `app/modules/shared/interfaces/` |
| React components | `canvas-environment.tsx` | `app/modules/shared/3D-components/` |
| Utilities | `detect-object.ts` | `app/modules/shared/interfaces/` |
| Data files | `shuar-data.ts` | `app/modules/shared/data/` |

### React Components

**Pattern:** PascalCase

```typescript
// Correct
function InterfaceLayout() { ... }
function ObjectDetailView() { ... }
function CustomRigidBody() { ... }

// Incorrect
function interfaceLayout() { ... }
function object_detail_view() { ... }
```

### Functions and Variables

**Pattern:** camelCase

```typescript
// Correct
const handleObjectDetected = (object: ObjectDetected) => { ... };
const breadcrumbList = useState<ObjectDetected[]>([]);
const currentDataView = useMemo(() => breadcrumbList.at(-1), [breadcrumbList]);

// Incorrect
const Handle_Object_Detected = ...;
const breadcrumb_list = ...;
```

### Interfaces and Types

**Pattern:** PascalCase with descriptive suffixes

```typescript
// Correct
interface ObjectProps { ... }
interface ObjectData extends ObjectProps { ... }
interface ObjectDetected extends ObjectData { isEnter: boolean; }
type Panels = "adornos-corporales" | "alfareria-cocina";
type ObjectOfPanel = Record<string, ObjectData[]>;

// Incorrect
interface object_props { ... }
type panelType = string;
```

### Constants

**Pattern:** camelCase or SCREAMING_SNAKE_CASE for true constants

```typescript
// Module-level constants
const mainShuarData: ObjectData[] = [...];
const objectsOfPanel: ObjectOfPanel = {...};

// True constants (rarely changed)
const KEYBOARD_MAP = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  // ...
];
```

### Directories

**Pattern:** kebab-case

```
app/modules/ethnic-group/shuar/main-virtual-tour/components/
app/modules/shared/3D-components/
app/modules/shared/3D-ui-components/
```

---

## Import Organization

### Order of Imports

Imports deben seguir este orden especifico:

1. **External libraries** (React, Next.js, HeroUI, Three.js ecosystem)
2. **Internal path aliases** (`@/app/modules/...`)
3. **Relative imports** (sibling modules)

```typescript
// 1. External libraries
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";

// 2. Internal path aliases
import PanelView from "@/app/modules/ethnic-group/shuar/views/panel-view";
import ObjectDetailView from "@/app/modules/ethnic-group/shuar/views/object-detail-view";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import InterfaceLayout from "@/app/modules/shared/layouts/interface-layout";

// 3. Relative imports (when needed)
import Cartel from "./cartel";
import { ObjectProps } from "../interfaces/object-props";
```

### Path Alias Configuration

El proyecto usa `@/*` como alias base:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

```typescript
// Ejemplos de uso
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";
import { mainShuarData } from "@/app/modules/shared/data/shuar-data";
import PlayerControl from "@/app/modules/shared/3D-components/player-control";
```

### Named vs Default Imports

```typescript
// Named imports (preferir para consistencia)
import { Button, Card, Modal } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";

// Default imports (para componentes principales)
import PanelView from "@/app/modules/ethnic-group/shuar/views/panel-view";
import CanvasEnvironment from "@/app/modules/shared/3D-components/canvas-environment";

// Mixed (cuando es necesario)
import { useControls, Gltf, Text } from "@react-three/drei";
```

---

## TypeScript Patterns

### Strict Mode

El proyecto usa **TypeScript strict mode**:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Interface Declarations

```typescript
// Props interfaces siempre al final del archivo o en archivos separados
interface ObjectListProps {
  objectsToRender: ObjectData[];
  playerRef?: any;
  onEnterArea?: (objectData: ObjectData) => (isEnter: boolean) => void;
}
```

### Type Extensions

```typescript
// Extender tipos existentes
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

### Optional Chaining y Nullish Coalescing

```typescript
// Optional chaining para acceso seguro
const label = currentObject?.label;
const description = currentObject?.objectData?.description;
const images = currentObject?.objectData?.images ?? [];

// Nullish coalescing para valores por defecto
const radius = props.detectionRadius ?? 1;
const position = object.objectData?.objectProps?.position ?? [0, 0, 0];
```

### Union Types para String Literals

```typescript
// Usar union types para valores discretos
type ModalContentType = "menu" | "indications" | "controls";

// En switch/case
switch (contentModalType) {
  case "menu": return renderMenu();
  case "indications": return renderIndications();
  case "controls": return renderControls();
}
```

### Any Type

Usar `any` solo cuando sea estrictamente necesario (con comentario):

```typescript
// Aceptable: playerRef es un ref a un objeto three.js
const playerRef = useRef<any>(null);

// Aceptable: acciones de animacion son dynamic
(actions as any).Idle.play();

// Evitar en nuevos archivos cuando sea posible
```

---

## Component Patterns

### Client Components

Todos los componentes 3D y UI interactivos deben usar `"use client"`:

```typescript
"use client";

import { Canvas } from "@react-three/fiber";
import { Button } from "@heroui/react";

function CanvasEnvironment(props: CanvasEnvironmentProps) {
  // ...
}
```

### Functional Components

Solo functional components (no class components):

```typescript
// Correct
function Menu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // ...
}

// Incorrect
class Menu extends Component {
  render() {
    // ...
  }
}
```

### Destructuring Props

```typescript
// Props completas (cuando se usan multiples)
function InterfaceLayout({
  children,
  currentObject,
  showReturnButton,
  objectDetected,
  goView,
  returnView,
}: InterfaceLayouyt) {
  // ...
}

// Props parciales (cuando se pasan al hijo)
function Door(props: DoorProps) {
  const { labelDoor, playerRef, onEnterArea, groupProps } = props;
  // ...
}
```

### Compound Components con Render Props

```typescript
// Render props para contenido dinamico con loading state
<InterfaceLayout
  showReturnButton={showReturnButton}
  objectDetected={objectDetected}
  goView={handleGoView}
  returnView={handleReturnView}
  currentObject={currentDataView}
>
  {(loading) => (
    <>
      {!currentDataView && <PanelView ... loading={loading} />}
      {currentDataView?.type === "panel" && <PanelView ... loading={loading} />}
      {currentDataView?.type === "object" && <ObjectDetailView ... />}
    </>
  )}
</InterfaceLayout>
```

---

## Props Interfaces

### Naming Convention

```typescript
// [ComponentName]Props
interface ObjectListProps { ... }
interface DoorProps { ... }
interface PlayerControlProps { ... }
interface ViewMoreWindowProps { ... }
```

### Optional vs Required Props

```typescript
// Props opcionales con ?
interface DoorProps {
  labelDoor?: string;           // Optional
  playerRef?: any;              // Optional
  detectionRadius?: number;     // Optional
  onEnterArea?: (isEnter: boolean) => void;  // Optional callback
  groupProps?: ObjectProps;     // Optional
  cartelProps?: ObjectProps;   // Optional
  doorProps?: ObjectProps;      // Optional
}

// Props requeridos (sin ?)
interface ObjectListProps {
  objectsToRender: ObjectData[];  // Required
  onEnterArea?: ...;              // Optional callback
  playerRef?: any;               // Optional
}
```

### Callback Props Pattern

```typescript
// Para callbacks que reciben datos del hijo
onEnterArea?: (objectData: ObjectData) => (isEnter: boolean) => void;

// Uso en el hijo
const handleEnterArea = (objectData: ObjectData) => (isEnter: boolean) => {
  objectDetected?.({ ...objectData, isEnter });
};

// Pasando curried function
<Door onEnterArea={handleEnterArea(objectData)} />
```

---

## Styling Conventions

### Tailwind CSS

El proyecto usa **Tailwind CSS** para estilos:

```typescript
// Clases de Tailwind directamente en JSX
<div className="absolute top-6 right-6 transform">
  <Button onPress={onOpen} isIconOnly>
    <MenuIcon />
  </Button>
</div>

// Responsive prefixes
<div className="w-full h-screen flex flex-col md:flex-row gap-6 items-center">

// Conditional classes (template literals)
<Alert
  description={` Dirigete a ${
    !currentObject ? "una puerta" : "un objeto"
  } para poder ...`}
  title={`Panel ${
    !currentObject ? "Principal" : currentObject.label
  }`}
/>
```

### CSS Order in JSX

Orden recomendado de clases Tailwind:

```typescript
// 1. Layout (position, display)
// 2. Sizing (width, height)
// 3. Spacing (margin, padding)
// 4. Typography (text-*, font-*)
// 5. Colors (text-*, bg-*, border-*)
// 6. Effects (shadow, opacity)
// 7. Interactivity (hover:*, focus:*)

// Correct order example
<div className="absolute top-20 left-1/2 -translate-x-1/2 w-[350px] md:w-96 p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50">
```

### Dark Mode

No hay configuracion explicita de dark mode - el tema de HeroUI puede manejarlo internamente.

---

## File Structure

### Single Responsibility

Cada archivo debe tener una unica responsabilidad:

```
// Correct: Un componente por archivo
app/modules/shared/3D-components/
├── canvas-environment.tsx    # Canvas + Physics setup
├── player-control.tsx        # Player input handling
├── player.tsx                # Player 3D model + animations
├── main-environment.tsx      # Static scene elements
├── custom-rigid-body.tsx     # Physics + proximity detection
├── grass-floor.tsx           # Floor physics body
├── object-with-base.tsx      # Cultural object + base
└── object-detail.tsx         # OrbitControls canvas

// Incorrect
app/modules/shared/3D-components/utils-mixed.tsx  # Multiple responsibilities
```

### Component File Location

Componentes van cerca de donde se usan:

```
app/modules/
├── ethnic-group/shuar/
│   ├── views/
│   │   ├── panel-view.tsx          # Uses ObjectList
│   │   └── object-detail-view.tsx  # Uses ObjectDetail
│   └── main-virtual-tour/
│       └── components/
│           ├── object-list.tsx     # Uses Door, ObjectWithBase
│           ├── door.tsx            # Only used by ObjectList
│           └── cartel.tsx          # Used by Door and ObjectWithBase
└── shared/
    ├── 3D-components/
    │   └── object-detail.tsx       # Used by ObjectDetailView
    └── 3D-ui-components/
        └── menu.tsx               # Used by InterfaceLayout
```

---

## Code Formatting

### Indentation

**2 spaces** (no tabs):

```typescript
function Menu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contentModalType, setContentModalType] = useState<ModalContentType>("menu");

  const handleChangeContentModalType = (contentType: ModalContentType & "exit") => {
    if (contentType === "exit") {
      return redirect("/");
    }
    setContentModalType(contentType);
  };
}
```

### Line Length

No hay limite estricto, pero preferir lineas cortas:

```typescript
// Aceptable si es legible
const horizontalDistance = Math.sqrt(
  Math.pow(playerPos.x - doorPos.x, 2) +
    Math.pow(playerPos.z - doorPos.z, 2)
);

// Alternativa para props largos
<Button
  className="absolute md:hidden z-10 bottom-36 right-12 w-20 h-20 border-2 border-solid text-white font-bold shadow-lg opacity-60"
  radius="full"
  color="default"
  onPointerEnter={handlePointer(true)}
  onPointerLeave={handlePointer(false)}
>
  Caminar
</Button>
```

### Blank Lines

```typescript
// Espacios en blanco entre logical blocks
function PanelView({ objectDetected, objectsOfPanel, loading, currentObject }: PanelProps) {
  const playerRef = useRef<any>(null);
  const [currentAnimation, setCurrentAnimation] = useState<"Idle" | "Walking">("Idle");
  const setJoystick = useJoystickControls((state) => state.setJoystick);

  const handleAnimationChange = (name: string, pressed: boolean) => {
    const movements = ["forward", "backward", "leftward", "rightward"];
    // ...
  };

  const handleEnterArea = (objectData: ObjectData) => (isEnter: boolean) => {
    objectDetected?.({ ...objectData, isEnter });
  };

  return (
    <>
      {/* JSX */}
    </>
  );
}
```

### Semicolons

**Yes** (estilo JavaScript estandar):

```typescript
const handleGoView = (objectDetected: ObjectDetected) => {
  const newbreadcrumb = [...breadcrumbList];
  newbreadcrumb.push(objectDetected);
  setBreadcrumb(newbreadcrumb);
  setShowReturnButton(newbreadcrumb.length > 0);
  setObjectDetected(null);
};
```

---

## Best Practices Summary

| Practice | Recommendation |
|----------|----------------|
| Naming files | kebab-case (`object-props.ts`) |
| Naming components | PascalCase (`InterfaceLayout`) |
| Naming functions | camelCase (`handleGoView`) |
| Naming interfaces | PascalCase (`ObjectData`) |
| Imports order | External → Alias → Relative |
| Component type | Functional only (`"use client"`) |
| Props typing | Explicit interface (`ObjectListProps`) |
| Null safety | Optional chaining (`?.`) and nullish coalescing (`??`) |
| Styling | Tailwind CSS utility classes |
| Indentation | 2 spaces |
| Semicolons | Yes |

---

## Code to Avoid

```typescript
// EVITAR: Class components
class OldComponent extends Component { ... }

// EVITAR: Var (usar const/let)
var oldStyle = "bad";

// EVITAR: Anonymous functions sin tipo en callbacks importantes
someArray.map(function(item) { ... });

// EVITAR: Magic numbers sin constantes
if (distance < 4.5) { ... }  // 4.5 que es esto?

// EVITAR: Comentarios que no aportan
// Esto es un if
if (condition) { ... }

// EVITAR: Console logs en produccion
console.log("debug:", value);
```
