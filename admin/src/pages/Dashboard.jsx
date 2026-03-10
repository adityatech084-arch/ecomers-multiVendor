import React from 'react'
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  MdDashboard, MdShoppingCart, MdInventory2, MdPeople, 
  MdAssessment, MdPercent, MdLink, MdHelpOutline, 
  MdSettings, MdSearch, MdChatBubbleOutline, MdNotificationsNone,
  MdExpandMore, MdTrendingUp, MdTrendingDown, MdMoreHoriz,
  MdArrowUpward, MdMenu, MdClose
} from 'react-icons/md';
function Dashboard() {
    const revenueData = [
  { name: '12 AUG', revenue: 6000, order: 4000 },
  { name: '13 AUG', revenue: 8500, order: 5500 },
  { name: '14 AUG', revenue: 7000, order: 5000 },
  { name: '15 AUG', revenue: 11000, order: 7000 },
  { name: '16 AUG', revenue: 9500, order: 6500 },
  { name: '17 AUG', revenue: 10500, order: 7500 },
  { name: '18 AUG', revenue: 12500, order: 8500 },
  { name: '19 AUG', revenue: 14521, order: 9800 },
];

const categoryData = [
  { name: 'Electronics', value: 1200000, color: '#FF8200', op: 1 },
  { name: 'Fashion', value: 950000, color: '#FF8200', op: 0.6 },
  { name: 'Home & Kitchen', value: 750000, color: '#FF8200', op: 0.4 },
  { name: 'Beauty & Personal Care', value: 500000, color: '#FF8200', op: 0.2 },
];
  return (
<>
  <main className="p-4 lg:p-8 space-y-6">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Top Cards Section */}
            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <StatCard title="Total Sales" value="$983,410" trend="+3.34%" up highlight />
              <StatCard title="Total Orders" value="58,375" trend="-2.89%" />
              <StatCard title="Total Visitors" value="237,782" trend="+8.02%" up />

              {/* Revenue Analytics - Span 2 cols */}
              <div className="col-span-1 sm:col-span-2 md:col-span-2 bg-white p-6 border border-slate-50 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="font-bold text-lg">Revenue Analytics</h3>
                    <div className="flex gap-4 mt-2">
                      <LegendItem label="Revenue" color="bg-[#FF8200]" />
                      <LegendItem label="Order" color="bg-[#FF8200]" dashed />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-[#FF8200] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                    Last 8 Days <MdExpandMore />
                  </button>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <Tooltip 
                        contentStyle={{ borderRadius: '0px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#FF8200" strokeWidth={2} fillOpacity={0} fill="transparent" />
                      <Area type="monotone" dataKey="order" stroke="#FF8200" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} fill="transparent" />
                      <XAxis dataKey="name" hide />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter border-t border-slate-50 pt-4 px-2">
                    {revenueData.map(d => <span key={d.name}>{d.name}</span>)}
                  </div>
                </div>
              </div>

              {/* Monthly Target Gauge */}
              <div className="col-span-1 bg-white p-6 border border-slate-50 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold">Monthly Target</h3>
                  <MdMoreHoriz className="text-slate-400 cursor-pointer" />
                </div>
                <div className="relative flex flex-col items-center flex-1 justify-center">
                  <svg className="w-40 h-20" viewBox="0 0 100 50">
                    <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                    <path d="M10,50 A40,40 0 0,1 85,30" fill="none" stroke="#FF8200" strokeWidth="10" />
                  </svg>
                  <div className="text-center -mt-6">
                    <span className="text-3xl font-bold">85%</span>
                    <p className="text-[10px] text-green-500 font-bold flex items-center justify-center">
                      <MdArrowUpward /> +8.02%
                    </p>
                  </div>
                  <div className="text-center mt-4 mb-6">
                    <p className="text-xs font-bold mb-1">Great Progress! 🎉</p>
                    <p className="text-[9px] text-slate-400 max-w-[150px] mx-auto leading-relaxed">Our achievement increased by $200k. Let's reach 100% next month.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full mt-auto">
                    <div className="bg-orange-50/50 p-2 text-center border border-orange-100/50">
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Target</p>
                      <p className="font-bold text-xs">$600,000</p>
                    </div>
                    <div className="bg-orange-50/50 p-2 text-center border border-orange-100/50">
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Revenue</p>
                      <p className="font-bold text-xs">$510,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Categories) */}
            <div className="col-span-12 lg:col-span-3 bg-white p-6 border border-slate-50 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold">Top Categories</h3>
                <span className="text-[10px] font-bold text-slate-400 hover:text-[#FF8200] cursor-pointer uppercase tracking-widest transition-colors">See All</span>
              </div>
              <div className="h-48 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} innerRadius={60} outerRadius={85} paddingAngle={0} dataKey="value" stroke="none">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={entry.op} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Total Sales</p>
                  <p className="text-lg font-bold tracking-tight">$3,400,000</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {categoryData.map(cat => (
                  <div key={cat.name} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 shrink-0 bg-[#FF8200]" style={{ opacity: cat.op }}></span>
                      <span className="text-slate-500 font-medium truncate max-w-[120px]">{cat.name}</span>
                    </div>
                    <span className="font-bold text-slate-700">${(cat.value).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section - 3 Equal Blocks on Desktop */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 pb-8">
               
               {/* Active Users */}
               <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-white p-6 border border-slate-50 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold">Active User</h3>
                    <MdMoreHoriz className="text-slate-400 cursor-pointer" />
                  </div>
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-3xl font-bold tracking-tight">2,758</span>
                    <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1 py-0.5 mb-1">+8.02%</span>
                  </div>
                  <div className="space-y-4">
                    <ProgressRow label="United States" val={36} />
                    <ProgressRow label="United Kingdom" val={24} op={0.6} />
                    <ProgressRow label="Indonesia" val={17.5} op={0.4} />
                    <ProgressRow label="Russia" val={15} op={0.2} />
                  </div>
               </div>

               {/* Conversion Funnel */}
               <div className="col-span-12 md:col-span-8 lg:col-span-6 bg-white p-6 border border-slate-50 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-bold">Conversion Rate</h3>
                    <button className="flex items-center gap-2 bg-[#FF8200] text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                      This Week <MdExpandMore />
                    </button>
                  </div>
                  <div className="flex justify-between items-end h-32 gap-3 lg:gap-6 px-2">
                    <FunnelBar label="Views" val="25k" h="100%" trend="+9%" />
                    <FunnelBar label="Cart" val="12k" h="60%" trend="+6%" />
                    <FunnelBar label="Checkout" val="8.5k" h="40%" trend="+4%" />
                    <FunnelBar label="Success" val="6.2k" h="30%" trend="+7%" />
                    <FunnelBar label="Dropped" val="3k" h="15%" trend="-5%" red />
                  </div>
               </div>

               {/* Traffic Sources */}
               <div className="col-span-12 lg:col-span-3 bg-white p-6 border border-slate-50 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold">Traffic Sources</h3>
                    <MdMoreHoriz className="text-slate-400 cursor-pointer" />
                  </div>
                  <div className="flex h-10 w-full mb-6 gap-0.5">
                    <div className="h-full w-[40%] bg-orange-100"></div>
                    <div className="h-full w-[30%] bg-orange-200"></div>
                    <div className="h-full w-[15%] bg-orange-300"></div>
                    <div className="h-full w-[10%] bg-orange-400"></div>
                    <div className="h-full w-[5%] bg-[#FF8200]"></div>
                  </div>
                  <div className="space-y-3">
                    <TrafficItem label="Direct" val="40%" color="bg-orange-100" />
                    <TrafficItem label="Organic" val="30%" color="bg-orange-200" />
                    <TrafficItem label="Social" val="15%" color="bg-orange-300" />
                    <TrafficItem label="Referral" val="10%" color="bg-orange-400" />
                    <TrafficItem label="Email" val="5%" color="bg-[#FF8200]" />
                  </div>
               </div>
            </div>
          </div>
        </main>


</>
  )
}

export default Dashboard


const StatCard = ({ title, value, trend, up, highlight }) => (
  <div className={`p-6 border border-slate-100 ${highlight ? 'bg-orange-50/40' : 'bg-white'} shadow-sm transition-transform hover:translate-y-[-2px]`}>
    <div className="flex justify-between items-start mb-6">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <div className="p-2 bg-white text-[#FF8200] border border-slate-50 shadow-sm"><MdShoppingCart size={18} /></div>
    </div>
    <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
    <div className={`flex items-center gap-1 mt-1 text-[10px] font-bold ${up ? 'text-green-500' : 'text-red-400'}`}>
      {up ? <MdTrendingUp /> : <MdTrendingDown />} {trend} 
      <span className="text-slate-400 font-medium ml-1">vs last week</span>
    </div>
  </div>
);



const LegendItem = ({ label, color, dashed }) => (
  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
    <div className={`w-3 h-0.5 ${color} ${dashed ? 'border-t border-dashed bg-transparent' : ''}`}></div>
    {label}
  </div>
);

const ProgressRow = ({ label, val, op = 1 }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
      <span className="text-slate-400 truncate pr-2">{label}</span>
      <span>{val}%</span>
    </div>
    <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
      <div className="bg-[#FF8200] h-full transition-all duration-1000" style={{ width: `${val}%`, opacity: op }}></div>
    </div>
  </div>
);

const FunnelBar = ({ label, val, h, trend, red }) => (
  <div className="flex-1 flex flex-col items-center gap-3 h-full min-w-0">
    <div className="w-full flex-1 bg-orange-50/50 relative">
      <div className={`absolute bottom-0 left-0 right-0 bg-orange-200/60 transition-all duration-1000`} style={{ height: h }}></div>
    </div>
    <div className="text-center w-full">
      <p className="text-[8px] lg:text-[9px] text-slate-400 font-bold uppercase truncate px-1">{label}</p>
      <p className="text-[11px] font-bold mb-0.5">{val}</p>
      <p className={`text-[8px] font-bold ${red ? 'text-red-500' : 'text-green-500'}`}>{trend}</p>
    </div>
  </div>
);

const TrafficItem = ({ label, val, color }) => (
  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
    <div className="flex items-center gap-2 overflow-hidden">
      <div className={`w-2 h-2 shrink-0 ${color}`}></div>
      <span className="text-slate-400 truncate">{label}</span>
    </div>
    <span className="text-slate-700 ml-2">{val}</span>
  </div>
);

// export default Dashboard;