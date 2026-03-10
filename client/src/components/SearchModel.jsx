import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../features/productSlice';
import useDebounce from '../hooks/useDebounce';
import { AddToCart } from './ProductActions';
import { Link } from 'react-router-dom';
import Loader from "./biteComponents/Loader.jsx";
const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {searchProductsResult,loadingSearchProducts} = useSelector(state=>state.product);
const dispatch=useDispatch();
  // Mock data based on your UI
  const suggestions = [
    "43″ Class TU7000 Series Crystal UHD 4K Smart TV",
    "HP Laptop, AMD Ryzen 5 5500U Processor",
    "High Performance Cooling Fan, 4-Pin, 1500 RPM",
    "Intel 13th Gen Core i9 13900KF Raptor Lake Processor",
    "MacBook Pro M4 Max Chip 16-inch (14-core CPU, 32-core GPU)",
    "Philips NA221 4.2 Liter 1500 Watt Air Fryer",
    "iPhone 16 Pro Max 128GB"
  ];


    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);



 const debouncedSearch = useDebounce((query) => {
    if (!query.trim()) return ;
    // dispatch(searchProducts(query));
    dispatch(searchProducts({ searchTerm: query, page: 1, limit: 5 }));
    // setShowDropdown(true);
  }, 400);

    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

//   if (!isOpen) return null;

  return (
    <div className=" fixed top-0 w-full left-0 h-full    z-50 flex items-center justify-center bg-black/50 p-4"
    
          // onClick={()=>dispatch(onClose())}
    
    >
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={()=>dispatch(onClose())}
          className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header & Search Input */}
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold mb-4">Product Searchbar</h2>
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
              placeholder="Search your product here..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-emerald-700/10 text-emerald-800 rounded-r-md hover:bg-emerald-700 hover:text-white transition-all">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto mt-6 border-t border-gray-100">
          
          {/* Brand Banner */}
          <div className="bg-emerald-50 px-6 py-4 flex items-center gap-2">
            <Search size={18} className="text-gray-600" />
            <span className="text-gray-700 font-medium">
              Search and explore your products from 
              <span className="ml-2 inline-flex font-black uppercase tracking-wider text-emerald-800 cursor-pointer hover:text-emerald-500 transition-colors">
                Shopcar<span className="text-emerald-500">t</span>
              </span>
            </span>
          </div>

          {/* Result List */}
          <div className="py-4 px-3">

{
  loadingSearchProducts ? (
    <Loader size={30}color='#000'/>
  ) : searchProductsResult && searchProductsResult.length > 0    ? (
<>

   {searchProductsResult.map((item, index) => (
   <div className="bg-white overflow-hidden border-b border-b-gray-200 last:border-none cursor-pointer">
  <Link
    to={`/product/${item?._id}`}
    className="flex items-center p-1 w-full"
    onClick={dispatch(onClose)} // close search modal when clicked
  >
    <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 border border-gray-200 rounded-md overflow-hidden group">
      <img
        src={item.bannerImage}
        alt={item.name}
        loading="lazy"
        width={200}
        height={200}
        decoding="async"
        className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
      />
    </div>

    <div className="px-4 py-2 grow">
      <div className="flex justify-between items-start">
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-shop_dark_green md:text-lg">
              ₹{item.salePrice}
            </span>
            <span className="line-through text-xs font-normal text-zinc-500 md:text-lg">
              ₹{item.basePrice}
            </span>
          </div>
        </div>
      </div>

      <div className="w-60 mt-1">
        <div className="w-full h-12 flex items-center">
          <AddToCart product={item} key={index} />
        </div>
      </div>
    </div>
  </Link>
</div>
            ))}






</>
  ) : (
<div className='text-sm font-Poppins text-center font-semibold text-green-500'>No products Found!</div>
  )
  
}






         
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;