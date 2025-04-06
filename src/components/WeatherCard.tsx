"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleFavoriteCity } from "@/features/user/userSlice";
 
interface WeatherCardProps {
  city: {
    name: string;
    temperature: number;
    condition: string;
    icon: string;
  };
}
 
const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const dispatch = useAppDispatch();
  const favoriteCities = useAppSelector((state) => state.user.favoriteCities);
 
 
  const isFavorite = favoriteCities.includes(city.name);
 
  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(city.name)); // only name for consistency
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{city.name}</h2>
          <p className="text-gray-500">{city.condition}</p>
        </div>
 
       
      </div>
 
      <div className="flex items-center justify-between mt-4">
        <div className="text-4xl font-bold">{city.temperature}°C</div>
        <img src={city.icon} alt={city.condition} className="w-16 h-16" />
      </div>
    </div>
  );
};
 
export default WeatherCard;
 
 