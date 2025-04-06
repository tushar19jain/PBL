const FiltersSidebar = ({ onSort }) => {
    return (
      <aside style={{
        padding: "20px",
        width: "220px",
        background: "#f7f7f7",
        borderRight: "1px solid #ddd",
        minHeight: "100vh",
      }}>
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Sort Hotels</h2>
  
        <button
          onClick={() => onSort("distance")}
          style={buttonStyle}
        >
          📍 Sort by Shortest Distance
        </button>
  
        <button
          onClick={() => onSort("price")}
          style={{ ...buttonStyle, marginTop: "10px" }}
        >
          💸 Sort by Price (Low to High)
        </button>
      </aside>
    );
  };
  
  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.2s ease",
  };
  
  export default FiltersSidebar;
  