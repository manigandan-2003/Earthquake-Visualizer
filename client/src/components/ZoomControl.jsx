import { useMap } from "react-leaflet";
import { Plus, Minus } from "lucide-react";

export default function ZoomControls() {
  const map = useMap();

  return (
    <div className="absolute bottom-5 right-5 flex flex-col gap-2 z-1000">
      <button
        onClick={() => map.zoomIn()}
        className="bg-gray-900/60 text-white backdrop-blur-lg rounded-full p-2 hover:bg-gray-800/80 transition"
      >
        <Plus size={18} />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="bg-gray-900/60 text-white backdrop-blur-lg rounded-full p-2 hover:bg-gray-800/80 transition"
      >
        <Minus size={18} />
      </button>
    </div>
  );
}