export default function Header() {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md text-white p-4 text-center shadow-md border-b border-gray-700">
      <h1 className="text-2xl font-bold tracking-wide">Earthquake Visualizer</h1>
      <p className="text-sm text-gray-300">
        Real-time global earthquake activity
      </p>
    </header>
  );
}