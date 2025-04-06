import React from 'react';
import { useAppDispatch } from '@/store/store';
import { toggleFavoriteCrypto } from '@/features/user/userSlice';
 
 
interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image?: string;
}
 
interface CryptoCardProps {
  crypto: Cryptocurrency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}
 
const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, isFavorite }) => {
  const dispatch = useAppDispatch();
 
  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(crypto.id));
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {crypto.image ? (
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-8 h-8 mr-3"
            />
          ) : (
            <div className="w-8 h-8 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{crypto.symbol.toUpperCase()}</span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">{crypto.name}</h3>
            <p className="text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
        </div>
 
        <button
          onClick={handleToggleFavorite}
          className="favoriteadd text-lg focus:outline-none hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : 'Add As Favorite'}
        </button>
      </div>
 
      {/* Price Details */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Price:</span>
          <span className="text-lg font-bold">${crypto.current_price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500">24h Change:</span>
          <span className={`text-lg ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500">Market Cap:</span>
          <span className="text-lg green">${(crypto.market_cap / 1_000_000_000).toFixed(2)}B</span>
        </div>
      </div>
    </div>
  );
};
 
export default CryptoCard;
 
 