import React, { useState, useRef, useEffect } from 'react';
import { MailOpen  } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/biteComponents/Loader';
import { verifyOtp } from '../features/authSlice';
import { toast } from 'react-toastify';
import { AddToCartBackend } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const navigate = useNavigate();
const [otp, setOtp] = useState(new Array(6).fill(""));
  const params = new URLSearchParams(window.location.search);
  const initialExpireAt = params.get("expireAt");
  const { isCheckingOtp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [expireAt, setExpireAt] = useState(initialExpireAt ? Number(initialExpireAt) : 0);
  const inputRefs = useRef([]);

  // TIMER EFFECT
  useEffect(() => {
    if (!expireAt) return;

    const updateTimer = () => {
      const difference = expireAt - Date.now();
      if (difference <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
      } else {
        setTimeLeft(difference);
        setIsExpired(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expireAt]);

  // FORMAT TIME AS MM:SS
  const formatTime = (ms) => {
    if (!ms || ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${mm}:${ss}`;
  };
  

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };
const handleSubmit = async(e) => {
  e.preventDefault();

  const otpString = otp.join("").trim();

  if (otpString.length !== 6) {
    return toast.error("OTP must be 6 digits");
  }

  const token = params.get("token");

  if (!token) {
    return toast.error("OTP token is missing.");
  }

  try {
     let result = await dispatch(verifyOtp({ otp: otpString, token })).unwrap();
    // const result = await dispatch(verifyOtp({ otp, token })).unwrap();
      if(!result.success){
        return
      }
      
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
      if(localStorage.getItem("cart")){
        localStorage.setItem("cart",JSON.stringify(...cart,res))
      }

        return navigate("/cart");
      } catch (cartError) {
        toast.error(cartError?.message);
      }
    }

      

    if (result.success && result.user) {
      // ✅ OTP success, user is now logged in

      // Check for any pending action
      const pendingAction = localStorage.getItem("pendingAction");
      if (pendingAction) {
        const { type, payload } = JSON.parse(pendingAction);

        if (type === "ADD_TO_CART") {
          // Call backend add to cart
          dispatch(AddToCartBackend(payload));
        }

        // Clear pending action
        localStorage.removeItem("pendingAction");
      }

      // Navigate to desired page
      navigate("/cart"); // or "/"
    }
  } catch (err) {
    toast.error(err.message || "OTP verification failed");
  }
};

  const handleKeyDown = (e, index) => {
  const newOtp = [...otp];

  if (e.key === "Backspace") {
    e.preventDefault();
    if (otp[index]) {
      // Clear current box
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      // Move focus to previous box and clear
      inputRefs.current[index - 1].focus();
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  } else if (e.key === "ArrowLeft" && index > 0) {
    e.preventDefault();
    inputRefs.current[index - 1].focus();
  } else if (e.key === "ArrowRight" && index < otp.length - 1) {
    e.preventDefault();
    inputRefs.current[index + 1].focus();
  } else if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    newOtp[index] = e.key;
    setOtp(newOtp);
    // Move to next input
    if (index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  } else {
    e.preventDefault(); // block non-numeric keys
  }
};

  return (
    
      <div className=" w-full max-w-md rounded-[32px]  p-8 md:p-12 flex flex-col items-center text-center">
        
        {/* Icon Header */}
      <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4 relative group cursor-pointer">
  <MailOpen className="text-yellow-500 animate-pulse" size={32} />
  
  {/* Tooltip Fix */}
  <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[10px] font-sans font-medium text-gray-700 bg-white border border-amber-400 rounded-lg whitespace-nowrap shadow-sm transition-all duration-200 z-10">
    Click to open email inbox directly
    {/* Small arrow pointing to the icon */}
    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white border-l border-b border-amber-400 rotate-45"></div>
  </span>
</div>

        {/* Text Content */}
        <h1 className="text-2xl md:text-2xl font-semibold font-Poppins text-gray-900 mb-1">
          Check your email
        </h1>
        <p className="text-gray-500 text-sm font-Poppins leading-relaxed mb-1">
          Enter the code sent to
        </p>
        <p className="font-Poppins font-semibold text-gray-900 text-sm mb-8">
          william@example.com
        </p>

        {/* OTP Input Grid */}
        <form onSubmit={handleSubmit}>
        <div className="flex gap-2 md:gap-3 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 md:w-12 md:h-12 text-center text-base font-semibold rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#141414] dark:text-white focus:ring-1 focus:ring-[#141414] focus:border-[#141414] dark:focus:ring-white dark:focus:border-white transition-all outline-none"
                required
              />
            ))}
        </div>
          <p className="text-xs text-center text-red-500">
            {isExpired ? "OTP Expired" : `Expires in ${formatTime(timeLeft)}`}
          </p>
             <button 
            type="submit"
            disabled={otp.length !== 6}
            className={`w-full mt-4 py-2 flex items-center gap-2 justify-center rounded-lg font-semibold text-sm transition-all active:scale-[0.97] 
              ${otp.length === 6 
                ? 'bg-black text-white cursor-pointer opacity-100' 
                : 'bg-gray-800 text-white cursor-not-allowed opacity-50'}`}
          >
                    {
               isCheckingOtp   &&  <Loader size={27} color='#fff'/>
            }
            Verify Identity
          </button>
</form>
        {/* Footer Text */}
        <p className="text-gray-500 text-sm md:text-base">
          Can't find the email? Check your spam folder.
        </p>
      </div>
   
  );
}