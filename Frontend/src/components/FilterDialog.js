const FilterDialog = ({ onClose, onSort }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Sort Hotels
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSort("distance")}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded transition"
          >
            Sort by Distance
          </button>

          <button
            onClick={() => onSort("price")}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded transition"
          >
            Sort by Price (Low to High)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
