import express from 'express'
import cluster from 'cluster'
import bodyParser from 'body-parser'
import logger from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import path from 'path'
import strategy from './src/config/passport'
import router from './src/app/routes/index'
import {} from 'dotenv/config'

global.appRoot = path.resolve(__dirname)

if (cluster.isMaster) {
  // eslint-disable-next-line global-require
  const numWorkers = require('os').cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`)

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`)
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
  const app = express()
  const port = process.env.PORT || 8181
  // eslint-disable-next-line global-require
  const cors = require('cors')
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'))
  app.use(cookieParser())
  app.use(compression())
  passport.use(strategy)
  app.use(passport.initialize())

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  app.use('/api/', router)

  app.listen(port, () => {
    // sync with db
    // db.sequelize.sync()
    console.log(`Server listening on port ${port} with pid ${process.pid}!`)
  })
}

// export default app
