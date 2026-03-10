import React, { useState } from 'react';
import { 
  MdDashboard, MdShoppingCart, MdInventory2, MdPeople, 
  MdAssessment, MdPercent, MdSettings, MdHelpOutline,
  MdSearch, MdNotificationsNone, MdMenu, MdClose,
  MdFilterList, MdMoreHoriz, MdChevronLeft, MdChevronRight,
  MdOutlineDarkMode, MdKeyboardArrowDown
} from 'react-icons/md';

const Order = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data based on the provided screenshot
  const orders = [
    { id: '#EZ-98431', date: 'Oct 24, 2023', customer: 'John Doe', status: 'COMPLETED', method: 'Mastercard **** 4421', total: '$450.00', color: 'bg-green-100 text-green-600' },
    { id: '#EZ-98432', date: 'Oct 24, 2023', customer: 'Alice Smith', status: 'PENDING', method: 'PayPal', total: '$1,200.50', color: 'bg-orange-100 text-orange-600' },
    { id: '#EZ-98433', date: 'Oct 23, 2023', customer: 'Bob Wilson', status: 'PROCESSING', method: 'Visa **** 1190', total: '$89.99', color: 'bg-blue-100 text-blue-600' },
    { id: '#EZ-98434', date: 'Oct 23, 2023', customer: 'Emma Miller', status: 'CANCELLED', method: 'Credit Card', total: '$320.00', color: 'bg-red-100 text-red-600' },
    { id: '#EZ-98435', date: 'Oct 22, 2023', customer: 'Thomas Hardy', status: 'COMPLETED', method: 'Bank Transfer', total: '$2,450.00', color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] font-['Poppins'] text-slate-800 antialiased">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Responsive Header */}
    
        {/* Orders Page Content */}
        <main className="p-4 lg:p-8 space-y-6">
          
          {/* Top Summary Cards (Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <SummaryCard label="Total Orders" value="2,543" trend="+12%" up />
            <SummaryCard label="Pending" value="142" subtext="Needs attention" />
            <SummaryCard label="Refunded" value="12" trend="-2%" />
            <SummaryCard label="Average Order Value" value="$185.00" trend="+5%" up />
          </div>

          {/* Main Table Container */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Filter Section */}
            <div className="p-4 lg:p-6 border-b border-slate-100 space-y-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  className="font-['Poppins'] w-full pl-10 pr-4 py-2.5 border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF8200]" 
                  placeholder="Filter by Order ID, Customer Name..." 
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <FilterDropdown label="All Statuses" />
                <FilterDropdown label="Last 30 Days" />
                <FilterDropdown label="All Payments" />
                <button className="bg-[#FF8200] text-white px-8 py-2 text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            {/* Table Area (Scrollable on mobile) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {orders.map((order, idx) => (
                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#FF8200]">{order.id}</td>
                      <td className="px-6 py-4 text-slate-500">{order.date}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {order.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        {order.customer}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider ${order.color}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{order.method}</td>
                      <td className="px-6 py-4 font-bold">{order.total}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 hover:text-slate-600"><MdMoreHoriz size={20}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-bold border-t border-slate-50">
              <p>Showing 1 to 5 of 240 orders</p>
              <div className="flex items-center gap-1">
                <PageBtn icon={<MdChevronLeft />} disabled />
                <PageBtn label="1" active />
                <PageBtn label="2" />
                <PageBtn label="3" />
                <span className="px-2">...</span>
                <PageBtn icon={<MdChevronRight />} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Reusable Sub-components ---

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${active ? 'bg-[#FF8200] text-white' : 'hover:bg-slate-50 text-slate-600'}`}>
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

const SummaryCard = ({ label, value, trend, subtext, up }) => (
  <div className="bg-white p-6 border border-slate-200 shadow-sm">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h2 className="text-2xl font-bold">{value}</h2>
      {trend && <span className={`text-[10px] font-bold ${up ? 'text-green-500' : 'text-red-500'}`}>{trend}</span>}
      {subtext && <span className="text-[10px] text-orange-400 font-bold">{subtext}</span>}
    </div>
  </div>
);

const FilterDropdown = ({ label }) => (
  <div className="relative group min-w-[140px]">
    <button className="w-full flex items-center justify-between gap-2 px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600">
      {label}
      <MdKeyboardArrowDown size={18} />
    </button>
  </div>
);

const PageBtn = ({ label, icon, active, disabled }) => (
  <button className={`w-8 h-8 flex items-center justify-center border border-slate-200 text-xs font-bold transition-colors 
    ${active ? 'bg-[#FF8200] text-white border-[#FF8200]' : 'text-slate-500 hover:bg-slate-50'}
    ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}>
    {icon || label}
  </button>
);

export default Order;