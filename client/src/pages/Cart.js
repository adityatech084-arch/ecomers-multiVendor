// import React from 'react';
// import { ShoppingBag, Heart, Trash2, Minus, Plus, Check, MapPin } from 'lucide-react';
// import Empty from '../components/Empty';
// import { useDispatch, useSelector } from 'react-redux';

// const CartPage = () => {

// const {cart}=useSelector(state=>state.cart);
// const dispatch = useDispatch();




//   return (
//     <>
//     <div className="max-w-7xl mx-auto px-4  text-slate-900">
//       {/* Page Title */}
//       <div className="flex items-center gap-2 py-5 border-b border-gray-100 mb-6">
//         <ShoppingBag className="h-6 w-6 text-emerald-600" />
//         <h1 className="text-2xl font-bold">Your Selection</h1>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Left Column: Cart Items */}
//         <div className="lg:col-span-2">
//           <div className="border border-gray-200 bg-white rounded-md">
            
//             {/* Cart Item */}
//             <div className="border-b border-b-gray-200 p-4 last:border-b-0 flex flex-col md:flex-row items-center justify-between gap-5">
//               <div className="flex flex-1 items-start gap-4 h-auto md:h-44 w-full">
//                 {/* Image Wrapper */}
//                 <div className="border p-1 rounded-md overflow-hidden bg-gray-50 shrink-0">
//                   <img 
//                     alt="Product" 
//                     className="w-32 md:w-40 h-32 md:h-40 object-contain hover:scale-105 transition-transform duration-500" 
//                     src="https://cdn.sanity.io/images/oe6m9gg8/production/1a4548882b7288ab4e9eebd38123cb18e704c701-500x500.png" 
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div className="flex-1 flex flex-col justify-between py-1 h-32 md:h-40">
//                   <div className="space-y-1">
//                     <h2 className="text-lg font-bold leading-tight">43" Elite Horizon Series 4K Ultra-Smart Display</h2>
//                     <p className="text-sm text-slate-500">Category: <span className="font-semibold text-slate-700">Premium Home Audio</span></p>
//                     <p className="text-sm text-slate-500">Condition: <span className="font-semibold text-slate-700">Brand New</span></p>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <button className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">
//                       <Heart size={16} />
//                     </button>
//                     <button className="flex items-center text-slate-400 hover:text-red-600 transition-colors">
//                       <Trash2 size={18} className="mr-1" />
//                       <span className="text-sm font-semibold">Remove</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Pricing & Quantity */}
//               <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto h-auto md:h-40 py-1">
//                 <span className="text-xl font-black text-slate-900">$1,599.00</span>
                
//                 <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-200">
//                   <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors">
//                     <Minus size={14} strokeWidth={3} />
//                   </button>
//                   <span className="font-bold text-sm w-8 text-center">1</span>
//                   <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors">
//                     <Plus size={14} strokeWidth={3} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Cart Reset */}
//             <div className="p-4 bg-slate-50/50">
//               <button className="text-sm font-bold text-red-500 hover:underline uppercase tracking-tighter">
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Summaries */}
//         <div className="space-y-6">
//           {/* Summary Box */}
//           <div className="bg-white p-6 rounded-md border border-gray-200 ">
//             <h2 className="text-lg font-semibold font-Poppins mb-4">Transaction Summary</h2>
//             <div className="space-y-3">
//               <div className="flex justify-between text-slate-500 font-sm font-Poppins">
//                 <span>Sub-Total</span>
//                 <span className="text-slate-900 font-semibold">$1,678.95</span>
//               </div>
//               <div className="flex justify-between text-slate-500 font-sm font-Poppins">
//                 <span>Promotional Rebate</span>
//                 <span className="text-emerald-600 font-semibold">-$79.95</span>
//               </div>
//               <div className="h-px bg-slate-100 my-2"></div>
//               <div className="flex justify-between font-semibold font-Poppins text-lg text-slate-900 pt-2">
//                 <span>Total Due</span>
//                 <span>$1,599.00</span>
//               </div>
//               <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full transition-all mt-4 shadow-lg shadow-emerald-600/20 active:scale-95">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>

//           {/* Address Box */}
//           <div className="bg-white rounded-md border border-gray-200  overflow-hidden">
//             <div className="p-5 border-b border-gray-100 bg-slate-50/50">
//               <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
//                 <MapPin size={16} /> Delivery Destination
//               </h3>
//             </div>
//             <div className="p-5 space-y-4">
//               {/* Selected Address */}
//               <div className="flex items-start gap-3 p-3 border-2 border-emerald-600 rounded-xl bg-emerald-50/30 cursor-pointer">
//                 <div className="mt-1 w-4 h-4 rounded-full border-4 border-emerald-600 bg-white"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-bold text-emerald-900 tracking-tight">Primary Residence</p>
//                   <p className="text-xs text-emerald-700/70 mt-0.5 leading-relaxed">
//                     123 Horizon Street, Block C Zone 4, Metro City, ST 90210
//                   </p>
//                 </div>
//               </div>

//               {/* Inactive Address */}
//               <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-xl hover:border-slate-300 transition-all cursor-pointer">
//                 <div className="mt-1 w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-bold text-slate-700">Corporate Office</p>
//                   <p className="text-xs text-slate-400 mt-0.5">
//                     Suite 405, Tech Plaza, Downtown District, Metro City 8890
//                   </p>
//                 </div>
//               </div>

