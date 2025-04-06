import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoState {
  prices: Record<string, number>; // e.g., { BTC: 67000, ETH: 3400 }
}

const initialState: CryptoState = {
  prices: {},
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<Record<string, number>>) => {
      state.prices = action.payload;
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
