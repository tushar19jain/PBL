import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <div className="flex items-center justify-between shadow-md rounded-full px-4 py-2 bg-white max-w-3xl mx-auto border">
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
  );
};

export default SearchBar;
