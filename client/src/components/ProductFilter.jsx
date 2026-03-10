import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductFilter = () => {
  const categories = ["Electronics", "Appliances", "Refrigerators", "Others"];
  // const activeCategory = "Gadget"; // This would typically come from state
  const [active,setActive]=useState(0);
 const { starterProduct} = useSelector(state=>state.product)
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProductsByCategory())
    // console.log(starterProduct);
  },[dispatch])

function fetchProducts(category,index){
  setActive(index)
dispatch(fetchProductsByCategory(category))
}


  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 justify-between w-full ">
      {/* Scrollable Filter Container for Mobile */}
      <div className="flex items-center overflow-x-auto pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto">
        <div className="flex items-center gap-2 md:gap-3 text-sm font-semibold whitespace-nowrap">
          {categories.map((cat,idx) => (
            <button
              key={cat}
              onClick={()=>fetchProducts(cat,idx)}
              className={`
                px-4 py-1.5 md:px-6 md:py-1.5 rounded-full border transition-all duration-300
                ${active === idx 
                  ? "bg-emerald-800 text-white border-emerald-600 shadow-md" 
                  : "bg-emerald-50/50 text-emerald-800 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Action Link */}
      <a 
        href="/shop" 
        className="text-sm font-medium border border-gray-900 px-5 py-1.5 rounded-full transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 whitespace-nowrap"
      >
        See all
      </a>
    </div>
  );
};

export default ProductFilter;