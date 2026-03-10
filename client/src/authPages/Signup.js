import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
// import {useDispatch, useSelector } from "react-redux";
// import { toast } from 'react-toastify';
// import { ColorRing } from 'react-loader-spinner';
// import { register } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import useRedirectedProduct from '../hooks/useRedirectProduct';
import Loader from '../components/biteComponents/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/authSlice';
import { toast } from 'react-toastify';
import { AddToCartBackend } from '../features/cartSlice';
// import { handleGoogleLogin } from '../utils/loginFunction';
const Signup = () => {
  let {isSigning} = useSelector((state) => state.auth); 
  const {productId,quantity} = useRedirectedProduct();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
const dispatch = useDispatch();
const navigate = useNavigate();
const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
//     const handleRegister = async () => {
//     try {
//       const result = await dispatch(register(formData)).unwrap();

//       // 🔥 Yaha check karo
//       if(!result.success) {
//         toast.error(result.message || "Registration failed");
//         // console.log("Registration failed:", result.message);
//         return;
//       }
//       if (result.otpToken) {
//         navigate(`/verify-otp?token=${result.otpToken}`);
//         // state: { otpToken: result.otpToken }   // ise verfiy otp me location.state?.otpToken; ase get karte hai
//       } else {
//         console.log("OTP token nahi aaya");
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

// const handleSignup = async () => {
//   try {
//     // 1️⃣ Dispatch signup action
//     const result = await dispatch(signup(formData)).unwrap();

//     if (!result.success) {
//       return toast.error(result.message || "Signup failed");
//     }

//     // 2️⃣ Handle OTP if applicable
//     if (result.otpToken) {
//       return navigate(
//         `/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`
//       );
//     }

//     // 3️⃣ If signup successful and user exists
//     if (result.success && result.user) {
//       // Check if redirected from add-to-cart
//       if (productId) {
//         // Dispatch backend AddToCart
//         const res = await dispatch(AddToCart({ productId, quantity })).unwrap();

//         if (res.success && res.cart) {
//           // Add product to local Redux cart
//           const product = res.cart.items.find(
//             (item) => item.product._id === productId
//           )?.product;

//           if (product) {
//             dispatch(
//               addToCart({
//                 _id: product._id,
//                 name: product.name,
//                 bannerImage: product.bannerImage,
//                 category: product.category,
//                 salePrice: product.salePrice,
//                 quantity, // quantity added
//               })
//             );
//           }
//         }
//       }

//       // 4️⃣ Navigate to cart if product was being added, otherwise home
//       return navigate(productId ? "/cart" : "/");
//     }
//   } catch (error) {
//     toast.error(error.message || error);
//     // console.error(error);
//   }
// };
const handleSignup = async () => {
  try {
    const result = await dispatch(signup(formData)).unwrap();

    // Signup failed
    if (!result.success) return toast.error(result.message);

    // OTP flow
    if (result.otpToken) {
      return navigate(`/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`);
    }

    // Signup success
    if (result.user) {
      // If redirected from add-to-cart
      if (productId) {
        const res = await dispatch(AddToCartBackend({ productId, quantity })).unwrap();

        if (res.success && res.cart) {
          const product = res.cart.items.find((item) => item.product._id === productId)?.product;

          if (product) {
            dispatch(
              addToCart({
                _id: product._id,
                name: product.name,
                bannerImage: product.bannerImage,
                category: product.category,
                salePrice: product.salePrice,
                quantity,
              })
            );
          }
        }
      }

      return navigate(productId ? "/cart" : "/");
    }
  } catch (error) {
    // Only show backend message (from rejectWithValue)
    toast.error(error);
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault();
  await  handleSignup();

  };

  return (
    // <div className="min-h-screen bg-white text-[#111827] font-sans flex flex-col antialiased">
    <>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-2xl font-semibold font-poppins tracking-tight mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">Join the community of modern thinkers.</p>
          </div>

          {/* Social Auth */}
          <button
        //   onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all  active:scale-[0.98]">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
              <span className="bg-white px-4">Or use email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="E.g. Jane Cooper"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-300"
                onChange={handelChange}
                name="name"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-300"
                onChange={handelChange}
                name="email"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-300"
                  onChange={handelChange}
                  name="password"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isSigning}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-[0.99]"
              >
                {
   isSigning && <Loader color='#fff'size={27}/>
      
}
      
                Create Account
              </button>
              <Link to={productId ? `/login?productId=${productId}&quantity=${quantity}` : "/login"} className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors block text-center mt-3">
                Already have an account? <span className="text-black underline underline-offset-2">Login</span>
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-[11px] text-gray-400 leading-relaxed">
            By clicking "Create Account", you agree to our <br className="hidden sm:block"/>
            <a className="text-black underline underline-offset-2" href="#terms">Terms</a> and{' '}
            <a className="text-black underline underline-offset-2" href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </main>

      {/* FOOTER */}
   
      {/* VERIFICATION MODAL (Logic Toggle) */}
     
    </>
  );
};

export default Signup;