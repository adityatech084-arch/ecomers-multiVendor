import React from 'react';
import { 
  IoStorefrontOutline, 
  IoArrowForward, 
  IoEyeOutline, 
  IoCartOutline, 
  IoColorPaletteOutline, 
  IoCardOutline,
  IoCheckmarkCircle
} from "react-icons/io5"; // Ionicons 5
import { LuPartyPopper } from "react-icons/lu"; // Lucide Icons
import { Link } from 'react-router-dom';

const StoreSuccess = () => {
  const confetti = [
    { color: 'bg-blue-400', size: 'w-3 h-3', pos: 'top-1/4 left-1/4' },
    { color: 'bg-yellow-400', size: 'w-4 h-4', pos: 'top-1/3 right-1/4' },
    { color: 'bg-pink-400', size: 'w-2 h-2', pos: 'bottom-1/4 left-1/3' },
    { color: 'bg-green-400', size: 'w-3 h-3', pos: 'bottom-1/3 right-1/3' },
    { color: 'bg-purple-400', size: 'w-4 h-4', pos: 'top-1/2 left-10' },
    { color: 'bg-orange-400', size: 'w-2 h-2', pos: 'top-20 right-20' },
  ];

  return (
    
    <>
     <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-[#111827]">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
        {/* Confetti Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {confetti.map((dot, idx) => (
            <div key={idx} className={`absolute rounded-full ${dot.color} ${dot.size} ${dot.pos}`} />
          ))}
        </div>

        <div className="w-full max-w-[560px] text-center z-10">
          <div className="mb-8 inline-flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#22c55e] opacity-20 blur-3xl rounded-full scale-150"></div>
            <div className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-2xl">
              <LuPartyPopper className="text-white text-5xl" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-black">
            Your store is ready for business!
          </h1>
          <p className="text-[#6b7280] text-lg md:text-lg mb-12 max-w-[480px] mx-auto leading-relaxed">
            Congratulations! Your brand is officially live. It's time to stock your shelves and welcome your first customers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={"/"} className="w-full sm:w-auto min-w-[220px] bg-black text-white py-3 px-6 text-base font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 group shadow-lg">
              Go to Dashboard
              <IoArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto min-w-[220px] bg-white border border-[#e5e5e5] text-black py-3 px-6 text-base font-bold hover:bg-neutral-50 transition-all flex items-center justify-center gap-3">
              <IoEyeOutline className="text-xl" />
              View Your Store
            </button>
          </div>

          {/* Quick Steps */}
          <div className="mt-10 pt-8 border-t border-dashed border-neutral-300">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Quick Next Steps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepItem icon={<IoCartOutline />} label="Add Products" />
              <StepItem icon={<IoColorPaletteOutline />} label="Customize Theme" />
              <StepItem icon={<IoCardOutline />} label="Set Up Payments" />
            </div>
          </div>
        </div>
      </main>
     </div>
</>
  
  );
};

/* Helper Component for Step Items */
const StepItem = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-3 p-4 group cursor-default">
    <div className="text-neutral-400 text-4xl transition-colors group-hover:text-black">
      {icon}
    </div>
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

export default StoreSuccess;