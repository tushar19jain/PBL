import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = ({ onHotelsFetched }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHotels, setNearbyHotels] = useState([]);

  // 🔑 Replace this with your real key
  const API_KEY = "YOUR_FOURSQUARE_API_KEY_HERE";

  // Fetch image for a hotel
  const getPhotoUrl = async (fsq_id) => {
    try {
      const res = await axios.get(`https://api.foursquare.com/v3/places/${fsq_id}/photos`, {
        headers: {
          Authorization: API_KEY,
        },
      });

      if (res.data && res.data.length > 0) {
        const photo = res.data[0];
        return `${photo.prefix}original${photo.suffix}`;
      } else {
        return "/fallback.jpg"; // fallback
      }
    } catch (error) {
      console.error("Photo fetch error:", error);
      return "/fallback.jpg";
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        const location = [lat, lng];
        setUserLocation(location);

        try {
          const response = await axios.get("https://api.foursquare.com/v3/places/search", {
            headers: {
              Authorization: "fsq3DJaU0tLmlGDTuxhMwEWxylkxAgbDZsRvSYbVF1QRcyE=",
            },
            params: {
              ll: `${lat},${lng}`,
              query: "hotel",
              radius: 5000,
              limit: 20,
            },
          });

          const results = response.data.results;
          const hotels = await Promise.all(
            results.map(async (place) => {
              const photoUrl = await getPhotoUrl(place.fsq_id);

              return {
                id: place.fsq_id,
                name: place.name,
                address: place.location?.formatted_address || "Address not available",
                rating: (Math.random() * 2 + 3).toFixed(1),
                price: Math.floor(Math.random() * 3000 + 1000),
                photo: photoUrl,
                location: {
                  lat: place.geocodes.main.latitude,
                  lng: place.geocodes.main.longitude,
                },
              };
            })
          );

          setNearbyHotels(hotels);
          onHotelsFetched(hotels);
        } catch (error) {
          console.error("Foursquare fetch error:", error);
        }
      },
      (err) => {
        console.error("Error fetching location", err);
      }
    );
  }, [onHotelsFetched]);

  return (
    <div className="w-full h-[300px] mt-4 rounded-md overflow-hidden">
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Marker */}
          <Marker position={userLocation}>
            <Popup>You are here 📍</Popup>
          </Marker>

          {/* Hotel Markers */}
          {nearbyHotels.map((hotel) => (
            <Marker
              key={hotel.id}
              position={[hotel.location.lat, hotel.location.lng]}
            >
              <Popup>
                <strong>{hotel.name}</strong><br />
                {hotel.address}<br />
                ⭐ {hotel.rating} | ₹{hotel.price}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
