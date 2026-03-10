import React from 'react'
import CategorySidebar from '../components/CategorySidebar'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
// import { Loader } from 'lucide-react'
import Loader from '../components/biteComponents/Loader'
import NoProductFound from '../components/biteComponents/NoProductFound'
import { useEffect } from 'react'
import { fetchVendorProducts } from '../features/productSlice'

function Categories() {
  const {vendorProducts,loadingVendorProducts} = useSelector(state=>state.product)
   const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchVendorProducts({}))
  // },[dispatch])
//   let p={
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
  return (
    <div className='w-full min-h-screen'>
      {/* 1. Changed to flex-col for mobile, flex-row for desktop (md:flex-row)
        2. Added gap-6 for consistent spacing between sidebar and content
      */}

      <div className='w-md bg-amber-500'>
       
      </div>
      <div className='max-container flex flex-col md:flex-row gap-6 '>
        
        {/* Sidebar: hidden or scrollable on mobile, sticky on desktop */}
        {/* <aside className="w-full md:w-64 lg:w-72 pt-8"> */}
          <CategorySidebar />
        {/* </aside> */}

        {/* Product Grid Area */}
        {/* <main className="flex-1 pt-8 pb-12"> */}


         {
          loadingVendorProducts ? (
            <div className='w-full h-[50vh] flex items-center justify-center'>

            <Loader size={50} color='#000'/>
            </div>
          ) : vendorProducts && vendorProducts.length > 0 ? (
            <>
                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
            {/* Using an array map is cleaner for placeholder cards */}
            {
              vendorProducts.map((element,index)=>{
                return(

                  <ProductCard product={element} key={index}/>
                )
              })
            }
       
          </div>
            
            </>
          ) : (
            <NoProductFound/>
          )
         }


     
        {/* </main> */}
        
      </div>      
    </div>
  )
}

export default Categories