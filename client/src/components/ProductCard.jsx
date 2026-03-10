import { ShoppingBag } from 'lucide-react';
import React from 'react'
import {  HiOutlineShoppingBag ,HiOutlineHeart, HiStar} from 'react-icons/hi';
import { HiMiniFire } from 'react-icons/hi2';
import { Link} from "react-router-dom";
import  {AddToCart} from "./ProductActions"
import {useSelector} from "react-redux";
function ProductCard({product,index}) {
  const {items} = useSelector(state=>state.cart);
  const exists = items?.some((item,idx)=>item._id === product?._id)
// const product = { id: 1, name: '43" Class TU7000 Series Crystal UHD', category: 'TELEVISION', price: 1599.00, oldPrice: 1678.95, stock: 7, rating: 5, image: 'https://cdn.sanity.io/images/oe6m9gg8/production/c3bf5eaa474e9b5220b6839d6808d4a7022ecde6-500x500.webp?rect=0,34,500,433&w=900&h=780&auto=format', tag: null };
  return (
   <div key={index} className="text-sm h-fit border rounded-md border-slate-200 group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 font-sans">
         
         {/* Top: Image Section */}
         <div className="relative group overflow-hidden bg-[#f9f9f9]">
           <Link to={`/product/${product?._id}`} className="block">
             <img 
               className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110 p-6 mix-blend-multiply" 
               alt={product?.name} 
               src={product?.bannerImage} 
             />
           </Link>
           
           <div className="absolute top-3 right-3">
             <button className="p-2 rounded-full bg-white text-slate-400 hover:bg-[#1b4d3e] hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
               <HiOutlineHeart size={20} />
             </button>
           </div>
   
           <a className="absolute top-3 left-3 z-10 border border-orange-100 p-1.5 rounded-full bg-white hover:border-orange-500 transition-all shadow-sm" href="/deal">
             <HiMiniFire className="text-orange-500" size={18} />
           </a>
         </div>
   
         {/* Bottom: Text Info */}
         <div className="p-4 flex flex-col gap-1.5">
           {/* Category: Small, uppercase, and slightly spaced out */}
           <p className="uppercase line-clamp-1 text-[10px] font-bold text-slate-400 tracking-widest">
             {product?.category}
           </p>
           
           {/* Title: Darker and bolder */}
           <h2 className=" text-slate-900 text-[15px] font-Poppins font-semibold leading-tight line-clamp-1 group-hover:text-[#1b4d3e] transition-colors">
             {product?.name}
           </h2>
   
           {/* Rating */}
           <div className="flex items-center gap-2 my-0.5">
             <div className="flex items-center text-[#3b9c3c]">
               {[...Array(5)].map((_, i) => (
                 <HiStar key={i} size={14} className={i < 4 ? "fill-current" : "text-slate-200"} />
               ))}
             </div>
             <p className="text-slate-400 text-[11px] font-medium tracking-wide">5 Reviews</p>
           </div>
   
           {/* Stock status: High contrast */}
           <div className="flex items-center gap-2">
             <p className="font-bold text-[11px] text-slate-500 uppercase tracking-tighter">In Stock</p>
             <p className="text-[#1b4d3e] font-black text-xs">{product.stock}</p>
           </div>
   
           {/* Price: Large and very bold */}
           <div className="flex items-center gap-2 mt-1 mb-3">
             <span className="font-semibold text-[#1b4d3e] font-Poppins text-ms tracking-tight"> ₹{product.basePrice}</span>
             <span className="line-through font-bold text-slate-300 text-xs"> ₹{(product.basePrice * 1.1).toFixed(2)}</span>
           </div>
   
           {/* Button: Pill shape with bold text */}

           {
            exists ? (
                    <>
               <div className='w-full h-12 flex items-center'>
        <div className='text-sm w-full'>
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground'>Quantity</span>
            <div className='flex items-center gap-1 pb-1 text-base'>
              <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-background shadow-xs  w-6 h-6 border-0 '>
                -
              </button>
              <span className='font-semibold text-sm w-6 text-center text-dark-color'>1</span>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-background shadow-xs  w-6 h-6 border-0 '>
                +
              </button>
            </div>
          </div>   
             <div className='flex items-center justify-between'>
            <span className='text-xs text-muted font-Poppins font-semibold'>Subtotal</span>
            {/* <div className='flex items-center gap-1 pb-1 text-base'> */}
             
              <span className='font-semibold text-sm  text-center text-dark-color'>$1,659.00</span>
              
            {/* </div> */}
          </div>   
        </div>
      </div>
              </>      
            ) : (
           <AddToCart product={product}/>
            )
           }
          {/* <div className="w-full h-12 flex items-center">
      <button 
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#2d4a43]/80 text-white shadow-none border border-[#2d4a43]/80 font-semibold tracking-wide hover:text-white hover:bg-[#2d4a43] hover:border-[#2d4a43] transition-all duration-300 w-36 rounded-full"
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </button>
     
    </div> */}
    
         </div>
       </div>
  )
}

export default ProductCard
