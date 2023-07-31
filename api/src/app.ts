import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/task.routes'
import { BaseHttpError } from './utils/errors'

import db from './models'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/tasks', taskRoutes(db))

app.use((err: BaseHttpError, req: express.Request, res: express.Response) => {
  res.status(err.statusCode || 500).send({ message: err.message })
})

export default app
