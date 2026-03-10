import React from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import VendorShowcaseCard from '../components/biteComponents/VendorShowcaseCard'
import { ArrowRight, Laptop } from 'lucide-react'
import StarterProducts from '../components/biteComponents/StarterProducts'
import PreLoader from '../components/biteComponents/PreLoader'

function Home() {
  return (
    <>
{/* <PreLoader/> */}
    {/* Added max-w-7xl and mx-auto to match original layout, 
        ensuring the section itself is centered on the page */}
        <div className='max-container'>
        <div className="bg-[#05a357] rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="z-10 text-white max-w-sm">
            <h2 className="text-4xl font-black tracking-tight mb-4 leading-none">UPGRADE YOUR INFRASTRUCTURE.</h2>
            <p className="font-bold opacity-90 mb-6">Zero delivery fee on all workstation orders over $1,500.</p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 hover:bg-gray-100">
              Shop Now <ArrowRight size={18} />
            </button>
          </div>
          <div className="absolute right-[-50px] top-[-20px] opacity-20 rotate-12">
             <Laptop size={300} strokeWidth={1} />
          </div>
        </div>
        <StarterProducts/>




<div className="max-w-[1280px] mx-auto w-full bg-white border border-emerald-100 my-10 lg:my-20 p-5 lg:p-7 rounded-md">
      <h2 className="font-semibold font-Poppins text-xl border-b border-b-gray-300 pb-3 text-gray-800">Popular Categories</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Category 1 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/kitchen-appliances">
              <img 
                alt="Kitchen Appliances" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/e6e530baa444f7804472a5d905288ebe2e7949bd-86x88.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Kitchen Appliances</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(2)</span> items Available</p>
          </div>
        </div>

        {/* Category 2 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/television">
              <img 
                alt="Television" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/e2530cfbacaec5045f89ae3b5b2af09aedfa3076-96x69.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Television</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(2)</span> items Available</p>
          </div>
        </div>

        {/* Category 3 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/refrigerators">
              <img 
                alt="Refrigerators" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/99fb797ab1bc968905206e5392bee9148da1949f-75x86.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Refrigerators</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(1)</span> items Available</p>
          </div>
        </div>

        {/* Category 4 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/washing-machine">
              <img 
                alt="Washing Machine" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/ead62e0d6640af63e61ef6cac089984b43d7adbd-84x81.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Washing Machine</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(2)</span> items Available</p>
          </div>
        </div>

        {/* Category 5 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/tablets">
              <img 
                alt="Tablets" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/1e95bfb91b8ed192bd9aeaa9e5e4cf2af230b070-70x72.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Tablets</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(0)</span> items Available</p>
          </div>
        </div>

        {/* Category 6 */}
        <div className="bg-gray-50 p-5 flex items-center gap-3 group cursor-pointer transition-colors hover:bg-gray-100">
          <div className="overflow-hidden border border-orange-200 group-hover:border-orange-500 transition-all w-20 h-20 p-1 bg-white">
            <a href="/category/gadget-accessories">
              <img 
                alt="Gadget Accessories" 
                src="https://cdn.sanity.io/images/oe6m9gg8/production/cca91b3d00316694d678a37e95ce3b7c654fdb66-114x117.png" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-gray-700">Gadget Accessories</p>
            <p className="text-sm text-gray-500"><span className="font-bold text-emerald-700">(14)</span> items Available</p>
          </div>
        </div>

      </div>
    </div>


    </div>
      <VendorShowcaseCard/>
    
    </>
  )
}

export default Home