"use client";
 
import React from "react";
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
 
import { addFavoriteCity, removeFavoriteCity } from "@/store/slices/weatherSlice";
import { useGetCurrentWeatherQuery } from "@/store/api/weatherApi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
 
const cities = ["New York", "London", "Tokyo"];
 
function CityWeather({ city }: { city: string }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.weather.favorites);
 
  const { data, error, isLoading } = useGetCurrentWeatherQuery(city);
 
  const isFavorite = favorites.includes(city);
 
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCity(city));
    } else {
      dispatch(addFavoriteCity(city));
    }
  };
 
  if (isLoading) return <p>Loading {city}...</p>;
  if (error || !data) return <p>Error loading {city}</p>;
 
  return (
    <div className="flex justify-between items-center mb-3">
      <p>
        {data.name}: {data.main.temp}°C, {data.weather[0].description}
      </p>
 
    </div>
  );
}
 
export default function WeatherSection() {
  const favorites = useAppSelector((state) => state.weather.favorites);
 
  return (
    <div className="  card-container weatherSection p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Weather</h2>
      <div className ="grid">
      {cities.map((city) => (
        <CityWeather key={city} city={city} />
      ))}
  </div>
     
    </div>
  );
}
 
 