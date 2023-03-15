export interface Errors {}

export interface CoinInfo {
  label: string;
  symbol: string;
  price?: string;
  percentChange?: string;
  imgSrc?: string;
}
export interface AutoCompleteDD {
  value: string;
  label: string;
}
export interface AutoCompleteResponse {
  results: AutoCompleteResult;
  errors: Record<string, string>;
}

export interface AutoCompleteResult {
  search: Search;
  qoute: Qoute;
}

export interface Qoute {
  chainId: number;
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: Source[];
  orders: Order[];
  allowanceTarget: string;
  decodedUniqueId: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: null;
}

export interface Order {
  type: number;
  source: string;
  makerToken: string;
  takerToken: string;
  makerAmount: string;
  takerAmount: string;
  fillData: FillData;
  fill: Fill;
}

export interface Fill {
  input: string;
  output: string;
  adjustedOutput: string;
  gas: number;
}

export interface FillData {
  tokenAddressPath: string[];
  router: string;
}

export interface Source {
  name: string;
  proportion: string;
}

export interface Search {
  coins: Coin[];
  exchanges: any[];
  icos: any[];
  categories: Category[];
  nfts: any[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Coin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: null;
  thumb: string;
  large: string;
}
