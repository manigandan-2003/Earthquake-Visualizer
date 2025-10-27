import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import useEarthquakes from "../hooks/useEarthquake.js";
import Sidebar from "./Sidebar.jsx";
import ZoomControls from "./ZoomControl.jsx";

export default function MapView() {
  const [minMag, setMinMag] = useState(0);
  const [timeFrame, setTimeFrame] = useState("all_day");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { earthquakes, loading, error, fetchEarthquakes } = useEarthquakes(timeFrame);
  const filteredQuakes = earthquakes.filter((eq) => eq.properties.mag >= minMag);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading map...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="relative h-full w-full">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        minMag={minMag}
        setMinMag={setMinMag}
        fetchEarthquakes={fetchEarthquakes}
      />

      {/* Map */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        minZoom={2}
        maxZoom={10}
        zoomControl={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Tile Layer - Actual map in the background */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Earthquake Markers */}
        {filteredQuakes.map((eq) => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          const mag = eq.properties.mag;
          const color =
            mag >= 6 ? "red" : mag >= 4.5 ? "orange" : mag >= 2.5 ? "yellow" : "green";

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lng]}
              radius={Math.max(mag * 2, 2)}
              fillColor={color}
              color=""
              fillOpacity={0.7}
            >
              <Popup closeButton={false}>
                <div className="backdrop-blur-md bg-gray-900/40 text-white rounded-lg p-3 shadow-lg text-sm">
                  <strong>{eq.properties.place}</strong>
                  <br />
                  Magnitude: {mag}
                  <br />
                  Depth: {depth} km
                  <br />
                  Time: {new Date(eq.properties.time).toLocaleString()}
                  <br />
                  <a
                    href={eq.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View details
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Custom Zoom Buttons */}
        <ZoomControls />
      </MapContainer>
    </div>
  );
}