export interface AddressesForChain {
  exchange: string
  wrappedNativeToken: string
}

const addresses: { [key: string]: AddressesForChain | undefined } = {
  '80002': {
    exchange: '0xc6ed17457a675cdcb38077a427ffe904728d6a45',
    wrappedNativeToken: '0x01805a841ece00cf680996bf4b4e21746c68fd4e',
  }
}

export { addresses }
