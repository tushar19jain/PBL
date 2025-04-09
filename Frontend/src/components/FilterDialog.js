import HotelCard from "./HotelCard";

const FilterDialog = ({ hotels, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        width: "90%",
        maxHeight: "90vh",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        overflowY: "auto",
        position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          ✖
        </button>
        <h2>Sorted by Shortest Distance</h2>
        <div className="max-w-md w-full mx-auto  mb-20">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
        </div>
      </div>
  
    </div>
  );
};

export default FilterDialog;
