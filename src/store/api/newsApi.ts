import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsdata.io/api/1',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('User-Agent', 'Mozilla/5.0'); // ✅ important for Vercel deployments
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category: string = 'business') =>
        `news?country=us&category=${category}&language=en&apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    }),
  }),
});

export const {
  useGetNewsQuery,
  useLazyGetNewsQuery,
} = newsApi;
