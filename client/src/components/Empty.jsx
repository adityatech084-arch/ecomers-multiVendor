import React from 'react';
import Lottie from 'lottie-react';
import emptyAnimation from '../assets/Empty box by partho.json'; // Path to your Lottie JSON

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-5 text-center">
      {/* Lottie Animation Container */}
      <div className="max-w-[300px] md:max-w-[400px]">
        <Lottie 
          animationData={emptyAnimation} 
          loop={true} 
        />
      </div>

      {/* Text Content */}
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty!</h2>
        <p className="text-gray-500 max-w-xs mx-auto">
          Looks like you haven't added anything to your cart yet. 
          Start exploring our amazing categories!
        </p>
      </div>

      {/* Action Button */}
      <a 
        href="/" 
        className="mt-8 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors shadow-lg"
      >
        Start Shopping
      </a>
    </div>
  );
};

export default Empty;