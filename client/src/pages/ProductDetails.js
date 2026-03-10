import React, { useEffect, useState } from 'react';
import { 
  HiOutlineShoppingBag, HiOutlineHeart, HiStar, 
  HiOutlineTruck, HiOutlineRefresh, HiChevronDown 
} from 'react-icons/hi';
import { FiShare2, FiHelpCircle } from 'react-icons/fi';
import { MdCompareArrows } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../features/productSlice';
import Loader from '../components/biteComponents/Loader';
import ProductNotFound from '../components/biteComponents/ProductNotFound';
import {addToCart} from "../features/cartSlice.js";
import { HiMiniFire } from 'react-icons/hi2';
import { AddToCart } from '../components/ProductActions.jsx';
const ProductDetails = () => {
  const {product,loading} = useSelector(state=>state.product);
  const [activeImg, setActiveImg] = useState(0);
  const dispatch = useDispatch();
  const {id} = useParams();

useEffect(()=>{
if(!id) return;
dispatch(getProductById(id))
},[id,dispatch])


if(loading) {
  return   <div className="flex bg-gray-100 items-center justify-center h-[80vh]">
<Loader size={60} color='#000'/>
  </div> 
}
 if (!product) {
    return (
   <ProductNotFound/>
    );
  }


  // console.log(product)
// function addproduct(product){
// dispatch(addToCart(product));
// }
  

  // const thumbnails = [
  //   "https://images.unsplash.com/photo-1588423770574-91993ca07335?auto=format&fit=crop&w=300&q=80",
  //   "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
  //   "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
  //   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  // ];
 const images = [product.bannerImage, ...(product.gallery || [])];
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-poppins text-slate-900">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
        
        {/* Left: Image Gallery Section */}
       <div className="w-full md:w-1/2 space-y-3 md:space-y-4">
  {/* Main Image Container - Fixed Height aspect for stability */}
  <div className="w-full relative h-[400px] md:h-[500px] border border-gray-200 rounded-xl group overflow-hidden bg-[#f9f9f9] flex items-center justify-center">
    {
      product.isHotDeal && <a className="absolute top-3 left-3 z-10 border border-orange-100 p-1.5 rounded-full bg-white hover:border-orange-500 transition-all shadow-sm" href="/deal">
                 <HiMiniFire className="text-orange-500" size={18} />
               </a>
    }
    
    <img
      alt="productImage"
      // src="https://cdn.sanity.io/images/oe6m9gg8/production/c3bf5eaa474e9b5220b6839d6808d4a7022ecde6-500x500.webp"
      src={images[activeImg] }
      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
    />
  </div>

  {/* Thumbnails Grid - Consistent height and spacing */}
  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
    {images?.map((img, index) => (
      <button
        key={index}
        onClick={()=>setActiveImg(index)}
        className={`aspect-square border rounded-md overflow-hidden bg-[#f9f9f9] transition-all ${
          index === activeImg ? 'ring-2 ring-[#1b4d3e] border-transparent' : 'border-gray-100 hover:border-gray-300'
        }`}
      >
        <img
          alt={`Thumbnail ${index}`}
          // src={`https://cdn.sanity.io/images/oe6m9gg8/production/${img}`}
          src={img}
          className="w-full h-full object-contain p-1 mix-blend-multiply"
        />
      </button>
    ))}
  </div>
<div className="bg-white p-3 border border-gray-200">
  <h2 className="text-lg font-semibold mb-3 font-Poppins">
    Product Specifications
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
    {product?.specs?.map((spec, idx) => (
      <div
        key={idx}
        className="bg-gray-50  p-1  transition-all duration-200"
      >
        <p className="text-xs font-Poppins text-gray-500 mb-1 uppercase tracking-wide">
          {spec.key}
        </p>
        <p className="text-sm font-semibold text-gray-800 break-words">
          {spec.value}
        </p>
      </div>
    ))}
  </div>
</div>
</div>

        {/* Right: Product Content Section */}
        <div className="w-full md:flex-1">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2">
                {product.name}
                {/* Canon EOS 250D 24.1MP Full HD WI-FI DSLR Camera with 18-55mm */}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-[#3b9c3c]">
                  {[...Array(5)].map((_, i) => <HiStar key={i} size={14} className="fill-current" />)}
                </div>
                <span className="text-gray-400 text-xs font-semibold">(120 Reviews)</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                {/* High-resolution photography meets Wi-Fi connectivity. Lightweight, intuitive, and perfect for capturing life's moments. */}
               {product.description}
              </p>
              <div className='my-1.5 flex gap-2 items-center'>
                Store:
              <span className='bg-green-200 ml-4 animate-pulse font-Poppins font-semibold text-sm px-6 py-1 rounded-full'>{product.vendor.storeName}</span>
              <Link to={`/vendor-store/${product.vendor._id}`} className='text-sm text-blue-500 underline'>Wiste to store</Link>
              </div>
            </div>
            <Link to={`/category/${product.vendor._id}`} className=' rounded border border-red-400 p-2'>
              <span className=' font-Poppins font-semibold text-sm'>explore more more categories</span>
            </Link>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-bold text-[#1b4d3e]"> ₹{product.salePrice}</span>
                <span className="text-gray-400 line-through text-sm"> ₹{product.basePrice}</span>
              </div>
              <span className="inline-block px-2.5 py-1 bg-green-50 text-[#3b9c3c] text-[10px] font-bold rounded uppercase">
                In Stock
              </span>
            </div>

   <div className="flex gap-3 ">
              {/* <button onClick={()=>addproduct({ salePrice:product.salePrice ,
                _id:product._id,
                name:product.name,
                bannerImage:product.bannerImage,
                category:product.category
              })} className="px-4.5 bg-[#1b4d3e] text-white py-2.5 font-Poppins rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition-all active:scale-95">
                <HiOutlineShoppingBag size={18} />
                Add to Cart
              </button> */}
          <AddToCart product={product}/>
            </div>
            
            <div className="flex gap-3 ">
              <button className="flex-1 bg-[#1b4d3e] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition-all active:scale-95">
                <HiOutlineShoppingBag size={18} />
                Buy Now
              </button>
              <button className="p-3 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                <HiOutlineHeart size={20} />
              </button>
            </div>
            {/* Features Accordion */}
   <div className="border-t border-b border-gray-100 ">

      {/* Hidden Checkbox */}
      <input type="checkbox" id="char-toggle" className="peer hidden" />

      {/* Label and Icon */}
      <label
        htmlFor="char-toggle"
        className="w-full flex items-center justify-between py-3 cursor-pointer font-bold text-xs uppercase tracking-wider text-gray-700"
      >
        <span>Characteristics</span>
        <div>

        <HiChevronDown
          size={18}
          className="text-gray-400 transition-transform duration-300 peer-checked:rotate-180"
        />
        </div>
      </label>

      {/* Dropdown Content */}
      <div className="max-h-0  overflow-hidden transition-all duration-300 peer-checked:max-h-40 px-2 text-sm text-gray-600">
      <ul className='cursor-pointer flex gap-2 flex-col list-disc ml-4'>
  {product.features?.map((f, idx) => (
    <li key={idx} className='font-Poppins font-semibold text-sm hover:pl-2 hover:text-md hover:text-blue-500 transition-all duration-100'>
      {f}
    </li>
  ))}
</ul>
        {/* <p className="py-2">• Material: Cotton</p>
        <p className="py-2">• Color: Black</p>
        <p className="py-2">• Fit: Regular</p> */}
      </div>

    </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-y-3 py-2 text-[12px] font-semibold text-gray-600">
              <button className="flex items-center gap-2 hover:text-[#1b4d3e]"><MdCompareArrows size={18} /> Compare color</button>
              <button className="flex items-center gap-2 hover:text-[#1b4d3e]"><FiHelpCircle size={16} /> Ask a question</button>
              <button className="flex items-center gap-2 hover:text-[#1b4d3e]"><HiOutlineTruck size={18} /> Delivery & Return</button>
              <button className="flex items-center gap-2 hover:text-[#1b4d3e]"><FiShare2 size={16} /> Share</button>
            </div>

            {/* Shipping Info Block */}
            <div className="rounded-lg border border-gray-300 overflow-hidden bg-gray-50/30">
              <div className="p-3 flex items-center gap-4 border-b border-gray-300">
                <HiOutlineTruck size={24} className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-xs">Free Delivery</p>
                  <p className="text-[10px] text-gray-400 underline decoration-dotted">Enter your Postal code for availability.</p>
                </div>
              </div>
              <div className="p-3 flex items-center gap-4">
                <HiOutlineRefresh size={24} className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-xs">Return Delivery</p>
                  <p className="text-[10px] text-gray-400">Free 30-day returns. <span className="underline decoration-dotted font-medium">Details</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;