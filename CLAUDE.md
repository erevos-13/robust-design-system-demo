# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm monorepo demonstrating robust design system practices with shared TypeScript types across packages. It showcases a full-stack TypeScript application with React 19+, Express backend, and centralized type management.

**Key Architecture Principle:** All shared types are defined in `packages/share-types` and consumed by both frontend and backend applications, ensuring type safety across the entire stack.

## Monorepo Structure

```
packages/
  share-types/       # Shared TypeScript types and Zod schemas (consumed by all apps)
  design-tokens/     # Design tokens and theme definitions

apps/
  web/              # React 19+ frontend (Vite + TailwindCSS)
  server/           # Express backend with JSON file database
```

## Essential Commands

All commands use pnpm and should be run from the repository root:

```bash
# Development
pnpm dev                    # Start all dev servers (web on port 5173, server on port 3000)
pnpm dev --filter web       # Start only web app
pnpm dev --filter @demo/server  # Start only server

# Building
pnpm build                  # Build all packages in dependency order
pnpm build --filter @demo/share-types  # Build specific package

# Type checking & Linting
pnpm check                  # Run type checking across workspace
pnpm lint                   # Lint all packages
pnpm test                   # Run tests in all packages

# Formatting
pnpm format                 # Format TypeScript files with Prettier
```

### Working with share-types Package

When modifying shared types, always rebuild before testing:

```bash
cd packages/share-types
pnpm build
# Then test in consuming apps
```

## Critical Architecture Patterns

### 1. Type-First Development

**All shared types MUST be defined in `packages/share-types` before implementation:**

- TypeScript interfaces: `IProduct`, `IDbResult`, `IButtonProps`
- Zod schemas: `ProductCreateSchema`, `ProductUpdateSchema`
- Type exports: Use barrel exports in `index.ts`

The server validates requests using Zod schemas from `@demo/share-types`, ensuring runtime validation matches compile-time types.

### 2. React 19+ Ref Handling

**IMPORTANT:** This project uses React 19+ where `ref` is passed as a regular prop:

```typescript
// ✅ React 19+ (used in this project)
export const Button = ({ title, onClick, ref }: IButtonProps) => {
  return <button ref={ref}>{title}</button>
}

// ❌ DEPRECATED: Don't use React.forwardRef in React 19+
```

### 3. Workspace Dependencies

Internal packages use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@demo/share-types": "workspace:*",
    "@demo/theme-tokens": "workspace:*"
  }
}
```

### 4. Database Architecture

The server uses a JSON file-based database (`JsonDatabase` class in `apps/server/src/db.ts`):
- Data persists in `apps/server/data/products.json`
- Initialized from `apps/server/src/data/products.json` on first run
- All operations return `IDbResult<T>` for consistent error handling
- Full CRUD operations: create, read, update, delete products

### 5. API Validation Pattern

Server routes validate all incoming data using Zod schemas:

```typescript
// Route validates request body with Zod
const validation = ProductCreateSchema.safeParse(req.body)
if (!validation.success) {
  return res.status(400).json({
    error: 'Validation failed',
    details: validation.error.format()
  })
}
```

## TypeScript Configuration

- Root `tsconfig.json`: Sets workspace-wide compiler options
- Package-level configs: Each package has `tsconfig.json` and `tsconfig.build.json`
- Module system: Uses `NodeNext` module resolution for ESM compatibility
- Strict mode enabled across all packages

## Component Development Standards

### Naming Conventions

- **Interfaces**: `PascalCase` with `I` prefix → `IProduct`, `IButtonProps`
- **Types**: `PascalCase` → `ButtonVariant`, `ProductCreateInput`
- **Components**: `PascalCase` → `Button.tsx`, `Product.tsx`
- **Hooks**: `camelCase` with `use` prefix → `useFetch.tsx`

### Component Props Pattern

```typescript
// Define interface in packages/share-types
export interface IButtonProps {
  title: string
  onClick: () => void
  ref?: React.Ref<HTMLButtonElement>  // Include ref if DOM access needed
}

// Use Readonly wrapper in components
type ReadonlyButtonProps = Readonly<IButtonProps>

// Component accepts ref as regular prop (React 19+)
export const Button = ({ title, onClick, ref }: ReadonlyButtonProps) => {
  return <button ref={ref} onClick={onClick}>{title}</button>
}
```

### List Keys

Always use unique IDs as keys, never array indices:

```typescript
// ✅ CORRECT
{products.map((product) => <Product key={product.id} {...product} />)}

// ❌ WRONG
{products.map((product, index) => <Product key={index} {...product} />)}
```

## Package Management Rules

**ALWAYS use pnpm** (never npm or yarn):

```bash
# Install shared dependency at root
pnpm add <package> -w

# Install in specific package
pnpm add <package> --filter @demo/web

# Install internal workspace package
pnpm add @demo/share-types --filter @demo/server
```

## Import Patterns

```typescript
// Shared types (used by both frontend and backend)
import type { IProduct, IDbResult } from '@demo/share-types'
import { ProductCreateSchema } from '@demo/share-types'

// Design tokens
import type { ITheme, ThemeMode } from '@demo/theme-tokens'
```

## Testing & Type Checking Workflow

Before committing changes:

1. **Type check**: `pnpm check` (runs TypeScript across all packages)
2. **Lint**: `pnpm lint`
3. **Build**: `pnpm build` (verifies all packages compile)
4. **Format**: `pnpm format`

## Common Development Scenarios

### Adding a New Shared Type

1. Create/update type in `packages/share-types/src/`
2. Export through `packages/share-types/src/index.ts`
3. Build: `cd packages/share-types && pnpm build`
4. Verify exports in `dist/index.d.ts`
5. Use in apps with `import type { ... } from '@demo/share-types'`

### Adding a New API Endpoint

1. Define Zod schema in `packages/share-types/src/product.schema.ts`
2. Build share-types package
3. Add route in `apps/server/src/routes.ts`
4. Validate request body with schema: `schema.safeParse(req.body)`
5. Update frontend to consume new endpoint

### Adding a New React Component

1. Define props interface in `packages/share-types/src/ui-component.types.ts`
2. Include `ref?: React.Ref<HTMLElement>` if DOM access needed
3. Export through barrel file
4. Build share-types
5. Create component using the interface
6. Add JSDoc documentation with examples

## Port Configuration

- **Web app**: http://localhost:5173 (Vite dev server)
- **API server**: http://localhost:3000 (Express)

## Key Files to Reference

- `.cursor/rules/react.mdc` - Comprehensive development rules and patterns (366 lines of detailed guidelines)
- `packages/share-types/src/product.schema.ts` - Example of Zod schemas with TypeScript type inference
- `apps/server/src/db.ts` - Database implementation with consistent error handling
- `apps/server/src/routes.ts` - API validation pattern using Zod schemas
