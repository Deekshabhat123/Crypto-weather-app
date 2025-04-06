// src/features/news/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
}

interface NewsState {
  data: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?category=business&apiKey=d6b8afdfe8a547fdbd50fc2e0a0d1931`);

  const json = await res.json();
  return json.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source.name,
  }));
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
