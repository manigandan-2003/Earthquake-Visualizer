# 🌍 Earthquake Visualizer

An interactive **React + Tailwind CSS** web application that visualizes **real-time global earthquake activity** using live data from the **USGS Earthquake API** on a **React Leaflet** map.

---

## 🧠 Features

- **Real-Time Data** — Fetches global earthquake data from the USGS API, auto-refreshing every 5 minutes.
- **Interactive Map** — Displays earthquakes with color and size based on magnitude.
- **Detailed Popups** — Shows location, magnitude, depth, and time with a link to official USGS info.
- **Filtering Options**:
  - Time range: Past hour, day, or week
  - Custom date range
  - Minimum magnitude
- **Responsive Sidebar** — Toggle filters panel with smooth animation.
- **Custom Zoom Controls** — Minimal zoom-in and zoom-out buttons.
- **Validation** — Keeps requests within the USGS 20,000-event API limit.
- **Error Handling** — Graceful fallback messages for loading and fetch errors.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React |
| **Styling** | Tailwind CSS |
| **Map Rendering** | React Leaflet + OpenStreetMap |
| **API** | USGS Earthquake API |
| **State Management** | React Hooks (`useState`, `useEffect`) |

---

## ⚡ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/manigandan-2003/earthquake-visualizer.git
cd earthquake-visualizer

2️⃣ Install dependencies

npm install

3️⃣ Start the development server

npm run dev

Then open http://localhost:5173/

in your browser.

🌐 For API Reference look into USGS Earthquake Api
