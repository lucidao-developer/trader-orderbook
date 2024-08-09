import { BigNumber, ethers } from 'ethers'
import { addresses } from '../addresses'
import { CHAIN_IDS, JSON_RPC, WS_RPC } from '../default-config'
import IZeroEx from '../abis/IZeroEx.json'
import { getPrismaClient } from '../prisma-client'
import { getLoggerForService, ServiceNamesLogLabel } from '../logger'
// Adresse du contrat

const prisma = getPrismaClient()

const logger = getLoggerForService(ServiceNamesLogLabel['api-web'])

// Fonction générique pour mettre à jour le statut de l'ordre
async function updateOrderStatus(nonce: BigNumber, newStatus: string) {
  const nonceAsString = nonce.toString()
  try {
    const order = await prisma.orders_with_latest_status.findFirst({
      where: {
        nonce: nonceAsString,
      },
    })
    if (order) {
      console.log('Found order', order.nonce, 'with status', order.order_status)
      await prisma.orders_with_latest_status.update({
        where: { nonce: order.nonce },
        data: { order_status: newStatus },
      })
      logger.debug(`Order ${nonceAsString} updated to '${newStatus}'.`)
    } else {
      logger.error(`Order ${nonceAsString} not found.`)
    }
  } catch (error) {
    logger.error('Error updating order status:', error)
  }
}

export function startEventListeners() {
  // const provider = new ethers.providers.JsonRpcProvider(JSON_RPC[CHAIN_IDS.POLYGON_AMOY])
  const wsProvider = new ethers.providers.WebSocketProvider(WS_RPC[CHAIN_IDS.POLYGON_AMOY] as string)
  const contract = new ethers.Contract(
    addresses[CHAIN_IDS.POLYGON_AMOY]?.exchange.toString()!,
    IZeroEx.compilerOutput.abi,
    wsProvider
  )

  contract.on(
    contract.filters.ERC1155OrderFilled(),
    async (
      direction,
      maker,
      taker,
      nonce,
      erc20Token,
      erc20FillAmount,
      erc1155Token,
      erc1155TokenId,
      erc1155FillAmount,
      matcher
    ) => {
      logger.debug('ERC1155 Order Filled:', { maker, nonce })
      await updateOrderStatus(nonce, 'filled')
    }
  )

  contract.on(contract.filters.ERC1155OrderCancelled(), async (maker, nonce) => {
    logger.debug('ERC1155 Order Cancelled:', { maker, nonce })
    await updateOrderStatus(nonce, 'cancelled')
  })

  contract.on(
    contract.filters.ERC721OrderFilled(),
    async (direction, maker, taker, nonce, erc20Token, erc20TokenAmount, erc721Token, erc721TokenId, matcher) => {
      logger.debug('ERC721 Order Filled:', { maker, nonce })
      await updateOrderStatus(nonce, 'filled')
    }
  )

  contract.on(contract.filters.ERC721OrderCancelled(), async (maker, nonce) => {
    logger.debug('ERC721 Order Cancelled:', { maker, nonce })
    await updateOrderStatus(nonce, 'cancelled')
  })

  logger.debug('Event listeners started.')
}
