import React from "react";
import Lottie from "lottie-react";
import emptyAnimation from "../../assets/Empty.json";

const Empty = ({ title = "No Data Found", subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 w-full">
      
      {/* Animation */}
      <div className="w-[260px] sm:w-[320px] md:w-[380px]">
        <Lottie
          animationData={emptyAnimation}
          loop
          autoplay
        />
      </div>

      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 text-gray-800">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Empty;