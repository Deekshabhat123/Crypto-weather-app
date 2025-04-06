import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Notification {
  id: number;
  message: string;
  type: "price_alert" | "weather_alert";
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      Object.entries(data).forEach(([coin, price]) => {
        const newNotification: Notification = {
          id: Date.now(),
          message: `${coin.toUpperCase()} Price moved to $${parseFloat(price as string).toFixed(2)}`,

          type: "price_alert",
        };

        setNotification(newNotification);
      });
    };

    const weatherInterval = setInterval(() => {
      const weatherAlert: Notification = {
        id: Date.now(),
        message: "Weather Alert: Heavy Rain Expected ⛈️",
        type: "weather_alert",
      };

      setNotification(weatherAlert);
    }, 30000);

    return () => {
      ws.close();
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <header className="bg-[#0f172a] text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 animate-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="relative grid z-10 container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          className={`hamburger md:hidden ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="line top"></span>
          <span className="line middle"></span>
          <span className="line bottom"></span>
        </button>

        <h1 className="header-title">CryptoWeather Nexus</h1>

        <div className="bell-noti">
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <FiBell size={24} />
            {notification && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-72 bg-white text-black rounded shadow-lg overflow-hidden"
              >
                <div className="p-2 font-semibold border-b">Notifications</div>
                {!notification ? (
                  <div className="p-2 text-sm text-gray-500">No Notifications</div>
                ) : (
                  <div
                    key={notification.id}
                    className={`p-2 text-sm ${
                      notification.type === "price_alert"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {notification.message}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
