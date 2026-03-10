import React from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useSelector } from 'react-redux';
import Loader from '../components/biteComponents/Loader';
import NoProductFound from '../components/biteComponents/NoProductFound';

// const categories = ["Kitchen Appliances", "Television", "Refrigerators", "Washing Machine", "Tablets", "Gadget Accessories", "Appliances", "Smart Watches"];
// const brands = ["Hi-Tech Limited", "hp Limited", "The Apple Limited", "A4 Tech", "Sony Limited"];
// let p={
//   name: "Philips 2-in-1 Air Purifier with Humidifier Series 3000i",
//   description: `The Philips 3000i is a smart air purifier with built-in humidifier for cleaner and healthier indoor air. 
// It captures ultrafine particles, allergens, and gases, while maintaining optimal humidity levels. 
// Ideal for bedrooms and living spaces, it can be controlled via app or voice assistant.`,
//   category: "Home & Kitchen Essentials",
//   brand: "Philips",
//   sku: "PHL-AP-HH-3000",
//   basePrice: "399.00",
//   salePrice: "349.00",
//   rating: "4.7",
//   stock: "20",
//   weight: "8.5",
//   dimensions: "280 x 280 x 650 mm",
//   seoTitle: "Philips 3000i Air Purifier & Humidifier | Smart Indoor Air Solution",
//   seoKeywords: "air purifier, humidifier, smart home, Philips 3000i, clean air, allergen filter",
//   features: [
//     "2-in-1 Purifier & Humidifier: Cleans air while maintaining optimal humidity.",
//     "HEPA & Activated Carbon Filter: Captures dust, allergens, and odors.",
//     "Smart Control: App and voice assistant compatibility.",
//     "Sleep & Auto Mode: Quiet operation during nighttime and energy-efficient.",
//     "Real-Time Air Quality Feedback: PM2.5, VOC, and humidity levels displayed.",
//     "Filter Replacement Indicator: Alerts for timely maintenance."
//   ],
//   specs: [
//     { key: "Purification Area", value: "60 m²" },
//     { key: "Humidity Control", value: "30% - 70% Relative Humidity" },
//     { key: "Filter Type", value: "HEPA + Activated Carbon" },
//     { key: "Noise Level", value: "20 - 50 dB" },
//     { key: "Connectivity", value: "Wi-Fi, App, Alexa & Google Assistant" },
//     { key: "Dimensions (HxWxD)", value: "650 x 280 x 280 mm" },
//     { key: "Weight", value: "8.5 kg" }
//   ],
//   isFeatured: true,
//   isHotDeal: false
// }
const Shop = () => {
  const {products ,loading}=useSelector(state=>state.product)
  return (
    /* Use h-screen and overflow-hidden on the main wrapper to lock the viewport */
    <div className=" max-container  flex flex-col font-poppins text-slate-800 mb-10">
      
      {/* 1. Header Frame - Fixed at the top */}
      <header className="z-30  border-b border-gray-300 shrink-0">
        <div className="max-w-[1440px] mx-auto">
           <h2 className="text-xl uppercase font-semibold font-Poppins  py-4 text-gray-900">
             Get the products as your needs
           </h2>
        </div>
      </header>

      {/* 2. Main Content Area - This container fills the rest of the screen */}
      <div className="flex-1 flex  flex-col md:flex-row gap-5  overflow-hidden max-w-[1440px] mx-auto w-full">
        
        {/* 3. Sidebar Frame - It will scroll internally if items overflow */}
        {/* <aside className=" md:flex flex-col w-full md:w-64 shrink-0 border-r border-gray-400 overflow-y-auto px-6 pt-8 pb-12 scrollbar-hide">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-900">Product Categories</h3>
              <div className="space-y-3">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 text-[13px] text-gray-500 cursor-pointer hover:text-[#1b4d3e] transition-colors group">
                    <input type="checkbox" className="rounded border-gray-300 text-[#1b4d3e] focus:ring-[#1b4d3e] size-4 cursor-pointer" />
                    <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold ">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-900">Brands</h3>
              <div className="space-y-3">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 text-[13px] text-gray-500 cursor-pointer hover:text-[#1b4d3e] transition-colors group">
                    <input type="checkbox" className="rounded border-gray-300 text-[#1b4d3e] focus:ring-[#1b4d3e] size-4 cursor-pointer" />
                    <span className="group-hover:translate-x-1 font-semibold transition-transform">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside> */}
<FilterSidebar/>
        {/* 4. Product Grid Area - The ONLY part that scrolls */}
        <main className="h-[calc(100vh-160px)] overflow-y-auto pr-2 w-full scrollbar-hide">
      

          {loading ? (
  <Loader size={30} color='#000' /> // Your loader component
) : products && products.length > 0 ? (
  <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 scrollbar-hide pt-2 "> 

  {
  products.map((product, idx) => (
    <ProductCard key={product._id || idx} product={product} />
  ))
}
</div>
  </>
) : (
  <NoProductFound/>
)}
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default Shop;