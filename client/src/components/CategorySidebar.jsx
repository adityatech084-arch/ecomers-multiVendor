// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchVendorDetails } from "../features/vendorSlice";
// import Loader from "./biteComponents/Loader";

// // const categories = [
// //   "Kitchen Appliances", "Television", "Refrigerators", 
// //   "Washing Machine", "Tablets", "Gadget Accessories", 
// //   "Appliances", "Air Conditioners", "Airbuds", 
// //   "Cameras", "Smartphones", "Mobiles", "Smart Watches"
// // ];

// export default function CategorySidebar() {

//   const {vendorId} = useParams();
// const dispatch = useDispatch();
// const {loading , categories,vendor } = useSelector(state=>state.vendor);
// const [isFollowed, setIsFollowed] = useState(false);
// const [activeIndex, setActiveIndex] = useState(0);
// useEffect(() => {
//   if (!vendorId) return;
//   if (!categories || categories.length === 0) {
//     dispatch(fetchVendorDetails(vendorId));
//   }
// }, [vendorId, dispatch, categories]);


// if(loading) return <Loader color='#000'size={40} width={100} height={80} bgColor={"transperent"}/>


// console.log(categories)
// function RenderSubCategories(menu){
//   return (
//     <>
//   <ul className="space-y-1 w-full">
// {

//    menu.map((element,index)=>{
//     return (


//         <li
//           key={index}
//           onClick={() => setActiveIndex(index)}
//         className={`
//             w-full text-left px-3 py-2.5 text-sm  capitalize font-Poppins font-semibold transition-colors border-b border-b-slate-200 
      
//           `} 
//         >

//           {element.name}
//         </li>
                     
                  
//     )
//    })
                  
// }
//                 </ul>
//     </>
//   )
// }

//   return (
//     <div className="flex flex-col md:min-w-52 border border-gray-200  h-fit">
//       <ul className=" cursor-pointer">
//            {categories.map((item, index) => (


//         <>
//         <li
//           key={index}
//           onClick={() => setActiveIndex(index)}
//           // 3. Conditional logic inside template literals
//           className={`
//             w-full text-left text-white bg-pink-600 px-3 py-2 text-sm  capitalize font-Poppins font-semibold transition-colors border-b border-b-slate-200 last:border-b-0
      
//           `}
//         >
//           {item.name}


//         </li>
//           {item.subcategories && RenderSubCategories(item.subcategories)}
// </>
//       ))}
//       </ul>
//     </div>
//   );
// }






// // import { useLocation, useNavigate } from "react-router-dom";

// // const categories = [
// //   "Kitchen Appliances", "Television", "Refrigerators", 
// //   "Washing Machine", "Tablets", "Gadget Accessories", 
// //   "Appliances", "Air Conditioners", "Airbuds", 
// //   "Cameras", "Smartphones", "Mobiles", "Smart Watches"
// // ];

// // export default function CategorySidebar() {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   return (
// //     <div className="flex flex-col md:min-w-52 border border-gray-200 h-fit">
// //       {categories.map((item, index) => {
// //         // Create the slug to match your routing structure
// //         const itemSlug = item.toLowerCase().replace(/\s+/g, '-');
// //         const targetPath = `/category/${itemSlug}`;

// //         // Check if current URL matches this specific category path
// //         const isActive = location.pathname === targetPath;

// //         return (
// //           <button
// //             key={index}
// //             onClick={() => navigate(targetPath)}
// //             className={`
// //               w-full text-left px-3 py-2.5 text-sm capitalize font-Poppins font-semibold transition-colors border-b border-b-slate-200 last:border-b-0
// //               ${isActive 
// //                 ? "bg-pink-600 text-white" 
// //                 : "text-gray-700 hover:bg-red-50 hover:text-red-600"
// //               }
// //             `}
// //           >
// //             {item}
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchVendorDetails } from "../features/vendorSlice";
import Loader from "./biteComponents/Loader";
import {fetchVendorProducts} from "../features/productSlice.js"
export default function CategorySidebar() {
  const { vendorId } = useParams();
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.vendor);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentPage = searchParams.get("page") || 1;

  useEffect(() => {
    if (!vendorId) return;
    if (!categories || categories.length === 0) {
      dispatch(fetchVendorDetails(vendorId));
    }
  }, [vendorId, dispatch, categories]);

  useEffect(() => {
    // If category is empty, fetch all products
    dispatch(
      fetchVendorProducts({
        vendorId,
        category: currentCategory || undefined, // undefined = no filter
        page: currentPage,
        limit: 10,
      })
    );
  }, [vendorId, currentCategory, currentPage, dispatch]);


  if (loading)
    return (
      // <Loader
      //   color="#000"
      //   size={40}
      //   width={100}
      //   height={80}
      //   bgColor={"transparent"}
      // />

       <div className="flex flex-col md:min-w-52 border border-gray-200 h-fit cursor-pointer p-2">
      <ul className="space-y-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx} className="w-full">
            {/* Main category skeleton */}
            <div className="w-full h-7 bg-gray-200 rounded animate-pulse"></div>

            {/* Subcategory skeletons */}
            <ul className="mt-1 ml-4 space-y-1">
              {Array.from({ length: 3 }).map((__, subIdx) => (
                <li
                  key={subIdx}
                  className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"
                ></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    );

  // const handleCategoryClick = (categoryName) => {
  //   setSearchParams({ category: categoryName, page: 1 }); // reset page to 1
  //   dispatch(fetchVendorProducts(
  //     { vendorId, category:categoryName, page:currentPage, limit: 10 }
  //   ))
  // };

  const handleCategoryClick = (categoryName) => {
  // Do nothing if the clicked category is already selected
  if (categoryName === currentCategory) return;

  // Update URL search params (resets page to 1)
  setSearchParams({ category: categoryName, page: 1 });

  // Fetch products only if category changed
  dispatch(
    fetchVendorProducts({
      vendorId,
      category: categoryName,
      page: 1, // reset to page 1
      limit: 10,
    })
  );
};
  const RenderSubCategories = (subcategories) => (
    <ul className="space-y-1 w-full   border-gray-200">
      {subcategories.map((sub, idx) => {
        const subName = sub.name || sub;
        const isActive = currentCategory === subName;
        return (
          <li
            key={idx}
            onClick={() => handleCategoryClick(subName)}
            className={`w-full my-0.5 text-left px-3 py-2.5 text-sm capitalize font-Poppins font-semibold transition-colors cursor-pointer
              ${isActive ? "bg-pink-600 text-white" : "text-gray-700 hover:bg-red-50 hover:text-red-600"}
            `}
          >
            {subName}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex flex-col md:min-w-52 border border-gray-200 h-fit cursor-pointer">
      <ul>
        {categories.map((item, index) => {
          const name = item.name || item;
          const isActive = currentCategory === name;

          return (
            <li key={index} className="w-full">
              <div
                onClick={() => handleCategoryClick(name)}
                className={`w-full bg-pink-600 text-left px-3 py-2.5 text-sm capitalize font-Poppins font-semibold transition-colors
                  ${isActive ? "bg-pink-600 text-white" : "text-gray-700 hover:bg-red-50 hover:text-red-600"}
                `}
              >
                {name}
              </div>

              {/* Render subcategories if exist */}
              {item.subcategories && RenderSubCategories(item.subcategories)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}