export interface AddressesForChain {
  exchange: string
  wrappedNativeToken: string
}

const addresses: { [key: string]: AddressesForChain | undefined } = {
  '1': {
    exchange: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    wrappedNativeToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  '974399131': {
    exchange: '0x66Ab05D7694cc5a8eECD80096819a4167699a961',
    wrappedNativeToken: '0xc778417e063141139fce010982780140aa0cd5ab',
  },
}

export { addresses }
