import express, { type Express } from 'express'
import router from './routes.js'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

export default app
