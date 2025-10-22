import express, { type Express } from 'express'
import cors from 'cors'
import router from './routes.ts'
import db from './db.ts'

const app: Express = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
db.connectDB()
export default app
