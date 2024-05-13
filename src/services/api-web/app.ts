import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { createOrderbookRouter } from '../../api/orderbook'
import { getLoggerForService, ServiceNamesLogLabel } from '../../logger'
import { createNftMetadataRequestRouter } from '../../api/nft-metadata'

const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

// Simple Express middleware for Winston logging
const winstonExpressMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

const bootstrapApp = async () => {
  const isProduction = process.env.NODE_ENV === 'production'
  logger.debug('Initializing API web service express app...', { isProduction })

  // Express
  const app = express()

  if (isProduction) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate: 1.0,
    })

    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.tracingHandler())
  }

  // Use the simple Winston middleware for logging
  app.use(winstonExpressMiddleware);

  app.use(helmet())
  app.enable('trust proxy')
  app.use(compression())
  app.use(express.json())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Set up routes and middlewares
  app.get('/', (_, res) => res.sendStatus(200))
  app.get('/v2', (_, res) => res.sendStatus(200))
  app.get('/healthcheck', (_, res) => res.sendStatus(200))
  app.get('/status', (_, res) => res.sendStatus(200))

  app.use('/orderbook', createOrderbookRouter())
  app.use('/nft/metadata', createNftMetadataRequestRouter())

  app.use(Sentry.Handlers.errorHandler())

  app.use((_req, _res, next) => {
    const err = new Error('Not Found') as any
    err.status = 404
    next(err)
  })

  app.use((error, _req, res, _next) => {
    res.status(error.status || 500)
    res.json({ ...error })
  })

  logger.log('debug', 'App configured.')

  return app
}

export { bootstrapApp }
