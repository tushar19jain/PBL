const FilterDrawer = ({ isOpen, onClose }) => {
    return (
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
  
          {/* Example filters */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <input
              type="number"
              placeholder="Enter max price"
              className="w-full border p-2 rounded text-sm"
            />
          </div>
  
          {/* Add more filters here */}
  
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
          >
            Apply
          </button>
        </div>
      </div>
    );
  };
  
  export default FilterDrawer;
  