import { Router, Request, Response, NextFunction, Express } from 'express'
import express from 'express'
import Logger from './logger'
import asyncHandler from 'express-async-handler'

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

// faking async
const myAPICall = () => new Promise((resolve, reject) => {
  let t  = Math.floor(Math.random() * 10) * 10
  setTimeout(() => {
    if (t < 60)
      resolve(`api took ${t} ms...`)
    else
      reject(`api is taking too long...`)
  }, t);
});

// using express-async-handler

routes.get('/db', asyncHandler(async (req: Request, res: Response) => {
  Logger.info(`going to call the db, v1`)
  let msg = await myAPICall()
  res.json({result: msg})
}))

routes.get('/db2', async (req: Request, res: Response, next: NextFunction) => {
  Logger.info(`going to call the db, v2`)
  myAPICall()
    .then(msg => res.json({result: msg}))
    .catch(next)
})

export default routes