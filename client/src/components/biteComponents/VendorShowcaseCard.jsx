import React from 'react';
import { 
  Leaf, 
  UserPlus, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

const ProductCard = ({ name, price, imageAlt }) => (
  <div className="group cursor-pointer">
    <div className="aspect-square rounded-lg bg-white dark:bg-slate-800 overflow-hidden mb-2 relative">
      <div className="w-full h-full bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-300 flex items-center justify-center text-slate-400">
        {/* Replace with your <img> tag */}
        <span className="text-[10px] p-2 text-center">{imageAlt}</span>
      </div>
    </div>
    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{name}</p>
    <p className="text-[10px] text-slate-500">{price}</p>
  </div>
);

const VendorShowcaseCard = () => {
  const products = [
    { name: "Lavender Mist", price: "$24.00", alt: "Essential oil bottle" },
    { name: "Matcha Blend", price: "$18.50", alt: "Herbal tea" },
    { name: "Rosemary Soap", price: "$12.00", alt: "Organic soap" },
    { name: "Bamboo Set", price: "$15.00", alt: "Toothbrush set" },
  ];

  return (
    <div className="w-full max-container mx-auto bg-white dark:bg-slate-900 rounded overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row">
      
      {/* Left Section: Store Info */}
      <div className="w-full md:w-1/3 p-6 lg:p-8 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <Leaf className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Organic Bloom</h4>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
              <CheckCircle2 size={12} /> Top Seller
            </span>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Premium botanical essentials sourced from sustainable farms. We specialize in rare organic extracts and handcrafted wellness products.
        </p>
        
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-10 border border-blue-600 text-blue-600 text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <UserPlus size={16} />
            <span>Follow</span>
          </button>
          <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Right Section: Product Grid */}
      <div className="w-full md:w-2/3 p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Selling Products</h5>
          <div className="flex gap-2">
            <button className="size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button className="size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              name={product.name}
              price={product.price}
              imageAlt={product.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorShowcaseCard;