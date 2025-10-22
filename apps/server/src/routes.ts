import { Router } from 'express'
import { ProductCreateSchema, ProductUpdateSchema } from '@demo/share-types'
import db from './db.js'

const router: Router = Router()

router.get('/products', async (req, res) => {
	const products = await db.readProducts()
	res.json(products)
})

router.get('/products/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10)
	if (isNaN(id)) {
		return res.status(400).json({ error: 'Invalid product ID' })
	}

	const product = await db.getProductById(id)
	if (!product.success) {
		return res.status(404).json({ error: product.error || 'Product not found' })
	}
	res.json({ data: product.data })
})

router.post('/products', async (req, res) => {
	// Validate request body using Zod schema
	const validation = ProductCreateSchema.safeParse(req.body)

	if (!validation.success) {
		return res.status(400).json({
			error: 'Validation failed',
			details: validation.error.format(),
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

router.patch('/products/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10)
	if (isNaN(id)) {
		return res.status(400).json({ error: 'Invalid product ID' })
	}

	// Validate update data using Zod schema (all fields optional)
	const validation = ProductUpdateSchema.safeParse(req.body)

	if (!validation.success) {
		return res.status(400).json({
			error: 'Validation failed',
			details: validation.error.format(),
		})
	}

	const updatedProduct = await db.updateProduct(id, validation.data)
	if (!updatedProduct.success) {
		return res
			.status(500)
			.json({ error: updatedProduct.error || 'Failed to update product' })
	}
	res.json({ data: updatedProduct.data })
})

router.delete('/products/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10)
	if (isNaN(id)) {
		return res.status(400).json({ error: 'Invalid product ID' })
	}

	const deleteResult = await db.deleteProduct(id)
	if (!deleteResult.success) {
		return res
			.status(500)
			.json({ error: deleteResult.error || 'Failed to delete product' })
	}
	res.json({ message: 'Product deleted successfully' })
})

export default router
