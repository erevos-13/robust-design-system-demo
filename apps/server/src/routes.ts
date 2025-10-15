import { Router } from 'express'

const router: Router = Router()

router.get('/', (req, res) => {
	res.json({ data: 'Hello, World!' })
})

export default router
