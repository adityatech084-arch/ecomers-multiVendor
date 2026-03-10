import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loading animation.json"; // your Lottie JSON

const PreLoader = () => {
  return (
    <div className="fixed inset-0 w-full  flex top-0 h-screen items-center justify-center bg-white z-50">
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
        <Lottie animationData={loaderAnimation} loop={true} />
          <div className='logo text-2xl text-center'>
            <span className='text-3xl font-Poppins  font-semibold'>
                Eco
            </span>
            <span className='text-3xl font-Poppins text-purple-600 font-semibold'>
                mart
            </span>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;