import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  city: string;
  temperature: number | null;
  favorites: string[];   // Added favorites array
}

const initialState: WeatherState = {
  city: 'New York',
  temperature: null,
  favorites: [],        // Initialize empty favorites
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeather: (state, action: PayloadAction<{ city: string; temperature: number }>) => {
      state.city = action.payload.city;
      state.temperature = action.payload.temperature;
    },

    addFavoriteCity: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },

    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(city => city !== action.payload);
    },
  },
});

export const { updateWeather, addFavoriteCity, removeFavoriteCity } = weatherSlice.actions;
export default weatherSlice.reducer;
