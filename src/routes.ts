import { Router, Request, Response, NextFunction, Express } from 'express'
import express from 'express'
import Logger from './logger'

let routes = express.Router()

// how to forward the request
routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  Logger.info('routes info at /')
  res.append('X-Custom-Header', 'Hi from nodejs')
  next()
})

routes.get('/ping', (req, res) => {
  Logger.info('info at /ping')
  res.send('pong')
})

routes.get('/hello/:name?', (req: Request, res: Response) => {
  Logger.info('info at /hello')
  res.json({hello: req.params['name'] || 'anonymous'})
})


routes.get('/div/:x([0-9]{1,})/:y([0-9]{1,})', (req: Request, res: Response) => {
  Logger.info(`going to divide ${req.params['x']} by ${req.params['y']}`)
  const r = parseInt(req.params['x']) / parseInt(req.params['y'])
  res.json({result: r})
})

export default routes