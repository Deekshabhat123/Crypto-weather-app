export interface CryptoCoin {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  image: string;
}

export interface CryptoState {
  data: Record<string, CryptoCoin>;   // bitcoin, ethereum, dogecoin etc.
  loading: boolean;
  error: string | null;
}
