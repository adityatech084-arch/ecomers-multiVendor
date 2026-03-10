import React, { useEffect, useState } from 'react';
import { MdAttachEmail } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../features/auth/authSlice';
import { ColorRing } from 'react-loader-spinner';

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const params = new URLSearchParams(window.location.search);
  const initialExpireAt = params.get("expireAt");
  const { otpStatus } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [expireAt, setExpireAt] = useState(initialExpireAt ? Number(initialExpireAt) : 0);

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

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // numeric only
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      console.log("SUCCESS: Submitting OTP:", otp);
      dispatch(verifyOtp({ otp, token: params.get("token") }));
    } else {
      console.log("ERROR: OTP must be 6 digits");
    }
  };
  

  return (
    <div className="w-full max-w-[350px] flex flex-col gap-3 mx-auto mt-10">
      <div className=" px-2 pt-10 pb-8 flex flex-col items-center ">
        <div className="mb-4 p-3 rounded-full border-2 border-black">
          <MdAttachEmail className="text-black" size={40} />
        </div>

        <h1 className="text-lg font-bold text-[#262626] mb-2 uppercase tracking-tight">
          Enter Code
        </h1>

        <p className="text-sm text-[#737373] text-center mb-6 leading-4">
          Check your email and enter the 6-digit code below.
        </p>

        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <input 
            type="text" 
            inputMode="numeric"
            placeholder="000000"
            className="w-full bg-[#FAFAFA] border border-[#DBDBDB] rounded-sm px-4 py-2 text-center text-2xl font-mono tracking-[0.5em] focus:border-[#a8a8a8] outline-none transition-all placeholder:text-gray-200" 
            required 
            value={otp}
            onChange={handleChange}
            autoFocus
          />
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
              otpStatus === "loading"  &&                                
               <ColorRing
visible={true}
height="26"
width="26"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
  colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
/>
            }
            Verify Identity
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-sm text-[#737373]">
            Didn't get a code? <span className="text-[#0095F6] font-semibold cursor-pointer hover:underline">Resend</span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#DBDBDB] py-4 text-center">
        <button 
          onClick={() => window.history.back()}
          className="text-sm font-semibold flex items-center justify-center w-full gap-1 hover:text-[#737373]"
        >
          <IoChevronBack size={16} />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;