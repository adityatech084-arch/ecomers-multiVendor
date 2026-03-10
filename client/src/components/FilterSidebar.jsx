// import React from 'react'

// function FilterSidebar() {
//     const filterData = [
//   {
//     title: "Product Categories",
//     type: "category",
//     items: [
//       { id: "cat1", label: "Kitchen Appliances", value: "kitchen-appliances" },
//       { id: "cat2", label: "Television", value: "television" },
//       { id: "cat3", label: "Refrigerators", value: "refrigerators" },
//       { id: "cat4", label: "Washing Machine", value: "washing-machine" },
//       { id: "cat5", label: "Tablets", value: "tablets" },
//       { id: "cat6", label: "Gadget Accessories", value: "gadget-accessories" },
//       { id: "cat7", label: "Appliances", value: "appliances" },
//       { id: "cat8", label: "Air Conditioners", value: "air-conditioners" },
//       { id: "cat9", label: "Airbuds", value: "airbuds" },
//       { id: "cat10", label: "Cameras", value: "cameras" },
//       { id: "cat11", label: "Smartphones", value: "smartphones" },
//       { id: "cat12", label: "Mobiles", value: "mobiles" },
//       { id: "cat13", label: "Smart Watches", value: "smart-watches" },
//     ]
//   },
//   {
//     title: "Brands",
//     type: "brand",
//     items: [
//       { id: "b1", label: "Hi-Tech Limited", value: "hi-tech" },
//       { id: "b2", label: "hp Limited", value: "hp" },
//       { id: "b3", label: "The Apple Limited", value: "apple" },
//       { id: "b4", label: "A4 Tech", value: "a4-tech" },
//       { id: "b5", label: "The Hitachi Limited", value: "hitachi" },
//       { id: "b6", label: "Huawei Company", value: "huawei" },
//       { id: "b7", label: "IKEA Limited", value: "ikea" },
//       { id: "b8", label: "Sony Limited", value: "sony" },
//     ]
//   },
//   {
//     title: "Price",
//     type: "price",
//     items: [
//       { id: "p1", label: "Under $100", value: "0-100" },
//       { id: "p2", label: "$100 - $200", value: "100-200" },
//       { id: "p3", label: "$200 - $300", value: "200-300" },
//       { id: "p4", label: "$300 - $500", value: "300-500" },
//       { id: "p5", label: "Over $500", value: "500-up" },
//     ]
//   }
// ];

// function RenderSubmenu(submenu) {
//     return (
//         <div className="space-y-3">
//             {submenu.map(item => (
//                 <label key={item.id} className="flex items-center gap-3 text-[13px] text-gray-800 cursor-pointer hover:text-[#1b4d3e] transition-colors group">
//                     <input type="checkbox" className="rounded border-gray-300 text-[#1b4d3e] focus:ring-[#1b4d3e] size-4 cursor-pointer" />
//                     <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold font-Poppins">{item.label}</span>
//                 </label>
//             ))}
//         </div>
//     )
// }
//   return (
//    <aside className=" md:flex flex-col w-full md:w-64 shrink-0 border-r border-gray-400 overflow-y-auto px-6 pt-8 pb-12 scrollbar-hide">
//           <div className="flex flex-col gap-10">
//             {
//                 filterData.map((element,idx)=>{
//                     return(
//                           <div>
//               <h3 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-900">{element.title}</h3>
//              {element.items && RenderSubmenu(element.items)}

//             </div>
//                     )
//                 })
//             }
//           </div>
//         </aside>
//   )
// }

// export default FilterSidebar

