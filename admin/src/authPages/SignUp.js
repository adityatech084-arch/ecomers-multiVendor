import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from "react-loader-spinner"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isSigningUp} = useSelector(state=>state.auth);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    storeName: '',
    phone: '',
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    try {
      const result = await dispatch(register(formData)).unwrap();

      // 🔥 Yaha check karo
      if(!result.success) {
        toast.error(result.message || "Registration failed");
        // console.log("Registration failed:", result.message);
        return;
      }
      if (result.otpToken) {
        console.log(result)
        navigate(`/auth/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`);
        // state: { otpToken: result.otpToken }   // ise verfiy otp me location.state?.otpToken; ase get karte hai
      } else {
        console.log("OTP token nahi aaya");
      }

    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     await handleRegister();
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <div className="pt-10 pb-6 px-4 flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-2xl font-Poppins font-semibold">Create Store</h1>
          <p className="text-[#737373] text-sm leading-5 mb-4">
            Sign up to build your brand and start selling.
          </p>
        </div>

        <div className="w-full flex items-center gap-4 mb-4">
          <div className="h-[1px] bg-[#DBDBDB] flex-1"></div>
          <span className="text-[13px] font-semibold text-[#737373] uppercase">OR</span>
          <div className="h-[1px] bg-[#DBDBDB] flex-1"></div>
        </div>

        {/* FORM */}
        <form className="w-full space-y-2" onSubmit={handleSubmit}>
          <FloatingInput label="Email" name="email" value={formData.email} onChange={handleChange} />
          <FloatingInput label="Full Name" name="name" value={formData.fullName} onChange={handleChange} />
          <FloatingInput label="Store Name" name="storeName" value={formData.storeName} onChange={handleChange} />
          <FloatingInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <FloatingInput label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />

       

          <div className="text-[12px] text-[#737373] text-center px-2 py-4 space-y-3">
            <p>
              People who use our service may have uploaded your contact info to Platform.{" "}
              <span className="font-semibold text-[#00376B] cursor-pointer">Learn More</span>
            </p>
            <p>
              By signing up, you agree to our{" "}
              <span className="font-semibold text-[#00376B] cursor-pointer">Terms, Privacy Policy</span> and{" "}
              <span className="font-semibold text-[#00376B] cursor-pointer">Cookies Policy</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className={`w-full bg-black flex items-center gap-2 justify-center text-white py-3 rounded-lg font-semibold text-sm cursor-default active:scale-[0.93] transition-all ${
              isSigningUp ? 'opacity-70' : ''
            }`}
          >

   {
    isSigningUp && <ColorRing
visible={true}
height="25"
width="25"
className="p-0"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
/>
   }
  Create store
     
          </button>
        </form>
      </div>

      <div className="bg-white border border-[#DBDBDB] py-3 text-center">
        <p className="text-sm">
          <span className="text-[#21272b] font-semibold cursor-pointer">Already have an account?</span>{" "}
          <Link to={"/auth/Login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

/* Floating Label Component */
const FloatingInput = ({ label, value, ...props }) => {
  const [focused, setFocused] = useState(false);

  // Label is floated if input is focused OR if there is text
  // const isLabelFloated = focused || (value && value.length > 0);

  return (
    <div className="relative w-full h-12">
   
      <input
        {...props}
        value={value}
        // onFocus={() => setFocused(true)}
        placeholder={label}
        // onBlur={() => setFocused(false)}
        className={`w-full h-full bg-[#FAFAFA] border  border-[#DBDBDB] px-3  placeholder:text-sm rounded-md outline-none 
        `}
        required
      />
  
    </div>
  );
};
export default SignUp;