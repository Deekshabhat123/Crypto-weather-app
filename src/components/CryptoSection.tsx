"use client";

import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCryptoData, updateCryptoPrice } from "@/features/crypto/cryptoSlice";
import { toggleFavoriteCrypto } from "@/features/user/userSlice";
import CryptoCard from "@/components/CryptoCard";
import toast from "react-hot-toast";

const cryptoSymbols = ["bitcoin", "ethereum", "dogecoin"];

export default function CryptoSection() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.crypto);
  const favoriteCryptos = useAppSelector((state) => state.user.favoriteCryptos);
  const prevPrices = useRef<Record<string, number>>({});

  useEffect(() => {
    dispatch(fetchCryptoData(cryptoSymbols));

    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin");

    ws.onmessage = (event) => {
      const liveData: Record<string, string> = JSON.parse(event.data);

      const numericData = Object.fromEntries(
        Object.entries(liveData).map(([key, value]) => [key, parseFloat(value)])
      );

      Object.entries(numericData).forEach(([coin, newPrice]) => {
        const oldPrice = prevPrices.current[coin] || newPrice;

        const priceChange = Math.abs(newPrice - oldPrice);

        if (priceChange >= 100) {
          toast.success(`${coin.toUpperCase()} moved to $${newPrice.toFixed(2)}`, {
            icon: "🚀",
          });

          console.log({
            type: "price_alert",
            coin,
            price: newPrice,
          });
        }

        prevPrices.current[coin] = newPrice;
      });

      dispatch(updateCryptoPrice(numericData));
    };

    // Simulated weather alert every 30 sec
    const weatherInterval = setInterval(() => {
      toast("Weather Alert: Heavy Rain Expected ⛈️", {
        icon: "🌧️",
      });

      console.log({
        type: "weather_alert",
        message: "Heavy Rain Expected",
      });
    }, 30000);

    return () => {
      ws.close();
      clearInterval(weatherInterval);
    };
  }, [dispatch]);

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavoriteCrypto(id));
  };

  if (loading) return <div>Loading crypto data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Crypto Prices</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoSymbols.map((coin) => {
          const coinData = data[coin];
          if (!coinData) return null;

          return (
            <div key={coin} className="card-container">
              <CryptoCard
                crypto={{
                  id: coin,
                  name: coinData.name,
                  symbol: coinData.symbol,
                  current_price: coinData.price,
                  price_change_percentage_24h: coinData.change24h,
                  market_cap: coinData.marketCap,
                  image: coinData.image,
                }}
                isFavorite={favoriteCryptos.includes(coin)}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
