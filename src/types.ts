
// export type FeeStruct = {
//   recipient: string;
//   amount: BigNumberish;
//   feeData: string | Array<number>;
// };

export type FeeStructSerialized = {
  recipient: string
  amount: string
  feeData: string
}

// export type ERC1155OrderStruct = {
//   direction: BigNumberish;
//   maker: string;
//   taker: string;
//   expiry: BigNumberish;
//   nonce: BigNumberish;
//   erc20Token: string;
//   erc20TokenAmount: BigNumberish;
//   fees: FeeStruct[];
//   erc1155Token: string;
//   erc1155TokenId: BigNumberish;
//   erc1155TokenProperties: PropertyStruct[];
//   erc1155TokenAmount: BigNumberish;
// };

export type ERC1155OrderStructSerialized = {
  direction: number
  maker: string
  taker: string
  expiry: string
  nonce: string
  erc20Token: string
  erc20TokenAmount: string
  fees: FeeStructSerialized[]
  erc1155Token: string
  erc1155TokenId: string
  erc1155TokenAmount: string
}

// export type ERC721OrderStruct = {
//   direction: BigNumberish;
//   maker: string;
//   taker: string;
//   expiry: BigNumberish;
//   nonce: BigNumberish;
//   erc20Token: string;
//   erc20TokenAmount: BigNumberish;
//   fees: FeeStruct[];
//   erc721Token: string;
//   erc721TokenId: BigNumberish;
//   erc721TokenProperties: PropertyStruct[];
// };

export type ERC721OrderStructSerialized = {
  direction: number
  maker: string
  taker: string
  expiry: string
  nonce: string
  erc20Token: string
  erc20TokenAmount: string
  fees: FeeStructSerialized[]
  erc721Token: string
  erc721TokenId: string
}

export type NftOrderV4Serialized = ERC1155OrderStructSerialized | ERC721OrderStructSerialized

export interface SignedERC721OrderStructSerialized extends ERC721OrderStructSerialized {
  signature: SignatureStructSerialized
}

export interface SignedERC1155OrderStructSerialized extends ERC1155OrderStructSerialized {
  signature: SignatureStructSerialized
}

export type SignedNftOrderV4Serialized = SignedERC721OrderStructSerialized | SignedERC1155OrderStructSerialized

export type ECSignature = {
  v: number
  r: string
  s: string
}

export type SignatureStruct = {
  signatureType: number // 2 for EIP-712
  v: number
  r: string
  s: string
}

export type SignatureStructSerialized = {
  signatureType: number // 2 for EIP-712
  v: number
  r: string
  s: string
}

export interface NftOrderV4DatabaseModelZod {
  id: string
  maker: string
  taker: string
  expiry: string
  expiry_datetime: Date
  nonce: string
  erc20_token: string
  erc20_token_amount: string
  fees: Array<FeeStructSerialized>
  nft_token: string
  nft_token_id: string
  nft_token_amount: string
  system_metadata?: any //Record<any, any>
  app_metadata?: any // Record<any, any>
  chain_id: string
  verifying_contract: string
  direction: string
  signature: SignatureStruct
  nft_type: string
  date_added: Date
  date_last_updated: Date
}
