# AGENTS.md - Single Source of Truth

## Project Overview

**Our Llacta** es una aplicacion web interactiva de tour virtual 3D cultural Ecuadoriano, enfocada en preservar y mostrar el patrimonio del pueblo Shuar. Los usuarios pueden explorar virtualmente articulos culturales, artefactos y tradiciones en un entorno 3D inmersivo.

**Live URL:** https://our-llacta.bojuan.dev/

---

## Documentation Navigation Map

```
AGENTS.md (este archivo)
├── docs/01-ARCHITECTURE.md      → Arquitectura del sistema completo
├── docs/02-CODE_CONVENTIONS.md → Convenciones y patrones de codigo
├── docs/03-3D_SYSTEM.md         → Sistema 3D (Three.js, Rapier, ecctrl)
├── docs/04-DATA_MODELS.md      → Interfaces TypeScript y schemas de datos
└── docs/05-PROJECT_STRUCTURE.md → Estructura de carpetas y organizacion
```

---

## Quick Reference

### Available Scripts

```bash
npm run dev      # Desarrollo con Turbopack (http://localhost:3000)
npm run build    # Build para produccion
npm run start    # Iniciar servidor de produccion
npm run lint     # ESLint via Next.js
npm run postinstall  # Aplica patches (patch-package)
```

### Entry Points

| Ruta | Proposito |
|------|-----------|
| `/` | Landing page - seleccion de etnia |
| `/ethnic-group/shuar` | Tour virtual 3D del pueblo Shuar |

### Key Technologies

| Categoria | Tecnologia | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.3.2 |
| Lenguaje | TypeScript | 5 |
| UI Library | React | 19.0.0 |
| 3D Rendering | Three.js + React Three Fiber | 0.176.0 / 9.1.2 |
| Physics | @react-three/rapier | 2.1.0 |
| Player Controller | ecctrl | 1.0.92 |
| UI Components | HeroUI (@heroui/react) | 2.7.8 |
| Styling | Tailwind CSS | 3.4.17 |
| Animations | Framer Motion | 12.10.1 |

---

## Methodology: Single Source of Truth

Esta documentacion sigue el patron **Single Source of Truth** para proyectos AI-First:

1. **AGENTS.md** es el unico documento que un agente AI debe leer primero
2. Todos los documentos secundarios son **modulares e independientes**
3. Los documentos son **generados por humanos, consumidos por AI**
4. Cambios en codigo no requieren actualizar este documento (solo los docs especificos)

### How to Use This Documentation with AI

Cuando trabajes con un agente AI en este proyecto:

1. **Siempre referenciar AGENTS.md primero** - Proporciona el mapa de navegacion
2. **Consultar el documento especifico** segun la tarea:
   - Cambios en UI → CODE_CONVENTIONS.md
   - Arquitectura de componentes → ARCHITECTURE.md
   - Sistema 3D → 3D_SYSTEM.md
   - Tipos de datos → DATA_MODELS.md
   - Estructura de archivos → PROJECT_STRUCTURE.md

---

## Project Characteristics

### Current State

- **No tiene backend/API** - Aplicacion estatica/progresiva
- **No tiene tests** - Sin configuracion de jest/vitest
- **No tiene ESLint/Prettier personalizado** - Solo `next lint` por defecto
- **No tiene error boundaries** implementados
- **No tiene logging** en produccion
- **Datos 100% estaticos** - Todo definido en `shuar-data.ts`

### Why No Backend?

El proyecto es una aplicacion de contenido cultural estatico que:
- No requiere autenticacion de usuarios
- No necesita persistencia de datos del usuario
- Carga todos los datos y modelos 3D desde archivos estaticos
- Esta optimizado para ser CDN-deployable (Vercel, Netlify)

---

## Important Implementation Notes

### Dependency Patch

El proyecto usa `patch-package` para corregir la libreria `ecctrl`:

- **Patch file:** `patches/ecctrl+1.0.92.patch`
- **Problema resuelto:** TypeScript strict mode errors en geometrias y materiales
- **Aplicacion:** Automaticamente via `npm run postinstall`

### Path Aliases

El proyecto usa el alias `@/*` para imports:

```typescript
// En lugar de:
import { ObjectData } from "../../../shared/interfaces/object-props";

// Usar:
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";
```

---

## Architecture Pattern

El proyecto sigue **Page-Based Routing with Component Composition** usando Next.js App Router:

```
app/
├── page.tsx                     # Landing page
├── ethnic-group/
│   └── shuar/
│       └── page.tsx            # Shuar virtual tour
└── modules/
    ├── landing/                # Landing page components
    ├── ethnic-group/shuar/     # Shuar-specific components
    │   ├── views/              # PanelView, ObjectDetailView
    │   └── main-virtual-tour/  # ObjectList, Door, Cartel
    └── shared/                 # Cross-cutting components
        ├── 3D-components/      # Canvas, Player, Environment
        ├── 3D-ui-components/   # Menu, ViewMoreWindow
        ├── components/         # UI components (Card)
        ├── data/               # shuar-data.ts
        ├── interfaces/          # TypeScript interfaces
        └── layouts/            # InterfaceLayout
```

---

## AI Interaction Guidelines

### When Modifying This Project

1. **Leer AGENTS.md** para entender la estructura general
2. **Consultar documentos especificos** segun la tarea
3. **Seguir CODE_CONVENTIONS.md** para maintainer consistencia
4. **No introducir cambios** que contradigan la arquitectura documentada

### When Adding New Features

1. **Nuevo grupo etnico**: Extender `shuar-data.ts` y crear pagina similar
2. **Nuevo componente 3D**: Revisar `docs/03-3D_SYSTEM.md` para patrones
3. **Nuevas interfaces de datos**: Revisar `docs/04-DATA_MODELS.md` para tipos existentes
4. **Modificar estructura**: Actualizar `docs/05-PROJECT_STRUCTURE.md` si es necesario

---

## Contact

- **Developer:** bojuan.dev
- **Project URL:** https://our-llacta.bojuan.dev/
