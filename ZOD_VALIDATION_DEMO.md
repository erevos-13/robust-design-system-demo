# Zod Validation Demo Guide

This guide demonstrates end-to-end type safety and runtime validation using Zod in the design system.

## 🎯 What Was Implemented

### 1. Shared Zod Schemas (`packages/share-types/src/product.schema.ts`)

- **ProductCreateSchema**: Runtime validation for product creation
- **ProductUpdateSchema**: Runtime validation for product updates
- **Type Inference**: TypeScript types generated from Zod schemas

### 2. Server-Side Validation (`apps/server/src/routes.ts`)

- POST `/api/products` - Validates incoming product data
- PATCH `/api/products/:id` - Validates update data
- Returns clear error messages with validation details

### 3. Client-Side Validation (`apps/web/src/features/product/CreateProductForm.tsx`)

- Real-time form validation before API submission
- Inline error display for each field
- Type-safe form handling

### 4. New Routes

- `/` - Product list with "Create Product" button
- `/create` - Product creation form with validation

---

## 🚀 Running the Demo

### Step 1: Start the Server

```bash
cd apps/server
pnpm dev
```

Server runs on `http://localhost:3000`

### Step 2: Start the Web App

```bash
cd apps/web
pnpm dev
```

Web app runs on `http://localhost:5173`

### Step 3: Open Browser

Navigate to `http://localhost:5173`

---

## 🎬 Presentation Demo Scenarios

### Scenario 1: Valid Product (Happy Path) ✅

**Demo Steps:**

1. Click "+ Create Product" button
2. Fill in the form:
   - Name: `Mechanical Keyboard`
   - Category: `Electronics`
   - Price: `149.99`
   - Stock: `25`
   - Rating: `4.5`
   - Image URL: `https://example.com/keyboard.jpg`
3. Click "Create Product"

**Expected Result:**

- ✅ Client validation passes
- ✅ Server validation passes
- ✅ Success message displayed
- ✅ Redirected to product list after 2 seconds
- ✅ New product appears in the list

**Key Points to Highlight:**

- No validation errors
- Smooth user experience
- Type safety from form to database

---

### Scenario 2: Client-Side Validation Errors ❌

**Demo Steps:**

1. Click "+ Create Product"
2. Fill in INVALID data:
   - Name: `AB` (too short - needs 3+ chars)
   - Category: `E` (too short - needs 2+ chars)
   - Price: `-10` (negative - must be positive)
   - Stock: `5.5` (decimal - must be integer)
   - Rating: `10` (too high - max is 5)
   - Image URL: `not-a-url` (invalid URL format)
3. Click "Create Product"

**Expected Result:**

- ❌ Form shows inline errors for each field:
  - "Name must be at least 3 characters"
  - "Category is required"
  - "Price must be positive"
  - "Stock must be non-negative integer"
  - "Rating must be between 0 and 5"
  - "Must be a valid URL"
- ⚠️ No API request sent (client catches it)

**Key Points to Highlight:**

- Client-side validation prevents bad requests
- Immediate user feedback (better UX)
- Zod provides clear, user-friendly error messages
- Network bandwidth saved (no unnecessary API calls)

---

### Scenario 3: Server-Side Validation (Defense in Depth) 🛡️

**Purpose:** Show that server validates even if client validation is bypassed.

**Demo Steps:**

1. Open browser DevTools (F12) → Console tab
2. Paste and run this code to bypass client validation:

```javascript
fetch('http://localhost:3000/api/products', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		name: 'X', // Too short
		category: '', // Empty
		price: 'expensive', // Wrong type
		stock: -5, // Negative
		rating: 100, // Too high
		imageUrl: 'invalid', // Invalid URL
	}),
})
	.then((r) => r.json())
	.then(console.log)
```

**Expected Result:**

```json
{
	"error": "Validation failed",
	"details": {
		"_errors": [],
		"name": { "_errors": ["Name must be at least 3 characters"] },
		"category": { "_errors": ["Category is required"] },
		"price": { "_errors": ["Expected number, received string"] },
		"stock": { "_errors": ["Stock must be non-negative integer"] },
		"rating": { "_errors": ["Rating must be between 0 and 5"] },
		"imageUrl": { "_errors": ["Must be a valid URL"] }
	}
}
```

**Key Points to Highlight:**

- Server-side validation is INDEPENDENT of client
- Defense in depth: validates even if client is malicious
- Same Zod schema used on both sides (DRY principle)
- Detailed error reporting for debugging

