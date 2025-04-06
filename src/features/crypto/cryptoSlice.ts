import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoCoin } from '@/types';

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchData',
  async (cryptoSymbols: string[]) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoSymbols.join(',')}`
    );
    
    const data = await response.json();
    return data.reduce((acc: Record<string, CryptoCoin>, coin: any) => {
      acc[coin.id] = {
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        image: coin.image,
      };
      return acc;
    }, {});
    
  }
);

const initialState: CryptoState = {
  data: {},
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<Record<string, number>>) => {
      Object.keys(action.payload).forEach((coin) => {
        if (state.data[coin]) {
          state.data[coin].price = action.payload[coin];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch crypto data';
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
