import React from 'react';
import { BsEmojiFrown } from "react-icons/bs";

function NoProductFound() {
  return (
    <div className="w-full min-h-[200px]  flex items-center justify-center">
      <div className="max-w-md mx-auto flex flex-col items-center text-center space-y-2">
        <BsEmojiFrown size={40} className="text-black animate-spin" />
        <span className="font-Poppins font-semibold text-lg">
          No products match your filters
        </span>
        <p className="font-Poppins text-sm font-base">
          We couldn't find anything matching your current selection. Try broadening your search or resetting the filters.
        </p>
      </div>
    </div>
  );
}

export default NoProductFound;