"use client";
 
import NotificationCenter from "@/components/NotificationCenter";
import CryptoSection from "@/components/CryptoSection";
import WeatherSection from "@/components/WeatherSection";
import NewsSection from "@/components/NewsSection";
 
export default function DashboardPageContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 welcome">
        Welcome to CryptoWeather Nexus Dashboard!
      </h1>
      <p>
        Track your favorite Cryptocurrencies, Weather updates, and latest News
        — All in one place.
      </p>
 
      <NotificationCenter />
      <CryptoSection />
      <WeatherSection />
      <NewsSection />
    </div>
  );
}
 
 