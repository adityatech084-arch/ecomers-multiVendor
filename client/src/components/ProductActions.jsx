// import { ShoppingBag } from "lucide-react";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../features/cartSlice";
// import { useNavigate } from "react-router-dom";



// export const AddToCart = ({product})=>{
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     let {authUser}=useSelector(state=>state.auth);
//     function addproduct(product){
//         if(!authUser){
//       return    navigate(`/login?productId=${product._id}&quantity=1`);
//         }
//     dispatch(addToCart(product));
//     }
//     return (
//      <div className="w-full h-12 flex items-center">
//       <button 
//       onClick={()=>addproduct({ salePrice:product.salePrice ,
//                 _id:product._id,
//                 name:product.name,
//                 bannerImage:product.bannerImage,
//                 category:product.category
//               })}
//         className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#2d4a43]/80 text-white shadow-none border border-[#2d4a43]/80 font-semibold tracking-wide hover:text-white hover:bg-[#2d4a43] hover:border-[#2d4a43] transition-all duration-300 w-36 rounded-full"
//       >
//         <ShoppingBag className="size-4" />
//         Add to Cart
//       </button>
     
//     </div>
//     )
// }


import React from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, AddToCartBackend } from "../features/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

export const AddToCart = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);

  const handleAddToCart = () => {
    if (!authUser) {
      // 🔹 redirect to login with query params
    localStorage.setItem(
  "pendingAction",
  JSON.stringify({
    type: "ADD_TO_CART",
    productId: product._id,
    quantity: 1,
  })

  );
      navigate(`/login?productId=${product._id}&quantity=1`);
      return; // important: stop execution
    }

    // Add product to cart if logged in
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        bannerImage: product.bannerImage,
        category: product.category,
        salePrice: product.salePrice,
        quantity: 1,
      })
    );
    dispatch(AddToCartBackend({productId:product._id,quantity:product.quantity}))

  
  };

  return (
    <div className="w-full h-12 flex items-center">
      <button
        onClick={handleAddToCart}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#2d4a43]/80 text-white shadow-none border border-[#2d4a43]/80 font-semibold tracking-wide hover:text-white hover:bg-[#2d4a43] hover:border-[#2d4a43] transition-all duration-300 w-36 rounded-full"
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </button>
    </div>
  );
};








export const BuyButton = ({ product }) => {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBuy = () => {

    // If user not logged in → go to login
    if (!user) {
      navigate("/login", {
        state: {
          action: "BUY_NOW",
          productId: product._id,
          quantity: 1
        }
      });
      return;
    }

    // If logged in → go to checkout
    navigate("/checkout", {
      state: {
        productId: product._id,
        quantity: 1
      }
    });

  };

  return (
    <button
      onClick={handleBuy}
      className="flex-1 bg-[#1b4d3e] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#143a2f] transition-all active:scale-95"
    >
      <HiOutlineShoppingBag size={18} />
      Buy Now
    </button>
  );
};