import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux"
import { fetchFilteredProducts } from '../features/productSlice';
function FilterSidebar() {
  const filterData = [
    {
      title: "categories",
      items: [
        { label: "Electronics", value: "Electronics" },

        { label: "Kitchen Appliances", value: "kitchen-appliances" },
        { label: "Television", value: "television" },
        { label: "Refrigerators", value: "refrigerators" },
        { label: "Washing Machine", value: "washing-machine" },
        { label: "Tablets", value: "tablets" },
        { label: "Gadget Accessories", value: "gadget-accessories" },
        { label: "Appliances", value: "appliances" },
        { label: "Air Conditioners", value: "air-conditioners" },
        { label: "Airbuds", value: "airbuds" },
        { label: "Cameras", value: "cameras" },
        { label: "Smartphones", value: "smartphones" },
        { label: "Mobiles", value: "mobiles" },
        { label: "Smart Watches", value: "smart-watches" },
      ]
    },
    {
      title: "Brands",
      items: [
        { label: "Hi-Tech Limited", value: "hi-tech" },
        { label: "hp Limited", value: "hp" },
        { label: "The Apple Limited", value: "apple" },
        { label: "A4 Tech", value: "a4-tech" },
        { label: "The Hitachi Limited", value: "hitachi" },
        { label: "Huawei Company", value: "huawei" },
        { label: "IKEA Limited", value: "ikea" },
        { label: "Sony Limited", value: "sony" },
      ]
    },
    {
      title: "Price",
      items: [
        { label: "Under $100", value: "0-100" },
        { label: "100 - $200", value: "100-200" },
        { label: "200 - $300", value: "200-300" },
        { label: "300 - $500", value: "300-500" },
        { label: "Over $500", value: "500-up" },
      ]
    }
  ];
const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({});
  
  // CHANGE: Now passing itemValue instead of index
  // const handleSelect = (groupTitle, itemValue) => {
  //     setSelectedFilters(prev => ({
  //         ...prev,
          
  //         [groupTitle]: prev[groupTitle] === itemValue ? null : itemValue
  //       }));
  //       // console.log(selectedFilters)
    
  // };

//   const handleSelect = (groupTitle, itemValue) => {
//   setSelectedFilters(prev => ({
//     ...prev,
//     [groupTitle]: itemValue   // always set, never null
//   }));
// };

const handleSelect = (groupTitle, itemValue) => {
  setSelectedFilters(prev => {
    // 🚫 If already selected → do nothing
    if (prev[groupTitle] === itemValue) {
      return prev; // same reference → no re-render → no dispatch
    }

    // ✅ Otherwise update
    return {
      ...prev,
      [groupTitle]: itemValue
    };
  });
};


  const resetGroup = (groupTitle) => {
    setSelectedFilters(prev => ({
      ...prev,
      [groupTitle]: null

      
    }));
  };

  useEffect(() => {
    console.log("Updated Filters:", selectedFilters);
    dispatch(fetchFilteredProducts(selectedFilters))
}, [selectedFilters,dispatch]);

  function RenderSubmenu(items, groupTitle) {
    const activeValue = selectedFilters[groupTitle];

    return (
      <div className="space-y-3">
        {items.map((item, idx) => (
          <label key={idx} className="flex items-center gap-3 text-[13px] text-gray-800 cursor-pointer hover:text-[#1b4d3e] transition-colors group">
            <input
              type="checkbox"
              // CHANGE: Compare against item.value instead of index
              checked={activeValue === item.value}
              onChange={() => handleSelect(groupTitle, item.value)}
              className="rounded border-gray-300 text-[#1b4d3e] focus:ring-[#1b4d3e] size-4 cursor-pointer"
            />
            <span className={`text-sm leading-none font-semibold font-Poppins ${activeValue === item.value ? 'text-[#1b4d3e]' : ''}`}>
              {item.label}
            </span>
          </label>
        ))}
        
        {activeValue && (
          <button 
            onClick={() => resetGroup(groupTitle)}
            className="text-[11px] text-red-600 font-bold uppercase tracking-tighter mt-4 hover:underline cursor-pointer"
          >
            Reset all
          </button>
        )}
      </div>
    );
  }

  return (
    // <aside className="md:flex  flex-col w-full md:w-64 border-r border-gray-400 overflow-y-auto px-6 pt-8 pb-12 scrollbar-hide">
    <aside className='md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 scrollbar-hide border-r border-r-gray-300'>
      {/* Debug view to see actual data */}
      {/* <pre className="text-[10px] bg-gray-100 p-2 mb-4 hidden md:block">
        {JSON.stringify(selectedFilters, null, 2)}
      </pre> */}

      <div className="flex flex-col gap-10">
        {filterData.map((element) => (
          <div key={element.title} className='p-3'>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-900">
              {element.title}
            </h3>
            {element.items && RenderSubmenu(element.items, element.title)}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default FilterSidebar;