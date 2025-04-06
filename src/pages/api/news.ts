// pages/api/news.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category = 'general' } = req.query;

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // <-- Set this in Vercel env

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: any) {
    console.error('News API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
