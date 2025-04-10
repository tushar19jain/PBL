import { useState } from "react";
import MapView from "../components/MapView";
import HotelCard from "../components/HotelCard";
import FilterDialog from "../components/FilterDialog";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import { buildGraph, dijkstra } from "../util/graph";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [sortedHotels, setSortedHotels] = useState([]);
  const [sortType, setSortType] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userLocation = { lat: 30.3165, lng: 78.0322 };

  const sortHotels = (type) => {
    let sorted = [];

    if (type === "distance") {
      const graph = buildGraph(userLocation, hotels);
      const distances = dijkstra(graph, "user");

      sorted = [...hotels]
        .map((h) => ({ ...h, distance: distances[h.id] }))
        .sort((a, b) => a.distance - b.distance);

      setSortType("Sorted by: Distance");
    }

    if (type === "price") {
      sorted = [...hotels].sort((a, b) => a.price - b.price);
      setSortType("Sorted by: Price (Low to High)");
    }

    setSortedHotels(sorted);
    setShowDialog(false);
  };

  const filteredHotels = (sortedHotels.length ? sortedHotels : hotels).filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Category Bar */}
      <div className="flex justify-center border-b bg-white sticky top-[80px] z-40">
        <div className="w-full max-w-6xl">
          <CategoryBar onFilterClick={() => setShowDialog(true)} />
        </div>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search hotels by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Dialog */}
      {showDialog && (
        <FilterDialog onClose={() => setShowDialog(false)} onSort={sortHotels} />
      )}

      {/* Sort Label */}
      {sortType && (
        <div className="max-w-6xl mx-auto px-4 mb-2 text-sm text-gray-600 font-medium">
          {sortType}
        </div>
      )}

      {/* Hotel Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.length === 0 ? (
          <p className="text-gray-500 col-span-full">No hotels found.</p>
        ) : (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        )}
      </div>

      {/* Map */}
      <div className="relative w-full max-w-6xl mx-auto mt-10 rounded-lg overflow-hidden shadow-md border">
        <MapView onHotelsFetched={setHotels} />
        <div className="absolute top-2 left-2 bg-white text-sm text-gray-800 px-3 py-1 rounded shadow">
          📍 You are currently here
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 p-4 text-center text-sm text-gray-500">
        Developed by Tushar Jain, Rohit Singh, Vikash Kumar and Rupesh Kumar — MCA 2nd Semester
      </footer>
    </div>
  );
};

export default HomePage;
