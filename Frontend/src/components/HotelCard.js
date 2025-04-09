const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">

      <div className="w-full h-48 bg-gray-100 rounded-t overflow-hidden">
        <img
          src={hotel.photo}
          alt={hotel.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/fallback.jpg";
          }}
        />
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-bold text-gray-800">{hotel.name}</h2>
        <p className="text-sm text-gray-600">📍 {hotel.address}</p>

        {hotel.rating && (
          <p className="text-sm text-yellow-600">⭐ Rating: {hotel.rating}</p>
        )}

        {hotel.price && (
          <p className="text-sm text-green-600 font-medium">💵 ₹{hotel.price}</p>
        )}

        {hotel.distance && (
          <p className="text-sm text-blue-500">
            📏 {hotel.distance.toFixed(2)} km away
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
