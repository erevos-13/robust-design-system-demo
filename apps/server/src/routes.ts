import { Router } from 'express'
import { ProductCreateSchema } from '@demo/share-types'
import db from './db.js'
import { z } from 'zod'

const router: Router = Router()

router.get('/products', async (req, res) => {
	const products = await db.readProducts()
	res.json(products)
})

router.post('/products', async (req, res) => {
	// Validate request body using Zod schema
	const validation = ProductCreateSchema.safeParse(req.body)

	if (!validation.success) {
		return res.status(400).json({
			error: 'Validation failed',
			details: z.treeifyError(validation.error),
		})
	}

	// Use validated data (TypeScript now knows the exact shape)
	const validatedData = validation.data

	const newProduct = await db.createProduct({
		name: validatedData.name,
		price: validatedData.price,
		rating: validatedData.rating,
		stock: validatedData.stock,
		category: validatedData.category,
		imageUrl: validatedData.imageUrl || '',
	})

	if (!newProduct.success) {
		return res.status(500).json({ error: newProduct.error || 'Failed to add product' })
	}
	res.status(201).json({ data: newProduct.data })
})

export default router
