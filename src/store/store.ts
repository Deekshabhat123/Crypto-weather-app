import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from '../features/user/userSlice';
import cryptoReducer from '../features/crypto/cryptoSlice';
import weatherReducer from './slices/weatherSlice';
import notificationsReducer from './slices/notificationsSlice';
import newsReducer from '../features/news/newsSlice';

import cryptoApi from './api/cryptoApi';
import { weatherApi } from './api/weatherApi';   // ✅ named import
import { newsApi } from './api/newsApi';         // ✅ named import

import { setupListeners } from '@reduxjs/toolkit/query';



export const store = configureStore({
  reducer: {
    user: userReducer,
    crypto: cryptoReducer,
    weather: weatherReducer,
    notifications: notificationsReducer,
    news: newsReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,  // <-- Add weatherApi reducer
    [newsApi.reducerPath]: newsApi.reducer,        // <-- Optional (if using RTK Query for news)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      weatherApi.middleware,  // <-- Add weatherApi middleware
      newsApi.middleware      // <-- Optional (if using RTK Query for news)
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
