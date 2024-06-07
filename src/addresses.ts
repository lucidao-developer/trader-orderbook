export interface AddressesForChain {
  exchange: string
  wrappedNativeToken: string
}

const addresses: { [key: string]: AddressesForChain | undefined } = {
  '80002': {
    exchange: '0x57F415CC50706d4862495ABEDF4b90b6E9217d62',
    wrappedNativeToken: '0x01805a841ece00cf680996bf4b4e21746c68fd4e',
  }
}

export { addresses }
