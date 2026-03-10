import React, { useEffect, useState } from 'react';
import { 
  MdVerified, MdFavorite, MdFavoriteBorder, MdOutlineMail, 
  MdNavigation, MdPlace, MdDevices, MdCheckroom, MdChair,
  MdArrowForward, MdStar
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVendorDetails } from '../features/vendorSlice';
import Loader from '../components/biteComponents/Loader';

const VendorStore = () => {

const {vendorId} = useParams();
const dispatch = useDispatch();
const {loading , categories,vendor } = useSelector(state=>state.vendor);
const [isFollowed, setIsFollowed] = useState(false);
useEffect(() => {
  if (!vendorId) return;
  if (!categories || categories.length === 0) {
    dispatch(fetchVendorDetails(vendorId));
  }
}, [vendorId, dispatch, categories]);


if(loading) return <Loader color='#000'size={40} width={100} height={80} bgColor={"transperent"}/>



function RenderSubCategories(menu){
  return (
    <>
  <ul className="space-y-4">
{

   menu.map((element,idx)=>{
    return (
<li key={idx} className="flex flex-col group/item">
                       <span className="text-lg font-medium group-hover/item:text-gray-500 transition-colors">{element.name}</span>
                       <div className="h-px w-0 group-hover/item:w-full bg-gray-200 transition-all duration-500 mt-1"></div>
                    </li>
    )
   })
                  
}
                </ul>
    </>
  )
}


  const storeAddress = "852 Market Street, San Francisco";

  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress)}`, '_blank');
  };

  // const categories = [
  //   { name: 'Electronics', icon: <MdDevices />, items: ['iPhone 15 Pro', 'MacBook Air M3', 'Sony WH-1000XM5'] },
  //   { name: 'Apparel', icon: <MdCheckroom />, items: ['Techwear Shell', 'Merino Hoodie', 'Urban Sneakers'] },
  //   { name: 'Interior', icon: <MdChair />, items: ['Ergo Chair', 'Minimal Desk', 'Ambient Lamp'] }
  // ];

  return (
    <div className="min-h-screen dark:bg-[#060606] font-['Inter',sans-serif] text-black dark:text-white">
      <main className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col gap-8">
        
        {/* --- UBER STYLE HEADER --- */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 dark:border-zinc-800 pb-10">
          <div className="flex gap-5 items-center">
            <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-2xl">
              <img src={vendor?.proflieImage }alt='img' className='w-full h-full'/>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{vendor?.storeName}</h1>
                <MdVerified className="text-blue-500" size={24} />
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm font-medium text-gray-500">
                <span className="flex items-center gap-1 text-black dark:text-white"><MdStar className="text-black dark:text-white"/> 4.9 (2k+)</span>
                <span>•</span>
                <span>Electronics</span>
                <span>•</span>
                <span className="text-emerald-600">Open until 9:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={() => setIsFollowed(!isFollowed)} className="flex-1 md:flex-none px-6 py-3 rounded-full bg-gray-100 dark:bg-zinc-800 font-bold text-sm transition-transform active:scale-95">
              {isFollowed ? 'Following' : 'Follow'}
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm shadow-xl transition-transform active:scale-95">
              Contact
            </button>
          </div>
        </section>

        {/* --- THE "UBER CARD" NAVIGATOR --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative h-[300px] rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 group shadow-2xl">
            {/* Mock Map Background */}
            <div 
              className="absolute inset-0 bg-gray-200 dark:bg-zinc-900 grayscale-[0.5] group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+ff0000(-122.406,37.785)/-122.406,37.785,15/800x400?access_token=YOUR_TOKEN')`, backgroundSize: 'cover' }}
            >
                {/* Fallback pattern if no API key */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Floating Navigation UI */}
            <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-black p-5 rounded-xl flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-0.5 h-6 bg-gray-200"></div>
                  <MdPlace className="text-black dark:text-white" size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Destination</p>
                  <p className="text-sm font-bold truncate max-w-[180px] md:max-w-xs">{storeAddress}</p>
                </div>
              </div>
              <button 
                onClick={handleNavigate}
                className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full hover:scale-110 transition-transform shadow-lg"
              >
                <MdNavigation size={24} className="rotate-45" />
              </button>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Store Pickup</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Ready in as little as 1 hour. Park in the designated 'Lumina' spots for curbside delivery.</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between text-sm font-bold">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-600">Free</span>
                </div>
            </div>
          </div>
        </section>

        {/* --- UBER-EATS STYLE CATEGORY LIST --- */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-8">Store Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {categories.map((cat, i) => (
  <div key={i} className="group cursor-pointer">
    <div className="flex items-center justify-between mb-6 border-b-2 border-black dark:border-white pb-2">
       <div className="flex items-center gap-3">
         <span className="text-xl">{cat.icon}</span>
         <h3 className="font-black uppercase text-sm tracking-tighter">{cat.name}</h3>
       </div>
       <MdArrowForward className="group-hover:translate-x-2 transition-transform" />
    </div>

    {cat.subcategories && RenderSubCategories(cat.subcategories)}

  </div>
))} 
</div>
        </section>

      </main>
    </div>
  );
};

export default VendorStore;