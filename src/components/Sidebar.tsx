import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
 
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
 
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const favoriteCities = useAppSelector((state) => state.user.favoriteCities);
  const favoriteCryptos = useAppSelector((state) => state.user.favoriteCryptos);
 
  useEffect(() => {
    setHasMounted(true);
  }, []);
 
  // Auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
 
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
 
  if (!hasMounted) return null;
 
  const getCityName = (city: any): string => city?.name || city?.cityName || city || "Unknown City";
  const getCryptoName = (crypto: any): string => crypto?.symbol || crypto?.name || crypto || "Unknown Crypto";
 
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out p-4 sm:w-56`}
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-purple-400">Navigation</h2>
        <nav className="space-y-3">
          {[{ href: "/dashboard", label: "Dashboard Overview" }, { href: "/dashboard/crypto", label: "Cryptocurrencies" }, { href: "/dashboard/weather", label: "Weather" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-yellow-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
 
      <hr className="my-6 border-gray-700" />
 
      {/* Favorites Section */}
      <div className="mb-8 favorites">
        <h2 className="text-lg font-semibold mb-4 text-purple-400">Favorites</h2>
        {favoriteCities.length === 0 && favoriteCryptos.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No favorites added yet</p>
        ) : (
          <ul className="space-y-3">
            {favoriteCryptos.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-yellow-400">Cryptocurrencies</h3>
                <ul>
                  {favoriteCryptos.map((crypto, index) => (
                    <li key={`crypto-${index}`}>
                      <Link
                        href={`/dashboard/crypto/${encodeURIComponent(getCryptoName(crypto))}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center py-2 px-3 rounded hover:bg-gray-700 text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <span className="mr-2">₿</span>
                        {getCryptoName(crypto)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
           
          </ul>
        )}
      </div>
    </aside>
  );
};
 
export default Sidebar;