const HotelCard = ({ hotel }) => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    "https://images.unsplash.com/photo-1600047509350-8868639a7f2c?w=800",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
    "https://images.unsplash.com/photo-1549490349-e9296d62adc5?w=800",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    "https://images.unsplash.com/photo-1560448070-365b8e2f62fc?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1590490360182-c5f9b648df22?w=800",
    "https://images.unsplash.com/photo-1578684639352-89c2e5f9cafe?w=800",
    "https://images.unsplash.com/photo-1552901463-9e9b9f0f46b2?w=800",
    "https://images.unsplash.com/photo-1545156521-77bd85671d7d?w=800",
    "https://images.unsplash.com/photo-1620912189860-d5e73f3137fa?w=800",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    "https://images.unsplash.com/photo-1527725525735-27827864c91a?w=800",
    "https://images.unsplash.com/photo-1580059541155-bc88be40fdd5?w=800",
    "https://images.unsplash.com/photo-1582719478250-0e71bba11f03?w=800",
    "https://images.unsplash.com/photo-1600585153837-59c739a1bfd3?w=800",
    "https://images.unsplash.com/photo-1578898885786-8be9622a0e56?w=800",
    "https://images.unsplash.com/photo-1620216593530-ded97290ad88?w=800",
    "https://images.unsplash.com/photo-1523995462489-1f070b69790e?w=800",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    "https://images.unsplash.com/photo-1580128637393-1c1f22361f91?w=800",
    "https://images.unsplash.com/photo-1600585152907-5e4b3c92d3d2?w=800",
    "https://images.unsplash.com/photo-1620912248316-f6fa28f05034?w=800",
  ];
  
  
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="h-48 w-full bg-gray-100">
      <img
  src={
    hotel.photo && hotel.photo.startsWith("http")
      ? hotel.photo
      : fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
  }
  alt={hotel.name}
  className="w-full h-full object-cover"
  onError={(e) => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    e.target.src = fallbackImages[randomIndex];
  }}
/>

      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
          🏨 Hotel
        </span>

        <h3 className="text-md font-semibold text-gray-800">{hotel.name}</h3>
        <p className="text-sm text-gray-600 truncate">
          📍 {hotel.address || "Location not available"}
        </p>

        {hotel.rating && (
          <p className="text-sm text-yellow-600">⭐ {hotel.rating}</p>
        )}

        <p className="text-sm font-semibold text-green-600">₹ {hotel.price}</p>

        {hotel.distance && (
          <p className="text-sm text-blue-500">
            📏 {hotel.distance.toFixed(2)} km away
          </p>
        )}

        {/* Show on Map Button */}
        <a
          href={`https://www.google.com/maps?q=${hotel.location.lat},${hotel.location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm px-4 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
        >
          Show on Map
        </a>
      </div>
    </div>
  );
};

export default HotelCard;
