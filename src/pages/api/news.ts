// src/pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const category = req.query.category || 'business';

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0' // Helps avoid 426 error
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'API fetch failed', details: err.message });
  }
}
