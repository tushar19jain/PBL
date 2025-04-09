import { useState } from "react";
import MapView from "../components/MapView";
import HotelCard from "../components/HotelCard";
import FilterDialog from "../components/FilterDialog";
import FiltersSidebar from "../components/FiltersSidebar";
import { buildGraph, dijkstra } from "../util/graph";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [sortedHotels, setSortedHotels] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const userLocation = { lat: 30.3165, lng: 78.0322 };

  const sortHotels = (type) => {
    if (type === "distance") {
      const graph = buildGraph(userLocation, hotels);
      const distances = dijkstra(graph, "user");

      const sorted = [...hotels]
        .map((h) => ({ ...h, distance: distances[h.id] }))
        .sort((a, b) => a.distance - b.distance);

      setSortedHotels(sorted);
      setShowDialog(true);
    }

    if (type === "price") {
      const sorted = [...hotels].sort((a, b) => a.price - b.price);
      setHotels(sorted);
    }
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Traveo</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {showSidebar ? "Hide Filters" : "Show Filters"}
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-500">
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm12.293 2.707a1 1 0 010 1.414L13.414 10l1.879 1.879a1 1 0 01-1.415 1.415L11 10.707a1 1 0 010-1.414l2.757-2.757a1 1 0 011.415 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>
      <div className="flex flex-wrap justify-start items-center gap-4 px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
        <button className="px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">🏨 Hotels</button>
        <button className="px-4 py-2 text-sm bg-green-100 text-green-600 rounded-full hover:bg-green-200">🛏️ Resorts</button>
        <button className="px-4 py-2 text-sm bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200">🏕️ Camps</button>
        <button className="px-4 py-2 text-sm bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200">🏠 Homestays</button>
        <button className="px-4 py-2 text-sm bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200">🎒 Hostels</button>  
      </div>

      <div className="flex">
        {showSidebar && <FiltersSidebar onSort={sortHotels} />}

        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Find Stays in Dehradun</h2>
            <input
              type="text"
              placeholder="Search hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-md w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!showDialog ? (
            filteredHotels.length === 0 ? (
              <p className="text-gray-500">Loading nearby hotels or no results found...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        🏨 Hotel
                      </span>
                    </div>
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </div>
            )
          ) : null}

          {showDialog && (
           <div className="w-full max-w-2xl mx-auto px-4">
           <FilterDialog hotels={sortedHotels} onClose={() => setShowDialog(false)} />
         </div>
          )}
        </main>
      </div>
      <div className="relative w-full max-w-6xl mx-auto mt-6 rounded-lg overflow-hidden shadow-md border">
        <MapView onHotelsFetched={setHotels} />
        <div className="absolute top-2 left-2 bg-white text-sm text-gray-800 px-3 py-1 rounded shadow">
          📍 You are currently here
        </div>
      </div>
      <footer className="bg-white border-t mt-8 p-4 text-center text-sm text-gray-500">
        Developed by Tushar Jain, Rohit Singh, Vikash Kumar and Rupesh Kumar — MCA 2nd Semester
      </footer>
    </div>
  );
};

export default HomePage;
