import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Define the expected response structure
interface CryptoDetails {
    id: string;
    name: string;
    symbol: string;
    image: { large: string };
    market_data: {
      current_price: { usd: number };
      price_change_percentage_24h: number;
      market_cap: { usd: number };
      total_volume: { usd: number };
      circulating_supply: number;
      ath: { usd: number };
      atl: { usd: number };
    };
    sparkline_in_7d: {
      price: number[];
    };
    links: Record<string, string[]>;
    description?: { en: string };
}

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCryptoDetails: builder.query<CryptoDetails, string>({
      query: (id) => `coins/${id}?localization=false&sparkline=true`,
    }),
  }),
});

export const { useGetCryptoDetailsQuery } = cryptoApi;
export default cryptoApi;
