import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import type { Request, Response } from 'express'
import { connectToDB } from '../utils/db'
import api from './routes/api'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use('/api', api)

app.use('/storybook', express.static('dist/storybook'))

app.use(express.static('dist/app'))

app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'dist/app' })
})

const url = process.env.MONGODB_API_KEY || ''
connectToDB(url).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
  })
})
