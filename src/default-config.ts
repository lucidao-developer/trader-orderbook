import { addresses } from './addresses'

export const CHAIN_IDS = {
  MAINNET: '1',
  SKALE_TESTNET: '974399131',
}

export const CHAIN_IDS_NAMES = {
  [CHAIN_IDS.MAINNET]: 'Mainnet',
  [CHAIN_IDS.SKALE_TESTNET]: 'giant-half-dual-testnet',
}

const WS_RPC = {
  // mainnet
  [CHAIN_IDS.MAINNET]: process.env.RPC_MAINNET,
  // SKALE_TESTNET
  [CHAIN_IDS.SKALE_TESTNET]: process.env.RPC_SKALE_TESTNET,
}

const JSON_RPC = {
  // mainnet
  [CHAIN_IDS.MAINNET]: process.env.RPC_MAINNET,
  // SKALE_TESTNET
  [CHAIN_IDS.SKALE_TESTNET]: process.env.RPC_SKALE_TESTNET,
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
