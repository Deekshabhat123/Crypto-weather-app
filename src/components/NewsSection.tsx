"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchNews } from "@/features/news/newsSlice";

export default function NewsSection() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading News...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="fetchNews card-container p-4 bg-white dark:bg-gray-900 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Latest News
      </h2>

      <ul className="news">
        {data.slice(0, 5).map((article, idx) => (
          <li key={idx} className="border-b pb-2 border-gray-200 dark:border-gray-700">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {article.title}
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400">{article.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
