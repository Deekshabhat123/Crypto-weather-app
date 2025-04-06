import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsdata.io/api/1',
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category) => `top-headlines?country=us&apiKey= d6b8afdfe8a547fdbd50fc2e0a0d1931`,
    }),
  }),
});

export const { 
  useGetNewsQuery,
  useLazyGetNewsQuery,
} = newsApi;

