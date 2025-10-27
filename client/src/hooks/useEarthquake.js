import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function useEarthquakes({ timeFrame, startDate, endDate, minMag }) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_USGS_API_BASE;
  const FEED_BASE = import.meta.env.VITE_USGS_FEED_BASE;

  // Fetch the data
  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);
    try {
      // --- VALIDATION: limit large date ranges ---
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = (end - start) / (1000 * 60 * 60 * 24);

        // If too many days (risk >20k results)
        if (diffDays > 50 && minMag < 4) {
          // Show SweetAlert2 popup instead of throwing error
          await Swal.fire({
            title: "Invalid Date Range",
            text: "Date range too large! Please select 50 days or less, or increase minimum magnitude.",
            icon: "warning",
            confirmButtonText: "OK",
            customClass: {
              popup: "bg-gray-900/40 backdrop-blur-md text-white rounded-lg shadow-lg",
              title: "text-white text-lg font-semibold",
              content: "text-white/80 text-sm",
              confirmButton: "bg-blue-600/80 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm",
            },
            buttonsStyling: false, // Disable default SweetAlert2 button styles
          });
          setLoading(false); // Stop loading since no data is fetched
          return; // Exit the function to prevent fetching
        }
      }

      let url;

      // If custom date range is selected, use event query API
      if (startDate && endDate) {
        url = `${API_BASE}?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${minMag || 0}`;
      } else {
        // Else fallback to predefined feeds
        url = `${FEED_BASE}/${timeFrame}.geojson`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!data.features) {
        // Show SweetAlert2 popup for no data
        await Swal.fire({
          title: "Data Error",
          text: "No data returned from server",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-gray-900/40 backdrop-blur-md text-white rounded-lg shadow-lg",
            title: "text-white text-lg font-semibold",
            content: "text-white/80 text-sm",
            confirmButton: "bg-blue-600/80 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm",
          },
          buttonsStyling: false,
        });
        setLoading(false);
        return; // Exit to prevent setting earthquakes
      }
      setEarthquakes(data.features);
    } catch (err) {
      console.error(err);
      // Show SweetAlert2 popup for fetch failure
      await Swal.fire({
        title: "Fetch Error",
        text: "Failed to fetch earthquake data",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-gray-900/40 backdrop-blur-md text-white rounded-lg shadow-lg",
          title: "text-white text-lg font-semibold",
          content: "text-white/80 text-sm",
          confirmButton: "bg-blue-600/80 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm",
        },
        buttonsStyling: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch the data when timeFrame changes
  useEffect(() => {
    fetchEarthquakes();
  }, [timeFrame, startDate, endDate, minMag]);

  // Fetch the data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [timeFrame, startDate, endDate, minMag]);

  return { earthquakes, loading, error, fetchEarthquakes };
}