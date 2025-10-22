# Zod Validation - Presentation Cheatsheet

Quick reference for live demo during presentation.

---

## 🚀 QUICK START

### Terminal Setup

```bash
# Terminal 1 - Server
cd apps/server && pnpm dev

# Terminal 2 - Web
cd apps/web && pnpm dev

# Browser
open http://localhost:5173
```

---

## 🎬 DEMO SEQUENCE

### 1️⃣ Show Type Safety (2 min)

**File:** `packages/share-types/src/product.schema.ts`

**Show:**

```typescript
// Line 21-30: The schema
export const ProductCreateSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	price: z.number().positive('Price must be positive'),
	// ...
})

// Line 39: Type inference magic
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>
```

**Say:**

> "Single source of truth. Schema defines validation AND types. Change once, TypeScript updates everywhere."

---

### 2️⃣ Valid Product Creation (1 min)

**Action:** Click "+ Create Product" → Fill form correctly

**Data:**

- Name: `Mechanical Keyboard`
- Category: `Electronics`
- Price: `149.99`
- Stock: `25`
- Rating: `4.5`
- Image URL: `https://example.com/image.jpg`

**Say:**

> "Client validates, server validates, success. Type-safe from form to database."

---

### 3️⃣ Client-Side Validation Errors (2 min)

**Action:** Click "+ Create Product" → Enter BAD data

**Data:**

- Name: `AB` ← Too short
- Category: `E` ← Too short
- Price: `-10` ← Negative
- Stock: `5.5` ← Decimal
- Rating: `10` ← Too high
- Image URL: `not-url` ← Invalid

**Expected:** Red error messages under each field

**Say:**

> "Zod catches errors before API call. Better UX, saves bandwidth. Notice the clear, user-friendly messages."

---

### 4️⃣ Server-Side Defense (3 min)

**Action:** Open DevTools → Console → Paste code

**Code to paste:**

```javascript
fetch('http://localhost:3000/api/products', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		name: 'X', // Too short
		price: 'expensive', // Wrong type
		stock: -5, // Negative
		rating: 100, // Too high
	}),
})
	.then((r) => r.json())
	.then(console.log)
```

**Expected:** Detailed error response

**Say:**

> "Even if we bypass the client, server validates with the SAME schema. Defense in depth. Never trust the client."

---

### 5️⃣ Show Schema Sharing (1 min)

**Files to show side-by-side:**

1. `packages/share-types/src/product.schema.ts` (line 21)
2. `apps/server/src/routes.ts` (line 2, 27)
3. `apps/web/src/features/product/CreateProductForm.tsx` (line 10, 64)

**Say:**

> "Same schema imported in three places. Monorepo makes this trivial. Change validation rule once, it updates everywhere."

---

## 📋 KEY FILES

| File                                                  | Lines | What to Show       |
| ----------------------------------------------------- | ----- | ------------------ |
| `packages/share-types/src/product.schema.ts`          | 21-30 | Schema definition  |
| `packages/share-types/src/product.schema.ts`          | 39    | Type inference     |
| `apps/server/src/routes.ts`                           | 27-33 | Server validation  |
| `apps/web/src/features/product/CreateProductForm.tsx` | 64-70 | Client validation  |
| `apps/web/src/App.tsx`                                | 7-9   | React Router setup |

---

## 💡 KEY MESSAGES

### Why Zod?

1. ✅ TypeScript only checks compile time
2. ✅ Zod validates runtime (user input, APIs)
3. ✅ Generates TypeScript types from schemas
4. ✅ Clear error messages out of the box

### Why Client + Server Validation?

1. ✅ Client: Better UX (immediate feedback)
2. ✅ Server: Security (never trust client)
3. ✅ Same schema: Guaranteed consistency

### Why Monorepo?

1. ✅ Share code between apps
2. ✅ Single source of truth
3. ✅ Type-safe across boundaries
4. ✅ Easier refactoring

---

## 🎯 TALKING POINTS

### Problem Statement

> "As React apps scale, we need validation at runtime. Users send unexpected data. APIs change. Config files can be malformed. TypeScript alone can't protect us."

### Solution

> "Zod provides runtime type checking that complements TypeScript. We define schemas once, share them across frontend and backend, and get both compile-time and runtime safety."

### Design System Benefit

> "In a design system, consistency is everything. Zod schemas become our contract. Frontend knows exact backend shape. Backend enforces exact frontend expectations. Single source of truth."

---

## 🐛 TROUBLESHOOTING

### TypeScript errors

```bash
cd packages/share-types && pnpm build
```

### Server not validating

```bash
cd apps/server && pnpm build
```

### React Router not working

Check browser console, ensure `react-router-dom` installed:

```bash
cd apps/web && pnpm install
```

---

## 📊 DEMO METRICS

**Total Implementation:**

- 3 new files created
- 4 files modified
- 3 packages updated
- 2 routes added
- 100% type-safe validation

**Lines of Code:**

- Schema: ~70 lines (single source of truth)
- Server validation: ~10 lines (wraps existing endpoint)
- Client validation: ~280 lines (includes UI)

**Developer Experience:**

- Autocomplete on all validated fields
- Type errors before runtime errors
- Clear error messages for users

---

## 🎤 CLOSING STATEMENT

> "We've built a production-ready validation system that's type-safe, user-friendly, and maintainable. The schemas live in our design system package, shared across all apps. When we need to change validation rules, we change them once. TypeScript tells us everywhere that needs updating. Zod enforces it at runtime. This is how modern design systems scale safely."

---

## 📚 RESOURCES TO MENTION

- Zod: https://zod.dev
- React Hook Form + Zod: https://react-hook-form.com/get-started#SchemaValidation
- pnpm workspaces: https://pnpm.io/workspaces
- TypeScript: https://www.typescriptlang.org

---

**Good luck!** 🚀
