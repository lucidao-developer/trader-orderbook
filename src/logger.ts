import winston from 'winston';

const isProduction = () => process.env.NODE_ENV === 'production';

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

const transports = [
  // Console transport with formatting
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    )
  })
];

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: transports,
});

export enum ServiceNamesLogLabel {
  'api-web' = 'api-web',
  'producer:block-number' = 'producer:block-number',
  'producer:fix-block-gaps-by-job' = 'producer:fix-block-gaps-by-job',
  'producer:nft-metadata-request' = 'producer:nft-metadata-request',
  'consumer:exchange-events-by-block-number' = 'consumer:exchange-events-by-block-number',
  'consumer:save-block-to-db' = 'consumer:save-block-to-db',
  'consumer:nft-metadata-request' = 'consumer:nft-metadata-request',
  'consumer:nft-opensea-collection-by-address-sync' = 'consumer:nft-opensea-collection-by-address-sync',
  'cron:sync-opensea-recent-collections' = 'cron:sync-opensea-recent-collections',
}

const getLoggerForService = (serviceName: ServiceNamesLogLabel) => {
  const childLogger = logger.child({ labels: { serviceName }, name: serviceName });
  return childLogger;
}

export { logger, getLoggerForService };
