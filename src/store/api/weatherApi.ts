import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => `weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    }),
    getWeatherForecast: builder.query({
      query: (city) => `forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    }),
  }),
});

export const { 
  useGetCurrentWeatherQuery,
  useGetWeatherForecastQuery,
  useLazyGetCurrentWeatherQuery,
} = weatherApi;
