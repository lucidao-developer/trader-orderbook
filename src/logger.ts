import winston from 'winston'

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'

const transports: winston.transport[] = [
  // stdout default
  new winston.transports.Console(),
]

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
})

export enum ServiceNamesLogLabel {
  'api-web' = 'api-web'
}

const getLoggerForService = (serviceName: ServiceNamesLogLabel) => {
  const childLogger = logger.child({ labels: { serviceName }, name: serviceName })
  return childLogger
}

export { logger, getLoggerForService }
