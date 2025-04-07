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
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&country=us&category=business`);
  const json = await res.json();

  return json.results.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.link,
    source: article.source_id,
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
