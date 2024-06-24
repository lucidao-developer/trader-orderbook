import { addresses } from './addresses'

export const CHAIN_IDS = {
  POLYGON_AMOY: '80002',
}

export const CHAIN_IDS_NAMES = {
  [CHAIN_IDS.POLYGON_AMOY]: 'Polygon Amoy Testnet',
}

const WS_RPC = {
  [CHAIN_IDS.POLYGON_AMOY]: process.env.RPC_WS_POLYGON_AMOY,
}

const JSON_RPC = {
  [CHAIN_IDS.POLYGON_AMOY]: process.env.RPC_POLYGON_AMOY,
}

const getZeroExContract = (chainId: string): string => {
  const addressesForChain = addresses[chainId]
  if (!addressesForChain) {
    throw new Error(`Unknown addresses for chain ${chainId} (chain not supported)`)
  }
  const zeroExContractAddress = addressesForChain.exchange
  return zeroExContractAddress
}

const getWsRpcUrlByChainId = (chainId: string) => {
  const wsRpc = WS_RPC[chainId.trim().toString()]
  if (!wsRpc) {
    throw new Error(`Unknown WS RPC URL for chain ${chainId} (chain not supported)`)
  }
  return wsRpc
}

const getJsonRpcUrlByChainId = (chainId: string) => {
  const jsonRpc = JSON_RPC[chainId.trim().toString()]
  if (!jsonRpc) {
    throw new Error(`Unknown Json RPC URL for chain ${chainId} (chain not supported)`)
  }
  return jsonRpc
}

export { getWsRpcUrlByChainId, getZeroExContract, getJsonRpcUrlByChainId, WS_RPC, JSON_RPC }
