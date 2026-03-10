import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/Product Not Found.json"; // your Lottie JSON

const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      {/* Lottie Animation */}
<div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto">
  <Lottie animationData={notFoundAnimation} loop={true} />
</div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-2xl md:text-2xl font-semibold mt-2 font-Poppins text-gray-800">
        Product Not Found
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-sm sm:text-base md:text-sm mt-1">
        The product you are looking for doesn’t exist or has been removed.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
      >
        Go Home
      </button>
    </div>
  );
};

export default ProductNotFound;