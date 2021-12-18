import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import type { Request, Response } from 'express'
import { connectToDB, getUsers } from '../utils/db'
import api from './routes/api'
import session from 'express-session'

const app = express()
const port = process.env.PORT || 3001

const oneDay = 1000 * 60 * 60 * 24
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'Shh, its a secret!',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
)

app.use('/api', api)

app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await getUsers().findOne({
    private: { email, password },
  })

  if (user) {
    const session = req.session
    session.userid = user.public.name
    console.log(user.public)

    res.send(user.public)
  } else {
    res.status(400).send('Error!')
  }
})

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
