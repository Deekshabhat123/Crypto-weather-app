import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // local proxy endpoint
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category = 'business') => `news?category=${category}`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
