import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsdata.io/api/1',
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category) => `top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
});

export const { 
  useGetNewsQuery,
  useLazyGetNewsQuery,
} = newsApi;