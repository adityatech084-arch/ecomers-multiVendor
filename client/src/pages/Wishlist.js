import React, { useState } from 'react';
import { X, Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';

const Wishlist = () => {
  // Example State
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 175.00;

  // Reset function to set quantities back to default
  const handleReset = () => {
    setQuantity(1);
  };

  return (
    <div className="w-full max-container mx-auto px-4 py-10 min-h-[60vh] space-y-6">
      
      {/* Header Section with Reset */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
          <p className="text-sm text-slate-500">Manage your favorite items and quantities.</p>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all group"
        >
          <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" />
          Reset All
        </button>
      </div>

      <div className="overflow-x-auto w-full rounded-sm ">
        <table className="w-full border-collapse min-w-[600px]">
          {/* Table Header */}
          <thead className="border-b border-slate-200">
            <tr className="bg-slate-50/50">
              <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Category</th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Status</th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Price</th>
              <th className="p-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
              <td className="px-2 py-4 flex items-center gap-2 md:gap-4">
  {/* Remove Action Icon */}
  <button className="text-slate-400 hover:text-red-500 transition-colors shrink-0">
    <X size={18} />
  </button>

  {/* Product Image - Adjusted for responsiveness */}
  <a 
    className="border border-slate-200 rounded-md group inline-flex shrink-0 bg-white overflow-hidden" 
    href="/product/link-here"
  >
    <img 
      alt="productImage" 
      loading="lazy" 
      className="rounded-md group-hover:scale-105 transition-transform duration-300 h-12 w-12 md:h-20 md:w-20 object-contain p-1" 
      src="https://images.unsplash.com/photo-1544117518-30dd0575c4bc?w=200" 
    />
  </a>

  {/* Product Title - Scaling text size */}
  <p className="text-xs md:text-sm font-semibold text-slate-800 line-clamp-2 md:line-clamp-1">
    Apple Watch Ultra 2 GPS + Cellular, 49mm Black Titanium
  </p>
</td>

              <td className="p-4 hidden md:table-cell">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase">
                  Wearables
                </span>
              </td>

              <td className="p-4 hidden md:table-cell">
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  In Stock
                </span>
              </td>

              <td className="p-4">
                <span className="text-sm font-bold text-slate-900">${unitPrice.toFixed(2)}</span>
              </td>

              <td className="p-4">
                <div className="flex flex-col gap-2 min-w-[140px]">
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-md p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-slate-800 w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Subtotal</span>
                    <span className="text-sm font-bold text-teal-600">${(unitPrice * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-all">
          <Trash2 size={18} />
          Clear Wishlist
        </button>
      </div>
    </div>
  );
};

export default Wishlist;