//               <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-all">
//                 + Add Different Address
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sticky Bar */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_15px_rgba(0,0,0,0.05)]">
//         <div className="flex justify-between items-center mb-4">
//           <span className="font-bold text-slate-500">Order Total</span>
//           <span className="text-2xl font-black text-slate-900">$1,599.00</span>
//         </div>
//         <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-full text-lg shadow-lg">
//           Finalize Order
//         </button>
//       </div>
//     </div>
//     <Empty/>
//     </>
//   );
// };

// export default CartPage;


// upper one is ui part



import React, { useEffect, useState } from 'react';
import { ShoppingBag, Heart, Trash2, Minus, Plus, MapPin, X } from 'lucide-react';
import {ProgressBar} from "react-loader-spinner"
import Empty from '../components/Empty';
import Loader from '../components/biteComponents/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, calculateTotals, fetchCart, RemoveFromCart, ClearCart, clearCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const {authUser}= useSelector(state=>state.auth);
 const[popup,setpopup]=useState(false);

  // console.log(authUser)
  const { items, totalQuantity, subTotal, discount, totalDue  ,loading} = useSelector((state) => state.cart);

  useEffect(()=>{
   dispatch(fetchCart())
   
  },[dispatch])
  // Recalculate totals on mount and whenever cart changes
  useEffect(() => {
    if(items.length > 0){

      dispatch(calculateTotals());
    }
  }, [items, dispatch]);


 if(loading) {
  return   <div className="flex bg-gray-100 items-center justify-center h-[80vh]">
<Loader size={60} color='#000'/>
  </div> 
}
  if (!items.length) return <Empty />;


function deleteCart(){
  dispatch(clearCart())

dispatch(ClearCart())
}



  return (
    <>



    <div className="max-w-7xl mx-auto px-4 text-slate-900 relative">
      {/* Page Title */}


{
  popup && <div className='w-full h-full bg-white/70 backdrop-blur-md flex items-center justify-center  absolute'>
<div className='max-w-md px-3 py-4 border border-gray-200 rounded-xl text-center'>
    <X className='text-black mx-auto'size={25} onClick={()=>setpopup(false)}/>
  <h2 className='font-Poppins font-semibold my-3.5' >Are you shure you want to delete the Whole cart!</h2>

<button onClick={deleteCart}
 className='group w-full py-2 px-4 bg-black text-white font-Poppins font-semibold flex items-center justify-center gap-2' >




{
  loading ? <div class="progress-wrapper w-[40%] h-4  relative  overflow-x-hidden border border-gray-200;
 rounded-full">
  <div class="progress-bar"></div>
</div> :
(
<>

  <Trash2 size={20} className='text-white group-hover:animate-bounce group-hover:text-red-500'/>
  <span className=''>clear cart</span>
  </>
)
}


</button>
</div>
</div>
}

      <div className="flex items-center gap-2 py-5 border-b border-gray-100 mb-6">
        <ShoppingBag className="h-6 w-6 text-emerald-600" />
        <h1 className="text-2xl font-bold">Your Selection</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2">
          <div className="border border-gray-200 bg-white rounded-md">
            {items.map((product) => (
              <div
                key={product._id}
                className="border-b border-b-gray-200 p-4 last:border-b-0 flex flex-col md:flex-row items-center justify-between gap-5"
              >
                <div className="flex flex-1 items-start gap-4 h-auto md:h-44 w-full">
                  {/* Image Wrapper */}
                  <Link to={`/product/${product._id}`} className=" border border-gray-200 p-1 rounded-md overflow-hidden bg-gray-50 shrink-0">
                    <img
                      alt={product.name}
                      className="w-32 md:w-40 h-32 md:h-40 object-contain hover:scale-105 transition-transform duration-500"
                      src={product.bannerImage}
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between py-1 h-32 md:h-40">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold leading-tight">{product.name}</h2>
                      <p className="text-sm text-slate-500">
                        Category: <span className="font-semibold text-slate-700">{product.category}</span>
                      </p>
                      <p className="text-sm text-slate-500">
                        Condition: <span className="font-semibold text-slate-700">Brand New</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">
                        <Heart size={16} />
                      </button>
                      <button
                        onClick={() =>{ 
                          dispatch(removeFromCart(product._id))
                          dispatch(RemoveFromCart(product._id))
                        }}
                        className="flex items-center text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} className="mr-1" />
                        <span className="text-sm font-semibold">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pricing & Quantity */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto h-auto md:h-40 py-1">
                  <span className="text-lg font-semibold font-Poppins text-slate-900">${product.salePrice}</span>

                  <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: product._id, quantity: product.quantity - 1 }))
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="font-bold text-sm w-8 text-center">{product.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: product._id, quantity: product.quantity + 1 }))
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Reset */}
            <div className="p-4 bg-slate-50/50">
              <button

                onClick={()=>setpopup(true) }
                className="text-sm font-bold text-red-500 hover:underline uppercase tracking-tighter"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Summaries */}
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-white p-6 rounded-md border border-gray-200 ">
            <h2 className="text-lg font-semibold font-Poppins mb-4">Transaction Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-500 font-sm font-Poppins">
                <span>Sub-Total</span>
                <span className="text-slate-900 font-semibold">${subTotal}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-sm font-Poppins">
                <span>Promotional Rebate</span>
                <span className="text-emerald-600 font-semibold">-${discount}</span>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div className="flex justify-between font-semibold font-Poppins text-lg text-slate-900 pt-2">
                <span>Total Due</span>
                <span>${totalDue}</span>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full transition-all mt-4 shadow-lg shadow-emerald-600/20 active:scale-95">
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Address Box */}
          {/* Keep your address box as-is */}
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;