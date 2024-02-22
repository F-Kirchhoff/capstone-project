import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import type { Request, Response } from 'express'
import { connectToDB } from '../utils/db'
import api from './routes/api'
import session from 'cookie-session'

const app = express()
const port = process.env.PORT || 3001

const oneDay = 1000 * 60 * 60 * 24
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: oneDay,
  })
)

app.use('/api', api)

app.use('/storybook', express.static('dist/storybook'))

app.use(express.static('dist/app'))

app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'dist/app' })
})

const url = process.env.MONGODB_URI || ''
connectToDB(url).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
  })
})
