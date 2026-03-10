import React, { useState } from 'react';
import { ImFacebook2 } from "react-icons/im";
import { IoChevronDown } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';

const Login = () => {
  const {isLoggingIn} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password:'',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleLogin = async () => {
    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log(result)
 
      if(!result.success) {
        toast.error(result.message || "Login failed");
        // console.log("Login failed:", result.message);
        return;
      }
      if (result.otpToken) {
        navigate(`/auth/verify-otp?token=${result.otpToken}&expireAt=${result.otpExpires}`);
        // state: { otpToken: result.otpToken }   // ise verfiy otp me location.state?.otpToken; ase get karte hai
      } 

      if(result.success && result.vendor){
        navigate("/store-sucess")
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handelSubmit = async (e)=>{
    e.preventDefault();
    await handleLogin();
  }

  return (
    // <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center py-12 px-4 text-[#262626] font-sans">
      <>
      <div className="w-full max-w-md flex flex-col gap-3">
        
        {/* FORM BOX */}
        <div className=" pt-10 pb-6 px-4 flex flex-col items-center">
      <div className='w-full' >
        
<h1 className='text-2xl font-Poppins font-semibold'>Welcome Back </h1>
 <p className="text-[#737373]   text-sm leading-5 mb-4">
            Login up to get stared in your's account store.
          </p>
        </div>      
         

     

          {/* DIVIDER */}
          <div className="w-full flex items-center gap-4 mb-4">
            <div className="h-[1px] bg-[#DBDBDB] flex-1"></div>
            <span className="text-[13px] font-semibold text-[#737373] uppercase">OR</span>
            <div className="h-[1px] bg-[#DBDBDB] flex-1"></div>
          </div>

          <form className="w-full space-y-2" onSubmit={handelSubmit}>
            <FloatingInput label="Email" name="email" value={formData.email} onChange={handleChange} />
            <FloatingInput label="password" name="password" value={formData.password} onChange={handleChange} />
           
            
      

           
            <div className="text-[12px] text-[#737373] text-center px-2 py-4 space-y-3">
              <p>People who use our service may have uploaded your contact info to Platform. <span className="font-semibold text-[#00376B] cursor-pointer">Learn More</span></p>
              <p>By signing up, you agree to our <span className="font-semibold text-[#00376B] cursor-pointer">Terms, Privacy Policy</span> and <span className="font-semibold text-[#00376B] cursor-pointer">Cookies Policy</span>.</p>
            </div>

            <button
            disabled={isLoggingIn}
            className=" flex items-center justify-center w-full bg-black text-white py-3 rounded-lg font-semibold text-sm cursor-default active:scale-[0.93] transition-all">
      {

        isLoggingIn && <ColorRing
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
              Login
            </button>
          </form>
        </div>

        {/* LOGIN REDIRECT BOX */}
        <div className="bg-white border border-[#DBDBDB] py-3 text-center">
          <p className="text-sm">
            <span className="text-[#21272b] font-semibold cursor-pointer">Don't have an account?</span>
            <Link to={"/auth/signup"}>Create Account</Link>
          </p>
        </div>

      </div>

   </>

  );
};

/* Floating Label Component 
  The label moves up and shrinks when the input has text or is focused
*/
const FloatingInput = ({ label, value, ...props }) => {
  const [focused, setFocused] = useState(false);
  const isLabelFloated = focused || value.length > 0;

  return (
    <div className="relative w-full h-12 group">
      <label 
        className={`absolute left-3 transition-all duration-100 pointer-events-none text-[#737373] 
        ${isLabelFloated 
          ? 'text-[10px] top-0.5' 
          : 'text-[12px] top-1/2 -translate-y-1/2'}`}
      >
        {label}
      </label>
      <input 
        {...props}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full h-full bg-[#FAFAFA] border border-[#DBDBDB]  px-3 py-1 rounded-md outline-none focus:border-[#a8a8a8] text-[12px] 
        ${isLabelFloated ? 'pt-2' : 'pt-0'}`}
      />
    </div>
    
  );
};

export default Login;