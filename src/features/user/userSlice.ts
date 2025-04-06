import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  favoriteCities: string[];
  favoriteCryptos: string[];
}

const saveToLocalStorage = (state: UserState) => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save user preferences', err);
  }
};

const loadFromLocalStorage = (): UserState => {
  try {
    const data = localStorage.getItem('userPreferences');
    return data
      ? JSON.parse(data)
      : { favoriteCities: [], favoriteCryptos: [] };
  } catch (err) {
    console.error('Failed to load user preferences', err);
    return { favoriteCities: [], favoriteCryptos: [] };
  }
};

const initialState: UserState = loadFromLocalStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      if (state.favoriteCities.includes(action.payload)) {
        state.favoriteCities = state.favoriteCities.filter(
          (city) => city !== action.payload
        );
      } else {
        state.favoriteCities.push(action.payload);
      }
      saveToLocalStorage(state);
    },

    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      if (state.favoriteCryptos.includes(action.payload)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(
          (crypto) => crypto !== action.payload
        );
      } else {
        state.favoriteCryptos.push(action.payload);
      }
      saveToLocalStorage(state);
    },

    loadUserPreferences: (state, action: PayloadAction<UserState>) => {
      state.favoriteCities = action.payload.favoriteCities || [];
      state.favoriteCryptos = action.payload.favoriteCryptos || [];
      saveToLocalStorage(state);
    },
  },
});

export const {
  toggleFavoriteCity,
  toggleFavoriteCrypto,
  loadUserPreferences,
} = userSlice.actions;

export default userSlice.reducer;
