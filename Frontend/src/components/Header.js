import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-rose-500">Traveo</div>

        {/* Login Button */}
        <button className="px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition">
          Login
        </button>
      </div>

      {/* Search bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between shadow-md rounded-full px-4 py-2 bg-white max-w-5xl mx-auto border">
          <div className="flex gap-6 w-full">
            {/* Destination */}
            <div className="flex flex-col text-sm text-gray-700">
              <span className="font-semibold">Where</span>
              <input
                type="text"
                placeholder="Search destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent outline-none text-gray-500 placeholder:text-sm placeholder:font-normal"
              />
            </div>

            <div className="w-px bg-gray-300"></div>

            {/* Check-in */}
            <div className="flex flex-col text-sm text-gray-700">
              <span className="font-semibold">Check in</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent outline-none text-gray-500"
              />
            </div>

            <div className="w-px bg-gray-300"></div>

            {/* Check-out */}
            <div className="flex flex-col text-sm text-gray-700">
              <span className="font-semibold">Check out</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent outline-none text-gray-500"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="ml-4 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full transition">
            <FaSearch size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
