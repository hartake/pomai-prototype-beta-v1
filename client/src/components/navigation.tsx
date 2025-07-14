import { Link, useLocation } from "wouter";
import { Clock, History } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" || path === "/timer") {
      return location === "/" || location === "/timer";
    }
    return location === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          <Link href="/timer">
            <button
              className={`py-4 px-6 text-lg font-medium border-b-2 transition-colors duration-200 ${
                isActive("/timer")
                  ? "border-pomia-primary text-pomia-primary"
                  : "border-transparent text-gray-500 hover:text-[var(--pomia-text)]"
              }`}
            >
              <Clock className="w-5 h-5 mr-2 inline" />
              Timer
            </button>
          </Link>
          <Link href="/history">
            <button
              className={`py-4 px-6 text-lg font-medium border-b-2 transition-colors duration-200 ${
                isActive("/history")
                  ? "border-pomia-primary text-pomia-primary"
                  : "border-transparent text-gray-500 hover:text-[var(--pomia-text)]"
              }`}
            >
              <History className="w-5 h-5 mr-2 inline" />
              History
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
