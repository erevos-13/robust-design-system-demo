import { z } from 'zod'

/**
 * @description
 * Zod schema for creating a new product. This schema validates all required product fields to ensure data consistency
 * and correctness across the application. It enforces the following constraints:
 *
 * - `name`: Must be a string with at least 3 characters.
 * - `category`: Must be a string with at least 2 characters.
 * - `price`: Must be a positive number.
 * - `stock`: Must be a non-negative integer.
 * - `rating`: Must be a number between 0 and 5, inclusive.
 * - `imageUrl`: Optional. If provided, must be a valid URL or an empty string.
 *
 * @see ProductCreateSchema
 */
export const ProductCreateSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	category: z.string().min(2, 'Category is required'),
	price: z.number().positive('Price must be positive'),
	stock: z.number().int().nonnegative('Stock must be non-negative integer'),
	rating: z
		.number()
		.min(0, 'Rating cannot be negative')
		.max(5, 'Rating must be between 0 and 5'),
	imageUrl: z
		.string()
		.url('Must be a valid URL')
		//TODO display lint error
		// .refine((val) => val === '' || /^https?:\/\/.+/.test(val), {
		// 	message: 'Must be a valid URL',
		// })
		.optional()
		.or(z.literal(''))
		.transform((val) => val || ''),
})

/**
 * TypeScript type inferred from ProductCreateSchema
 *
 * This demonstrates how Zod schemas can generate TypeScript types,
 * ensuring that type definitions and validation rules stay in sync.
 */
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>
