import express from 'express'
import morgan, {StreamOptions} from 'morgan'
import Logger from './src/logger'
import { Options } from 'connect-datadog'
import routes from './src/routes'

const app = express()

// middleware: morgan
const stream: StreamOptions = { 
  write: (message) => Logger.info(message) 
}

app.use(morgan('tiny', { stream }))

// middleware: datadog

const dd_options: Options = {
  'response_code': true,
  'tags': [ 'app:my_app', 'env:dev' ]
}

app.use(require('connect-datadog')(dd_options))

// configs
const PORT = 8000

// routes
app.use(routes)

app.get('/', (req, res) => {
  Logger.info('index info at /')
  res.send('Express + TypeScript Server')
})


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})