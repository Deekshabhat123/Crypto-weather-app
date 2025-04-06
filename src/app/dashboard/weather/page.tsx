import WeatherSection from '@/components/WeatherSection';

export default function WeatherPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Updates</h1>
      <WeatherSection />
    </div>
  );
}
