import React, { useState } from 'react';
import { 
  MdDashboard, MdShoppingCart, MdInventory2, MdPeople, 
  MdAssessment, MdPercent, MdLink, MdHelpOutline, 
  MdSettings, MdSearch, MdChatBubbleOutline, MdNotificationsNone,
  MdExpandMore, MdTrendingUp, MdTrendingDown, MdMoreHoriz,
  MdArrowUpward, MdMenu, MdClose
} from 'react-icons/md';
import { LuListTree } from "react-icons/lu";

import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// --- Dashboard Data ---


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {authUser} = useSelector(state=>state.auth);

  return (
    <div className="flex min-h-screen bg-[#fdfdfd] font-['Poppins'] text-slate-800 antialiased overflow-x-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-white border-r border-slate-100 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF8200] grid grid-cols-2 gap-0.5 p-1">
              <div className="bg-white"></div><div className="bg-white"></div>
              <div className="bg-white"></div><div className="bg-white"></div>
            </div>
            <span className="text-xl font-bold font-Poppins tracking-tight">EzMart</span>
          </div>
          <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>
            <MdClose size={24} />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-1">
          <NavItem icon={<MdDashboard />} label="Dashboard" path={"/dashboard"} active />
          <NavItem icon={<MdShoppingCart />} label="Orders" path={"/order"} hasSub />
          <NavItem icon={<MdInventory2 />} label="Products" path={"/add-product"} />
          <NavItem icon={<LuListTree />} label="Categories" path={"/category"}/>
          <NavItem icon={<MdAssessment />} label="Reports" hasSub />
          <NavItem icon={<MdPercent />} label="Discounts" />
          <div className="pt-8 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</div>
          <NavItem icon={<MdLink />} label="Integrations" />
          <NavItem icon={<MdHelpOutline />} label="Help" />
          <NavItem icon={<MdSettings />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 border-b border-b-gray-200 bg-white backdrop-blur-md px-4 lg:px-8 py-4 flex items-center justify-between  ">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-slate-600" onClick={() => setSidebarOpen(true)}>
              <MdMenu size={26}/>
            </button>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 lg:gap-8">
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                className="pl-10 pr-4 py-2 bg-white border border-transparent w-48 lg:w-64 text-sm focus:ring-1 focus:ring-[#FF8200] focus:border-transparent rounded-none transition-all outline-none" 
                placeholder="Search stock, order, etc" 
              />
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4 text-slate-500">
              <button className="p-1 hover:text-[#FF8200] transition-colors"><MdChatBubbleOutline size={22} /></button>
              <div className="relative cursor-pointer p-1 hover:text-[#FF8200] transition-colors">
                <MdNotificationsNone size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F5F6F8]"></span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 lg:pl-6 h-10 ml-2">
              <img 
                className="w-8 h-8 lg:w-10 lg:h-10 object-cover bg-slate-200" 
                src={authUser && authUser?.proflieImage} 
                alt="User" 
              />
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold">{authUser?.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin</p>
              </div>
              <MdExpandMore className="text-slate-400 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Grid */}
<div className='max-w-screen-xl'>
    
<Outlet/>
    </div>      

      </div>
    </div>
  );
};

// --- Sub-Components ---

const NavItem = ({ icon, label, active, hasSub ,path}) => (
  <Link to={path} className={`
    flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-200 group
    ${active ? 'bg-[#FF8200] text-white shadow-md' : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'}
  `}>
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-[13px] font-semibold font-Poppins tracking-tight">{label}</span>
    </div>
    {hasSub && <MdExpandMore className={`${active ? 'text-white' : 'text-slate-300 group-hover:text-slate-400'} transition-colors`} />}
  </Link>
);

export default Layout;