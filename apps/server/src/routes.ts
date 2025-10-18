import { Router } from 'express'
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
	const { name, price, rating, stock, category } = req.body
	if (!name || typeof price !== 'number' || !rating || !stock || !category) {
		return res.status(400).json({ error: 'Missing or invalid product data' })
	}

	const newProduct = await db.createProduct({ name, price, rating, stock, category })
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

	const updateData = req.body
	const updatedProduct = await db.updateProduct(id, updateData)
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
