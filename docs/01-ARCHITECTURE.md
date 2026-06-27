# Architecture Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Architectural Pattern](#architectural-pattern)
3. [Component Hierarchy](#component-hierarchy)
4. [Data Flow](#data-flow)
5. [State Management](#state-management)
6. [Key Components](#key-components)
7. [No-Backend Rationale](#no-backend-rationale)
8. [Design Patterns](#design-patterns)

---

## System Overview

**Our Llacta** es una aplicacion web de tour virtual 3D que permite a los usuarios explorar el patrimonio cultural del pueblo Shuar de Ecuador en un entorno 3D inmersivo.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js App Router                       │
├─────────────────────────────────────────────────────────────────┤
│  / (Landing)              │  /ethnic-group/shuar (3D Tour)     │
│  ├── Cover                │  ├── PanelView                     │
│  └── Card                 │  │   ├── CanvasEnvironment          │
│                           │  │   │   ├── MainEnvironment        │
│                           │   │   │   ├── PlayerControl         │
│                           │   │   │   └── ObjectList           │
│                           │   │   │       ├── Door             │
│                           │   │   │       └── ObjectWithBase   │
│                           │   │   └── PlayerControl           │
│                           │   │       ├── KeyboardControls     │
│                           │   │       ├── Controller (ecctrl)  │
│                           │   │       └── Player (GLTF)       │
│                           │   └── ObjectDetailView            │
│                           │       └── ObjectDetail (Canvas)    │
│                           └── InterfaceLayout                  │
│                               ├── Menu                          │
│                               ├── ViewMoreWindow               │
│                               ├── FloatingImagePanel           │
│                               ├── ReturnButton                 │
│                               └── LoadingScreen                │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 15.3.2 | Routing, Server Components |
| UI Library | React 19.0.0 | Component model |
| 3D Rendering | Three.js 0.176.0 | WebGL rendering |
| React 3D | @react-three/fiber 9.1.2 | Declarative Three.js |
| 3D Helpers | @react-three/drei 10.0.7 | Utilities, loaders |
| Physics | @react-three/rapier 2.1.0 | Physics simulation |
| Player Controller | ecctrl 1.0.92 | Character movement |
| UI Components | HeroUI 2.7.8 | Buttons, modals, cards |
| Styling | Tailwind CSS 3.4.17 | Utility-first CSS |
| Animations | Framer Motion 12.10.1 | UI animations |

---

## Architectural Pattern

### Page-Based Routing with Component Composition

El proyecto utiliza **Next.js App Router** con un patron de **composicion de componentes** organizado en modulos:

```
app/
├── page.tsx                          # Landing page (Entry point)
├── ethnic-group/
│   └── shuar/
│       └── page.tsx                 # Shuar tour page (Main experience)
└── modules/
    ├── landing/                      # Feature module: Landing
    │   └── components/
    │       └── cover/
    ├── ethnic-group/shuar/           # Feature module: Shuar
    │   ├── views/                   # View components
    │   │   ├── panel-view.tsx      # 3D panel with objects
    │   │   └── object-detail-view.tsx
    │   └── main-virtual-tour/       # Tour components
    │       └── components/
    │           ├── object-list.tsx  # Positions objects in circle
    │           ├── door.tsx         # Interactive panel doors
    │           └── cartel.tsx       # 3D text labels
    └── shared/                       # Shared across features
        ├── 3D-components/           # Three.js components
        ├── 3D-ui-components/       # UI overlays for 3D
        ├── components/             # Reusable UI
        ├── data/                   # Static data
        ├── interfaces/             # TypeScript types
        └── layouts/                # Layout wrappers
```

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `landing` | Landing page with project introduction |
| `ethnic-group/shuar` | Shuar cultural tour experience |
| `shared/3D-components` | Reusable 3D building blocks (Canvas, Player, Physics) |
| `shared/3D-ui-components` | UI overlays in 3D environment (Menu, ViewMoreWindow) |
| `shared/components` | Reusable UI components (Card) |
| `shared/data` | Static cultural data (shuar-data.ts) |
| `shared/interfaces` | TypeScript type definitions |
| `shared/layouts` | Layout wrappers (InterfaceLayout) |

---

## Component Hierarchy

### 3D Environment Hierarchy

```
CanvasEnvironment (Canvas + Physics)
├── MainEnvironment (Static scene)
│   ├── GrassFloor (Physics body)
│   ├── Trees (RigidBody + GLTF)
│   ├── Rocks (RigidBody + GLTF)
│   └── Grass instances (Gltf clones)
├── PlayerControl (Keyboard + Controller)
│   ├── KeyboardControls (Input handling)
│   ├── Controller (ecctrl - movement physics)
│   └── Player (GLTF with animations)
└── ObjectList (Dynamic objects in circle)
    ├── Door (Panel入口)
    │   ├── Cartel (3D text label)
    │   └── CustomRigidBody (Detection)
    └── ObjectWithBase (Cultural object)
        ├── Gltf (Cultural model)
        ├── Cartel (3D text label)
        └── CustomRigidBody (Detection)
```

### UI Overlay Hierarchy

```
InterfaceLayout (Main UI wrapper)
├── children (Dynamic content - PanelView or ObjectDetailView)
├── LoadingScreen (Initial loading)
├── ReturnButton (Breadcrumb navigation)
├── ViewMoreWindow (Proximity activation prompt)
├── FloatingImagePanel (Image gallery)
├── Menu (Instructions modal)
└── Credits (Logos)
```

---

## Data Flow

### Static Data Flow (Top-Down)

```
shuar-data.ts (793 lines)
    │
    ▼
Shuar Page (app/ethnic-group/shuar/page.tsx:14-88)
    │
    ├── breadcrumbList (useState) → tracks navigation history
    ├── objectDetected (useState) → current object near player
    └── currentDataView (useMemo) → derived from breadcrumbList.at(-1)
    │
    ▼
InterfaceLayout (props)
    │
    ├──► PanelView (when type === "panel" or no currentDataView)
    │       │
    │       ▼
    │   ObjectList (circular arrangement)
    │       │
    │       ├──► Door (for type === "panel")
    │       │       │
    │       │       └── CustomRigidBody (proximity detection)
    │       │
    │       └──► ObjectWithBase (for type === "object")
    │               │
    │               ├── Gltf (cultural model)
    │               └── CustomRigidBody (proximity detection)
    │
    └──► ObjectDetailView (when type === "object")
            │
            └── ObjectDetail (OrbitControls + CameraShake)
```

### User Interaction Flow

```
1. Player moves in 3D (WASD / Arrow keys / Joystick)
   │
   ▼
2. CustomRigidBody.useFrame() calculates distance to player
   │
   ▼
3. If distance <= detectionRadius (default 4):
   │
   ▼
4. onEnterArea(true) triggers ViewMoreWindow
   │
   ▼
5. User clicks "Ver" button
   │
   ▼
6. handleGoView() adds object to breadcrumbList
   │
   ▼
7. View switches:
   - PanelView (for type === "panel") → shows sub-objects in circle
   - ObjectDetailView (for type === "object") → shows 3D model with OrbitControls
```

### State Transitions

```
State: breadcrumbList = []

User approaches Door "Adornos Corporales" → ViewMoreWindow "Ver" clicked
    │
    ▼
State: breadcrumbList = [{ id: "adornos-corporales", type: "panel", ... }]

User approaches Object "Bolso de Armadillo" → ViewMoreWindow "Ver" clicked
    │
    ▼
State: breadcrumbList = [
  { id: "adornos-corporales", type: "panel", ... },
  { id: "armadillo-bolso", type: "object", ... }
]

User clicks Return button
    │
    ▼
State: breadcrumbList = [{ id: "adornos-corporales", type: "panel", ... }]
```

---

## State Management

### Local Component State (useState)

El proyecto utiliza **React useState** para estado local en componentes:

| Component | State | Purpose |
|-----------|-------|---------|
| `Shuar page` | `breadcrumbList` | Navigation history |
| `Shuar page` | `objectDetected` | Current object near player |
| `Shuar page` | `showReturnButton` | Controls back navigation visibility |
| `PanelView` | `currentAnimation` | Player animation (Idle/Walking) |
| `Menu` | `contentModalType`, `isOpen` | Modal state |
| `InterfaceLayout` | `showLoading`, `isVisible` | Loading and alert visibility |
| `FloatingImagePanel` | `selectedImage` | Image gallery selection |
| `CustomRigidBody` | `isInsideArea` | Proximity detection |

### Derived State (useMemo)

```typescript
// From app/ethnic-group/shuar/page.tsx:22-25
const currentDataView = useMemo(
  () => breadcrumbList.at(-1),
  [breadcrumbList]
);
```

### No Global State

El proyecto **no utiliza**:
- Redux
- Zustand
- Context API para estado global
- React Query / SWR

---

## Key Components

### CanvasEnvironment

**File:** `app/modules/shared/3D-components/canvas-environment.tsx`

Wrapper que crea el Canvas de Three.js con fisicas:

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

### PlayerControl

**File:** `app/modules/shared/3D-components/player-control.tsx`

Maneja el input del teclado y el controlador de personajes:

```typescript
<KeyboardControls map={keyboardMap} onChange={handleAnimationChange}>
  <Controller maxVelLimit={5}>
    <Player currentAnimation={...} scale={0.3} position={[0, -0.85, 0]} />
  </Controller>
</KeyboardControls>

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];
```

### CustomRigidBody

**File:** `app/modules/shared/3D-components/custom-rigid-body.tsx`

Proporciona fisica + deteccion de proximidad:

```typescript
useFrame(() => {
  // Calculate 2D distance (ignoring Y axis)
  const horizontalDistance = Math.sqrt(
    Math.pow(playerPos.x - doorPos.x, 2) +
    Math.pow(playerPos.z - doorPos.z, 2)
  );
  setIsInsideArea(horizontalDistance <= radius);
});
```

### ObjectList

**File:** `app/modules/ethnic-group/shuar/main-virtual-tour/components/object-list.tsx`

Posiciona objetos en un circulo alrededor del jugador:

```typescript
const radius = 10;
const angle = (i / objectsToRender.length) * Math.PI * 2 + Math.PI / 2;
const x = center.x + radius * Math.cos(angle);
const z = center.z + radius * Math.sin(angle);
```

### InterfaceLayout

**File:** `app/modules/shared/layouts/interface-layout.tsx`

Patron compound component con render props:

```typescript
<InterfaceLayout
  showReturnButton={showReturnButton}
  objectDetected={objectDetected}
  goView={handleGoView}
  returnView={handleReturnView}
  currentObject={currentDataView}
>
  {(loading) => (
    <>
      {!currentDataView && <PanelView ... />}
      {currentDataView?.type === "panel" && <PanelView ... />}
      {currentDataView?.type === "object" && <ObjectDetailView ... />}
    </>
  )}
</InterfaceLayout>
```

---

## No-Backend Rationale

El proyecto es **100% static/progressive web application**:

### Why No Backend?

1. **Contenido estatico** - Todos los datos culturales son predefinidos
2. **No autenticacion** - No hay usuarios ni sesiones
3. **No persistencia** - No se guardan datos del usuario
4. **CDN-deployable** - Optimizado para Vercel/Netlify
5. **Modelos 3D estaticos** - GLB files en `/public/objects-3D/`
6. **Datos en codigo** - `shuar-data.ts` contiene toda la informacion cultural

### Data Sources

| Source | Location | Type |
|--------|----------|------|
| Cultural objects | `shuar-data.ts` | TypeScript const |
| 3D Models | `/public/objects-3D/shuar/**/*.glb` | GLB files |
| Textures/Images | `/public/objects-3D/shuar/**/*.webp` | WebP images |
| Environment | `/public/assets-3D/*.hdr` | HDR environment maps |
| Fonts | `/public/assets-3D/*.ttf` | TrueType fonts |

---

## Design Patterns

### 1. Container/Presentational Pattern

```typescript
// Presentational: Solo rendering
function ObjectDetailView({ object }: { object: ObjectData }) {
  return (
    <ObjectDetail>
      <Gltf src={object.objectData!.srcObject} {...} />
    </ObjectDetail>
  );
}

// Container: Maneja logica
function PanelView({ objectDetected, objectsOfPanel, ... }) {
  const playerRef = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState("Idle");
  // ... handlers
}
```

### 2. Render Props Pattern

```typescript
// InterfaceLayout usa children como function
<InterfaceLayout ...>
  {(loading) => (
    <>
      {!loading && <Content />}
      {loading && <Loading />}
    </>
  )}
</InterfaceLayout>
```

### 3. Breadcrumb Navigation Pattern

```typescript
// Estado: array de ObjectDetected
const [breadcrumbList, setBreadcrumb] = useState<ObjectDetected[]>([]);

// Push on navigation
const handleGoView = (obj: ObjectDetected) => {
  setBreadcrumb([...breadcrumbList, obj]);
};

// Pop on return
const handleReturnView = () => {
  setBreadcrumb(breadcrumbList.slice(0, -1));
};

// Current view
const currentDataView = breadcrumbList.at(-1);
```

### 4. Proximity Detection Pattern

```typescript
// useFrame hook para checking continuo
useFrame(() => {
  const playerPos = playerRef.current.getWorldPosition(new Vector3());
  const objectPos = objectRef.current.getWorldPosition(new Vector3());
  
  const distance = Math.sqrt(
    Math.pow(playerPos.x - objectPos.x, 2) +
    Math.pow(playerPos.z - objectPos.z, 2)
  );
  
  setIsInsideArea(distance <= detectionRadius);
});
```

### 5. Compound Component Pattern

```typescript
// Menu con diferentes contenido segun estado
<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent>
    {() => (
      <>
        <ModalHeader>{titleCatalog[contentModalType]}</ModalHeader>
        <ModalBody>
          {contentModalType === "menu" && renderMenu()}
          {contentModalType === "indications" && renderIndications()}
          {contentModalType === "controls" && renderControls()}
        </ModalBody>
      </>
    )}
  </ModalContent>
</Modal>
```

### 6. Animation State Machine Pattern

```typescript
// Player animations: Idle, Walking
useEffect(() => {
  if (currentAnimation === "Idle") {
    actions.Idle.play();
    actions.Walking.stop();
  } else if (currentAnimation === "Walking") {
    actions.Idle.stop();
    actions.Walking.play();
  }
}, [currentAnimation]);
```

---

## Error Handling

### Current State

El proyecto tiene **manejo de errores minimo**:

- No try/catch en codigo applicacion
- No custom error boundaries
- No network error handling para assets
- HeroUI components tienen built-in validation
- Three.js/R3F tienen recuperacion de errores WebGL

### Potential Improvements

1. **Error Boundaries** para componentes 3D
2. **Fallback UI** para assets que fallen en cargar
3. **Error API route** para logging en produccion
4. **Try/catch** en useGLTF para modelos 3D

---

## Performance Considerations

### Asset Loading

- **Modelos 3D** (`*.glb`) cargados via `useGLTF` de @react-three/drei
- **Suspense** no explicitamente usado - relying on LoadingScreen
- **80 grass instances** generados via `useMemo` en `main-environment.tsx`

### Physics

- **Rapier physics** con `timeStep="vary"` (variable timestep)
- **RigidBody type="fixed"** para objetos estaticos (floor, trees, rocks)
- **Custom proximity detection** en lugar de physics overlap (mas ligero)

### Rendering

- **Shadows** habilitados en Canvas y directional lights
- **Environment map** (HDR) para lighting realista
- **CameraShake** en ObjectDetail para feedback visual

---

## Security Considerations

- **No user input** que requira sanitizacion
- **No API routes** que expongan datos
- **Redirects** a paginas externas via `target="_blank"` con `rel="noopener"`
- **Static content only** - no database attack surface
