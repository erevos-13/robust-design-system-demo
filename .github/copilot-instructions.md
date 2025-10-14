# GitHub Copilot Instructions for Robust Design System Demo

## Project Overview
This is a **pnpm monorepo** project focused on building a robust design system with shared TypeScript types across multiple packages. The project demonstrates best practices for type sharing and component development in a monorepo structure.

## Project Structure
```
robust-design-system-demo/
├── packages/
│   ├── shared-types/          # Core TypeScript types and interfaces
│   ├── design-tokens/         # Design tokens and theme definitions
│   ├── ui-components/         # Reusable UI components
│   └── documentation/         # Storybook or documentation site
├── apps/
│   ├── web-app/              # Example web application
│   └── mobile-app/           # Example mobile application (optional)
├── tools/
│   └── build-tools/          # Custom build scripts and tools
└── pnpm-workspace.yaml       # Workspace configuration
```

## Development Guidelines

### Package Management
- **Use pnpm exclusively** for package management
- Install dependencies at the workspace root when possible
- Use workspace protocol (`workspace:*`) for internal package dependencies
- Always run `pnpm install` from the root directory

### TypeScript & Type Sharing
- All shared types should be defined in `packages/shared-types`
- Export types using barrel exports (`index.ts` files)
- Use consistent naming conventions:
  - Interfaces: `PascalCase` with `I` prefix (e.g., `IButtonProps`)
  - Types: `PascalCase` (e.g., `ButtonVariant`)
  - Enums: `PascalCase` (e.g., `ButtonSize`)
- Always export types explicitly for better tree-shaking

### Component Development
- Components should accept props that extend shared type interfaces
- Use generic types where appropriate for reusability
- Implement proper prop forwarding using `React.forwardRef`
- Include comprehensive TypeScript documentation with JSDoc comments

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- Types: `camelCase.types.ts` (e.g., `button.types.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `THEME_CONSTANTS.ts`)

### Code Organization
- Group related types in dedicated files within `shared-types`
- Use index files for clean imports
- Implement proper dependency injection patterns
- Follow the single responsibility principle

### Testing Strategy
- Write unit tests for all shared types and utilities
- Use integration tests for component interactions
- Implement visual regression tests for UI components
- Maintain test coverage above 80%

### Build & Deployment
- Use TypeScript project references for efficient builds
- Implement incremental builds with pnpm
- Generate type declaration files for all packages
- Use consistent build scripts across packages

## Common Commands

### Initial Setup
```bash
pnpm install
pnpm build
```

### Development
```bash
pnpm dev                    # Start all development servers
pnpm dev --filter web-app   # Start specific package
pnpm build --filter shared-types  # Build specific package
```

### Type Checking
```bash
pnpm type-check            # Check types across all packages
pnpm type-check:watch      # Watch mode for type checking
```

### Testing
```bash
pnpm test                  # Run all tests
pnpm test:coverage         # Run tests with coverage
pnpm test --filter ui-components  # Test specific package
```

## Best Practices for AI Assistance

### When Adding New Components
1. Define TypeScript interfaces in `shared-types` first
2. Create the component with proper type annotations
3. Add comprehensive JSDoc documentation
4. Include usage examples in comments
5. Export through appropriate barrel files

### When Modifying Types
1. Consider backward compatibility
2. Update all consuming packages
3. Run type checking across the workspace
4. Update documentation and examples

### When Adding Dependencies
1. Install at workspace root if shared across packages
2. Use workspace protocol for internal dependencies
3. Update peerDependencies appropriately
4. Document new dependencies in package README

## Architecture Patterns
- **Repository Pattern**: For data access layers
- **Factory Pattern**: For component creation
- **Observer Pattern**: For state management
- **Composition over Inheritance**: For component design
- **Dependency Injection**: For testing and flexibility

## Performance Considerations
- Use React.memo for expensive components
- Implement proper code splitting at package boundaries
- Optimize bundle sizes with tree-shaking
- Use TypeScript's strict mode for better optimization

## Accessibility Guidelines
- All components must meet WCAG 2.1 AA standards
- Include proper ARIA attributes
- Support keyboard navigation
- Provide screen reader friendly content
- Test with assistive technologies

Remember: This is a demo project showcasing robust design system practices. Focus on type safety, reusability, and maintainability in all implementations.