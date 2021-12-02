import express from 'express'
import type { Response, Request } from 'express'
const router = express.Router()

router.get('/', (_req: Request, res: Response) => {
  res.send('GET boards')
})
