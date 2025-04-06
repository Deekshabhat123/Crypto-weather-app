// store/api/newsApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // <-- Use local API route
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category = 'business') => `news?category=${category}`, // --> hits /api/news
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
