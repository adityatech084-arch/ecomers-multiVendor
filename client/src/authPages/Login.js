import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
// import { ColorRing } from 'react-loader-spinner';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useRedirectedProduct from '../hooks/useRedirectProduct';
import Loader from '../components/biteComponents/Loader';
import { login } from '../features/authSlice';
import { AddToCartBackend, addToCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
// import { login } from '../features/auth/authSlice';
// import { handleGoogleLogin } from '../utils/loginFunction';

const Login = () => {
  let {isLogining} = useSelector((state) => state.auth); 
  // const {produc}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
const redirectData = location.state;


 const {productId,quantity} = useRedirectedProduct();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //   const handleGoToSignup = () => {
  //   if (productId) {
  //     navigate(`/signup?productId=${productId}&quantity=${quantity}`);
  //   } else {
  //     navigate("/signup");
  //   }
  // };



// const handleLogin = async () => {
//   try {
//     const result = await dispatch(login(formData)).unwrap();
//      if(localStorage.getItem("pendingAction")){
//       let items = JSON.parse(localStorage.getItem("pendingAction"));
//       items.map(async(i,idx)=>{
//         if(i.type==="ADD_TO_CART"){

//           let res = await dispatch(AddToCartBackend({productId:e.productId,quantity})).unwrap();
//           if(res.product){
//             navigate("/cart")
//           }
//         }
//       })
//      }
//     // ✅ Show backend success message (200)
//     if (result?.message) {
//       toast.success(result.message);
//     }

//     // OTP case
//     if (result?.otpToken) {
//       return navigate(
//         `/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`
//       );
//     }

//     navigate("/");

//   } catch (error) {
    

//     // ✅ Show backend error message (400/401/500)
//     toast.error(error);
//   }
// };
const handleLogin = async () => {
  try {
    const result = await dispatch(login(formData)).unwrap();
    if(!result.success){
      toast.error(result.message)
    }


    toast.success(result.message || "Login successful");

    // 🔹 OTP CASE FIRST
    if (result?.otpToken) {
      return navigate(
        `/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`
      );
    }

    // 🔹 Show backend success message
    if (result?.message) {
      toast.success(result.message);
    }

    // 🔹 Handle pending action AFTER successful login
    const pending = JSON.parse(localStorage.getItem("pendingAction"));

    if (pending && pending.type === "ADD_TO_CART") {
      try {
        const res = await dispatch(
          AddToCartBackend({
            productId: pending.productId,
            quantity: pending.quantity,
          })
        ).unwrap();

        localStorage.removeItem("pendingAction");
      // if(localStorage.getItem("cart")){
      //   localStorage.setItem("cart",JSON.stringify(...cart,res))
      // }

        return navigate("/cart");
      } catch (cartError) {
        toast.error(cartError?.message);
      }
    }

        if (redirectData?.action === "BUY_NOW") {
      navigate("/checkout", {
        state: {
          productId: redirectData.productId,
          quantity: redirectData.quantity
        }
      });
      return;
    }

    // 🔹 Default navigation
    navigate("/");

  } catch (error) {
    // console.log(error)
    toast.error(error?.message); // show backend error only
  }
};
//   const handleLogin = async () => {
//     try {
//       const result = await dispatch(login(formData)).unwrap();

//       // 🔥 Yaha check karo
//       if(!result.success) {
//         toast.error(result.message || "Login failed");
//         // console.log("Login failed:", result.message);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin();
 
  };

  return (
    <>
      {/* HEADER (Optional - placed here for context) */}
    

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-2xl font-semibold tracking-tight mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access your account.</p>
          </div>

          {/* Social Auth */}
          <button 
        //   onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all active:scale-[0.98]">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
              <span className="bg-white px-4">Or sign in with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                <a href="#forgot" className="text-[10px] font-semibold text-black hover:underline underline-offset-2">Forgot password?</a>
              </div>
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
                // disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-[0.99]"
              >
                {
   isLogining && <Loader size={27} color='#fff'/>
                
}
    
                Login
              </button>
              <Link  to={productId ? `/signup?productId=${productId}&quantity=${quantity}` : "/signup"} className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors block text-center mt-3">
                Don't have an account? <span className="text-black underline underline-offset-2">Sign Up</span>
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-[11px] text-gray-400 leading-relaxed">
            By signing in, you agree to our <br className="hidden sm:block"/>
            <a className="text-black underline underline-offset-2" href="#terms">Terms of Service</a> and{' '}
            <a className="text-black underline underline-offset-2" href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </main>

      {/* 2FA VERIFICATION MODAL */}
    
    </>
  );
};

export default Login;