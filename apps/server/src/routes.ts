import { Router } from 'express'
import db from './db.js'

const router: Router = Router()

router.get('/', (req, res) => {
	res.json({ data: 'Hello, World!' })
})

router.get('/products', async (req, res) => {
	const products = await db.readProducts()
	res.json({ data: products })
})

export default router
