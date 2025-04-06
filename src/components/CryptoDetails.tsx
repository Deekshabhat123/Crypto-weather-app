import React from 'react';
import { useRouter } from 'next/router';
import { useGetCryptoDetailsQuery } from '@/store/api/cryptoApi';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useAppSelector } from '@/store/store';
 
Chart.register(...registerables);
 
const CryptoDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useGetCryptoDetailsQuery(id as string);
  console.log('Crypto Details API Data:', data);
 
  const favoriteCryptos = useAppSelector((state) => state.user.favoriteCryptos);
 
 
  if (isLoading) return <div className="p-6">Loading cryptocurrency details...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading cryptocurrency details</div>;
  if (!data) return null;
 
  const chartData = {
    labels: data.sparkline_in_7d.price.map((_, index) => index),
    datasets: [
      {
        label: 'Price (7 days)',
        data: data.sparkline_in_7d.price,
        borderColor: '#3b82f6',
        tension: 0.1,
        fill: false,
      },
    ],
  };
 
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                className="w-16 h-16 mr-4"
                src={data.image.large}
                alt={data.name}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {data.name} <span className="text-gray-500">({data.symbol.toUpperCase()})</span>
                </h1>
                <div className="flex items-center mt-1">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    favoriteCryptos.includes(data.id)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {favoriteCryptos.includes(data.id) ? '❤️ Favorite' : 'Not in favorites'}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                ${data.market_data.current_price.usd.toLocaleString()}
              </p>
              <p className={`text-sm ${
                data.market_data.price_change_percentage_24h >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
                {data.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                {Math.abs(data.market_data.price_change_percentage_24h).toFixed(2)}% (24h)
              </p>
            </div>
          </div>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Chart (7 Days)</h2>
              <div className="h-80">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
 
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About {data.name}</h2>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.description?.en || 'No description available.' }}
              />
            </div>
          </div>
 
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Data</h2>
              <div className="space-y-3">
                {[
                  { label: 'Market Cap', value: `$${data.market_data.market_cap.usd.toLocaleString()}` },
                  { label: '24h Trading Volume', value: `$${data.market_data.total_volume.usd.toLocaleString()}` },
                  { label: 'Circulating Supply', value: `${data.market_data.circulating_supply.toLocaleString()} ${data.symbol.toUpperCase()}` },
                  { label: 'All Time High', value: `$${data.market_data.ath.usd.toLocaleString()}` },
                  { label: 'All Time Low', value: `$${data.market_data.atl.usd.toLocaleString()}` },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Links</h2>
              <div className="space-y-2">
                {Object.entries(data.links)
                  .filter(([, value]) => Array.isArray(value) && value.length > 0)
 
                  .map(([key, value]) => (
                    <div key={key}>
                      <h3 className="text-sm font-medium text-gray-500 capitalize mb-1">{key}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(value as string[]).slice(0, 3).map((link, i) => (
                          <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline break-all"
                          >
                            {new URL(link).hostname}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 
};
 
export default CryptoDetails;
 