---

### Scenario 4: Type Safety Demo 🔒

**Show in Code Editor:**

Open `packages/share-types/src/product.schema.ts` and highlight:

```typescript
// 1. Zod schema defines validation rules
export const ProductCreateSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	price: z.number().positive('Price must be positive'),
	// ... more fields
})

// 2. TypeScript type INFERRED from Zod schema
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>

// Both compile-time AND runtime safety from single source!
```

**Then show in `apps/web/src/features/product/CreateProductForm.tsx`:**

```typescript
// Type-safe form data
const [formData, setFormData] = useState<Partial<ProductCreateInput>>({...})

// TypeScript knows exact shape of validation errors
const [errors, setErrors] = useState<ZodFormattedError<ProductCreateInput> | null>(null)

// Zod validates at runtime
const validation = ProductCreateSchema.safeParse(formData)
```

**Key Points to Highlight:**

- Single source of truth (Zod schema)
- TypeScript types derived from schema (no duplication)
- Compile-time safety (TypeScript) + Runtime safety (Zod)
- Shared across frontend and backend

---

## 🏗️ Architecture Highlights

### Schema Sharing (Monorepo Power)

```
packages/share-types/
  └─ src/
      └─ product.schema.ts     ← Single source of truth
          ↓
          ├─ Used by apps/server (API validation)
          └─ Used by apps/web (form validation)
```

### Validation Flow

```
User Input
    ↓
[Client Validation] ← ProductCreateSchema
    ↓ (if valid)
[API Request]
    ↓
[Server Validation] ← ProductCreateSchema (again!)
    ↓ (if valid)
[Database]
```

---

## 📝 Code Snippets for Slides

### Type Inference from Zod

```typescript
const schema = z.object({
	name: z.string().min(3),
	price: z.number().positive(),
})

// TypeScript type automatically generated!
type Product = z.infer<typeof schema>
// Equivalent to: { name: string; price: number }
```

### Validation Example

```typescript
// Runtime validation
const result = ProductCreateSchema.safeParse(userInput)

if (result.success) {
	// result.data is fully typed and validated!
	const product: ProductCreateInput = result.data
} else {
	// result.error contains detailed validation errors
	console.log(result.error.format())
}
```

---

## 🎓 Learning Outcomes for Audience

After this demo, attendees will understand:

1. **Type Safety**: How TypeScript and Zod work together
2. **Runtime Validation**: Catching errors at runtime, not compile time
3. **Schema Sharing**: DRY principle in monorepos
4. **Defense in Depth**: Multiple validation layers
5. **User Experience**: Immediate feedback vs server errors
6. **Developer Experience**: Type inference and autocomplete

---

## 🐛 Troubleshooting

### TypeScript errors about missing exports

**Solution:** Rebuild share-types package

```bash
cd packages/share-types
pnpm build
```

### Server validation not working

**Solution:** Check server rebuilt after adding Zod

```bash
cd apps/server
pnpm build
```

### Form not showing validation errors

**Solution:** Check browser console for errors, ensure Zod is installed

```bash
pnpm install
```

---

## 🎤 Talking Points for Presentation

### Why Zod?

- ✅ Runtime type checking (TypeScript only checks at compile time)
- ✅ Type inference (generate TypeScript types from schemas)
- ✅ Detailed error messages (user-friendly validation feedback)
- ✅ Composable schemas (reusable validation logic)
- ✅ Small bundle size (~8KB minified+gzipped)

### Design System Benefits

- ✅ Consistent validation across all apps
- ✅ Single source of truth for data models
- ✅ Type-safe APIs (frontend knows exact backend shape)
- ✅ Automatic documentation (schemas are self-documenting)
- ✅ Easier refactoring (change schema, TypeScript finds all affected code)

---

## 📚 Next Steps to Extend

Ideas to enhance the demo further:

1. **Add Zod to Theme Validation**

   - Validate theme objects at runtime
   - Ensure color values are valid hex codes

2. **Create Custom Zod Validators**

   - Custom validator for product slugs
   - Email validation for customer data

3. **Add API Response Validation**

   - Validate server responses in `useFetch` hook
   - Catch breaking API changes immediately

4. **Form Library Integration**

   - Integrate with React Hook Form + Zod resolver
   - Even better DX with automatic validation

5. **Generate OpenAPI/Swagger Docs**
   - Use Zod schemas to generate API documentation
   - Tools like `zod-to-openapi` can automate this

---

Good luck with your presentation! 🚀
