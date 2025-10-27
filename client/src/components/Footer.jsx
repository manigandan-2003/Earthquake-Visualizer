export default function Footer() {
  return (
    <footer className="bg-gray-900/70 backdrop-blur-md text-gray-300 py-3 text-center shadow-inner border-t border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()} Manigandan Nachiappan — All rights reserved.
      </p>
    </footer>
  );
}