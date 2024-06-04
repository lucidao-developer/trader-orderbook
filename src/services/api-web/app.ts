console.log('App bootstrapping...')
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import cron from 'node-cron'
import { createOrderbookRouter } from '../../api/orderbook'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { checkAndUpdateAllOrderStatuses } from '../../api/status-order-check'
import { cleanUpClosedOrders } from '../../api/clean-db'
import { startEventListeners } from '../../api/events-listener'
import rateLimit from 'express-rate-limit'

const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

const bootstrapApp = async () => {
  const isProduction = process.env.NODE_ENV === 'production'
  logger.debug('Initializing API web service express app...', { isProduction })

  // Express
  const app = express()

  app.use(helmet())
  app.enable('trust proxy')
  app.use(compression())
  app.use(express.json())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Rate Limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite each IP to 100 requests per windowMs
    standardHeaders: true, // Add headers with limit information
    legacyHeaders: false, // Don't add X-RateLimit-* headers
    keyGenerator: function (req) {
      return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    },
  });

  // Set up rate limiter
  app.use(limiter);

  // Set up routes and middlewares
  // Basic Healthchecks
  app.get('/', (_, res) => res.sendStatus(200))
  app.get('/v2', (_, res) => res.sendStatus(200))
  app.get('/healthcheck', (_, res) => res.sendStatus(200))
  app.get('/status', (_, res) => res.sendStatus(200))

  app.use('/orderbook', createOrderbookRouter())

  // Planifiez la tâche pour s'exécuter une fois par jour à minuit
  cron.schedule('0 0 * * *', async () => {
    await checkAndUpdateAllOrderStatuses().then(() => {
      console.log('Daily order status update task executed.')
    })

    await cleanUpClosedOrders().then(() => {
      console.log('Daily closed order cleanup task executed.')
    })
  })

  startEventListeners()

  // Error middlewares
  app.use((_req, _res, next) => {
    const err = new Error('Not Found') as any
    err.status = 404
    next(err)
  })

  app.use((error, _req, res, _next) => {
    res.status(error.status || 500)
    res.json({ ...error })
  })

  // Config done! Ready to go.
  logger.log('debug', 'App configured.')

  return app
}

export { bootstrapApp }
