import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="search-bar border-2 p-4 rounded-2xl flex justify-between items-center w-[800px] h-[50px] mt-[-10%] ml-[auto] mr-[auto] bg-white shadow-md">      
    <div>
        <h3 className="text-[11px]">Where</h3>
        <input className="text-[12px]" type="text" placeholder="Search destination" />
      </div>
      <div>
        <h3 className="text-[11px]">Check in</h3>
        <input className="text-[12px]" type="date" placeholder="Select date" />
      </div>
        <div>
            <h3 className="text-[11px]">Check out</h3>
            <input className="text-[12px]" type="date" placeholder="Select date" />
        </div>
        <div>
            <button className="bg-[#FF385C] text-white rounded-2xl p-2 w-[100px] h-[40px] flex justify-center items-center">
                <IoSearchSharp />
            </button>
        </div>
    </div>
  );
}
export default SearchBar;