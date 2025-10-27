import Footer from "./components/Footer";
import Header from "./components/Header";
import MapView from "./components/MapView";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <MapView />
      </main>
      <Footer />
    </div>
  );
}
