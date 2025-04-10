import { useState } from "react";
import { FaHotel, FaCampground, FaHome, FaUmbrellaBeach, FaSlidersH } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";

const categories = [
  { label: "Hotels", icon: <FaHotel /> },
  { label: "Resorts", icon: <GiIsland /> },
  { label: "Homestays", icon: <FaHome /> },
  { label: "Camps", icon: <FaCampground /> },
  { label: "Beach", icon: <FaUmbrellaBeach /> },
];

const CategoryBar = ({ onFilterClick }) => {
  const [active, setActive] = useState("Hotels");

  return (
    <div className="flex items-center gap-4 overflow-x-auto border-b py-3 px-4 bg-white">
      {categories.map((category) => (
        <button
          key={category.label}
          onClick={() => setActive(category.label)}
          className={`flex flex-col items-center justify-center min-w-[80px] text-sm ${
            active === category.label
              ? "text-black font-semibold"
              : "text-gray-500"
          }`}
        >
          <div className="text-xl mb-1">{category.icon}</div>
          <span>{category.label}</span>
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-8 bg-gray-300 mx-2" />

      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium hover:shadow transition"
      >
        <FaSlidersH />
        Filters
      </button>
    </div>
  );
};

export default CategoryBar;
