import { useEffect, useState } from "react";

export default function useEarthquakes(timeFrame) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch the data
  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${timeFrame}.geojson`
      );
      const data = await res.json();
      setEarthquakes(data.features);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch earthquake data");
    } finally {
      setLoading(false);
    }
  };

  // fetch the data when timeframe changes
  useEffect(() => {
    fetchEarthquakes();
  }, [timeFrame]);

  // fetch the data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeFrame]);

  return { earthquakes, loading, error, fetchEarthquakes };
}