// import React, { useState, useRef } from 'react';
// import { 
//   MdInventory2, MdCloudUpload, MdStar, MdAddCircleOutline, 
//   MdDeleteOutline, MdPhotoLibrary, MdClose, MdSettings, 
//   MdLocalShipping, MdBarChart, MdSearch, MdRocketLaunch,
//   MdCampaign, MdFlashOn
// } from 'react-icons/md';

// const AddProduct = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const bannerInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const [product, setProduct] = useState({
//     name: 'Sony WH-CH520 Wireless Headphones',
//     description: 'Experience high-quality sound and long-lasting battery life with these sleek wireless headphones.',
//     category: 'Electronics',
//     brand: 'Sony',
//     sku: 'SNY-WH-520-BLK',
//     basePrice: '499.00',
//     salePrice: '449.00',
//     rating: '4.5',
//     stock: '150',
//     weight: '0.147',
//     dimensions: '7.8 x 6.9 x 1.7 inches',
//     seoTitle: 'Buy Sony WH-CH520 Online | Best Price',
//     seoKeywords: 'headphones, sony, wireless, bluetooth',
//     bannerImage: null,
//     gallery: [],
//     features: ['50-hour battery life', 'Crystal clear calls', 'Multipoint connection'],
//     specs: [{ key: 'Bluetooth', value: '5.2' }, { key: 'USB Type', value: 'Type-C' }],
//     // New Marketing States
//     isFeatured: true,
//     isHotDeal: false
//   });

//   const handleAction = (type, action, index, field, val) => {
//     const list = [...product[type]];
//     if (action === 'add') {
//       type === 'features' ? list.push('') : list.push({ key: '', value: '' });
//     } else if (action === 'update') {
//       type === 'features' ? (list[index] = val) : (list[index][field] = val);
//     } else if (action === 'remove') {
//       list.splice(index, 1);
//     }
//     setProduct({ ...product, [type]: list });
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === 'banner') setProduct(prev => ({ ...prev, bannerImage: reader.result }));
//       else if (product.gallery.length < 4) setProduct(prev => ({ ...prev, gallery: [...prev.gallery, reader.result] }));
//     };
//     reader.readAsDataURL(file);
//     e.target.value = null;
//   };

//   const handleSubmit = (e) => {
//     if(e) e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       console.log("FULL DATA EXPORT:", product);
//       alert("Product Published Successfully!");
//       setIsSubmitting(false);
//     }, 1500);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F5F6F8] font-['Poppins'] text-slate-800 antialiased pb-20">
//       <div className="flex-1 flex flex-col min-w-0">
//         <main className="p-8">
//           <div className="grid grid-cols-12 gap-8 max-w-[1400px] mx-auto">
            
//             {/* LEFT: DATA ENTRY */}
//             <div className="col-span-12 lg:col-span-8 space-y-6">
              
//               <input type="file" hidden ref={bannerInputRef} onChange={(e) => handleFileChange(e, 'banner')} />
//               <input type="file" hidden ref={galleryInputRef} onChange={(e) => handleFileChange(e, 'gallery')} />

//               {/* 1. IMAGES */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] mb-4">Media Assets</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div onClick={() => bannerInputRef.current.click()} className="md:col-span-3 aspect-video bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden rounded group relative">
//                     {product.bannerImage ? <img src={product.bannerImage} className="w-full h-full object-cover" alt="Banner" /> : <MdCloudUpload size={30} className="text-slate-300"/>}
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
//                     {product.gallery.map((img, i) => (
//                       <div key={i} className="aspect-square bg-slate-100 relative group border border-slate-200">
//                         <img src={img} className="w-full h-full object-cover" alt="Gallery" />
//                         <button onClick={() => setProduct({...product, gallery: product.gallery.filter((_, idx)=>idx!==i)})} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"><MdClose/></button>
//                       </div>
//                     ))}
//                     {product.gallery.length < 4 && (
//                       <button onClick={() => galleryInputRef.current.click()} className="aspect-square border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-[#FF8200]"><MdAddCircleOutline size={24}/></button>
//                     )}
//                   </div>
//                 </div>
//               </section>

//               {/* 2. CORE DETAILS */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200 space-y-4">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] border-b pb-4">Product Identity</h3>
//                 <Input label="Product Name" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})} />
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input label="Brand" value={product.brand} onChange={(e)=>setProduct({...product, brand: e.target.value})} />
//                   <Input label="SKU / ID" value={product.sku} onChange={(e)=>setProduct({...product, sku: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Description</label>
//                   <textarea rows="4" value={product.description} onChange={(e)=>setProduct({...product, description: e.target.value})} className="w-full px-4 py-3 border border-slate-200 text-sm outline-none bg-white focus:ring-1 focus:ring-[#FF8200]" />
//                 </div>
//               </section>

//               {/* NEW SECTION: VISIBILITY & MARKETING */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><MdCampaign size={18}/> Visibility & Promotion</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <Toggle 
//                     label="Featured Product" 
//                     description="Display this product in the homepage featured section"
//                     enabled={product.isFeatured} 
//                     onChange={() => setProduct({...product, isFeatured: !product.isFeatured})} 
//                   />
//                   <Toggle 
//                     label="Hot Deal" 
//                     description="Add a 'Hot' badge and include in flash sale carousels"
//                     enabled={product.isHotDeal} 
//                     onChange={() => setProduct({...product, isHotDeal: !product.isHotDeal})} 
//                   />
//                 </div>
//               </section>

//               {/* 3. PRICING & INVENTORY */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdBarChart/> Pricing & Stock</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <Input label="Sale Price" value={product.salePrice} onChange={(e)=>setProduct({...product, salePrice: e.target.value})} />
//                   <Input label="List Price" value={product.basePrice} onChange={(e)=>setProduct({...product, basePrice: e.target.value})} />
//                   <Input label="Stock Qty" value={product.stock} onChange={(e)=>setProduct({...product, stock: e.target.value})} />
//                   <Input label="Rating" type="number" value={product.rating} onChange={(e)=>setProduct({...product, rating: e.target.value})} />
//                 </div>
//               </section>

//               {/* 4. FEATURES & SPECS */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <section className="bg-white p-6 shadow-sm border border-slate-200">
//                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdStar className="text-[#FF8200]"/> Key Features</h3>
//                   {product.features.map((f, i) => (
//                     <div key={i} className="flex items-center gap-2 mb-2">
//                        <input value={f} onChange={(e)=>handleAction('features', 'update', i, null, e.target.value)} className="w-full p-2 border-b border-slate-100 text-xs outline-none focus:border-[#FF8200]" placeholder="Feature..." />
//                        <button onClick={()=>handleAction('features', 'remove', i)} className="text-slate-300"><MdClose/></button>
//                     </div>
//                   ))}
//                   <button onClick={()=>handleAction('features', 'add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Bullet Point</button>
//                 </section>

//                 <section className="bg-white p-6 shadow-sm border border-slate-200">
//                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdSettings/> Technical Specs</h3>
//                   {product.specs.map((s, i) => (
//                     <div key={i} className="flex gap-2 mb-2">
//                       <input value={s.key} onChange={(e)=>handleAction('specs', 'update', i, 'key', e.target.value)} placeholder="Label" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
//                       <input value={s.value} onChange={(e)=>handleAction('specs', 'update', i, 'value', e.target.value)} placeholder="Value" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
//                     </div>
//                   ))}
//                   <button onClick={()=>handleAction('specs', 'add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Parameter</button>
//                 </section>
//               </div>

//               {/* 5. SEO & SEARCH */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200 space-y-4">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] border-b pb-4"><MdSearch size={16} className="inline mr-1"/> SEO Engine</h3>
//                 <Input label="Meta Title" value={product.seoTitle} onChange={(e)=>setProduct({...product, seoTitle: e.target.value})} />
//                 <Input label="Keywords (Comma separated)" value={product.seoKeywords} onChange={(e)=>setProduct({...product, seoKeywords: e.target.value})} />
//               </section>

//               {/* 6. LOGISTICS */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdLocalShipping/> Shipping & Dimensions</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input label="Weight (kg)" value={product.weight} onChange={(e)=>setProduct({...product, weight: e.target.value})} />
//                   <Input label="Box Dimensions" value={product.dimensions} onChange={(e)=>setProduct({...product, dimensions: e.target.value})} />
//                 </div>
//               </section>

//               {/* FINAL BOTTOM BUTTON */}
//               <div className="pt-6">
//                  <button onClick={handleSubmit} className="w-full py-4 bg-[#FF8200] text-white rounded font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100">
//                     <MdRocketLaunch size={20}/> {isSubmitting ? "Syncing to Cloud..." : "Publish Final Product"}
//                  </button>
//               </div>

//             </div>

//             {/* RIGHT: LIVE PREVIEW */}
//             <div className="col-span-12 lg:col-span-4">
//               <div className="sticky top-24 space-y-4">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer View Preview</p>
//                 <div className="bg-white shadow-2xl border border-slate-100 overflow-hidden rounded-xl relative">
                  
//                   {/* PREVIEW BADGES */}
//                   <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//                     {product.isFeatured && (
//                       <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-sm text-[8px] font-black text-slate-800 shadow-sm border border-slate-100 flex items-center gap-1 uppercase tracking-tighter">
//                         <MdStar className="text-[#FF8200]"/> Featured
//                       </span>
//                     )}
//                     {product.isHotDeal && (
//                       <span className="bg-red-600 px-2 py-1 rounded-sm text-[8px] font-black text-white shadow-sm flex items-center gap-1 uppercase tracking-tighter">
//                         <MdFlashOn/> Hot Deal
//                       </span>
//                     )}
//                   </div>

//                   <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center">
//                     {product.bannerImage ? <img src={product.bannerImage} className="w-full h-full object-cover" alt="Preview" /> : <MdPhotoLibrary size={48} className="text-slate-100" />}
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <span className="text-[8px] font-black text-[#FF8200] uppercase tracking-tighter">{product.brand}</span>
//                         <h2 className="text-lg font-bold uppercase leading-tight">{product.name}</h2>
//                       </div>
//                       <span className="text-[9px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">STOCK: {product.stock}</span>
//                     </div>

//                     <div className="flex text-[#FF8200] text-xs mb-3">
//                         {[...Array(5)].map((_, i) => <MdStar key={i} className={i < Math.floor(product.rating) ? "text-[#FF8200]" : "text-slate-200"} />)}
//                         <span className="ml-1 text-slate-400 font-bold">{product.rating}</span>
//                     </div>
                    
//                     <div className="flex items-baseline gap-2 mb-4">
//                       <span className="text-2xl font-black text-[#FF8200]">${product.salePrice}</span>
//                       <span className="text-xs text-slate-300 line-through">${product.basePrice}</span>
//                     </div>

//                     <div className="space-y-4 border-t border-slate-50 pt-4">
//                        <p className="text-[10px] text-slate-400 leading-relaxed italic line-clamp-2">"{product.description}"</p>
                       
//                        <div className="grid grid-cols-1 gap-1">
//                           {product.features.slice(0, 3).map((f, i) => (
//                             <div key={i} className="text-[10px] flex items-center gap-2">
//                                <div className="w-1 h-1 bg-[#FF8200] rounded-full" />
//                                {f || 'Feature detail...'}
//                             </div>
//                           ))}
//                        </div>
//                     </div>

//                     <button className="w-full mt-6 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded hover:bg-[#FF8200] transition-all">
//                       Add to Basket
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// // SUB-COMPONENTS
// const Input = ({ label, value, onChange, type = "text" }) => (
//   <div className="w-full">
//     <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">{label}</label>
//     <input type={type} value={value} onChange={onChange} className="w-full px-4 py-3 border border-slate-200 focus:ring-1 focus:ring-[#FF8200] outline-none text-sm bg-white rounded-sm transition-all" />
//   </div>
// );

// const Toggle = ({ label, description, enabled, onChange }) => (
//   <div className="flex items-center justify-between group">
//     <div className="flex flex-col">
//       <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{label}</span>
//       <span className="text-[9px] text-slate-400 max-w-[180px]">{description}</span>
//     </div>
//     <button 
//       onClick={onChange}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-[#FF8200]' : 'bg-slate-200'}`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
//       />
//     </button>
//   </div>
// );

// export default AddProduct;


// import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { 
//   MdCloudUpload, MdAddCircleOutline, MdClose, MdRocketLaunch, 
//   MdStar, MdSettings, MdBarChart, MdSearch, MdLocalShipping, MdPhotoLibrary, MdFlashOn, MdCampaign 
// } from "react-icons/md";

// import { addProduct } from "../features/product/productSlice.js";

// // Reusable Input & Toggle
// const Input = ({ label, value, onChange, type = "text" }) => (
//   <div className="w-full">
//     <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">{label}</label>
//     <input type={type} value={value} onChange={onChange} className="w-full px-4 py-3 border border-slate-200 focus:ring-1 focus:ring-[#FF8200] outline-none text-sm bg-white rounded-sm transition-all" />
//   </div>
// );

// const Toggle = ({ label, description, enabled, onChange }) => (
//   <div className="flex items-center justify-between group">
//     <div className="flex flex-col">
//       <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{label}</span>
//       <span className="text-[9px] text-slate-400 max-w-[180px]">{description}</span>
//     </div>
//     <button 
//       onClick={onChange}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-[#FF8200]' : 'bg-slate-200'}`}
//     >
//       <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
//     </button>
//   </div>
// );

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const bannerInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   // State for all fields except files
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     brand: "",
//     sku: "",
//     basePrice: "",
//     salePrice: "",
//     rating: "",
//     stock: "",
//     weight: "",
//     dimensions: "",
//     seoTitle: "",
//     seoKeywords: "",
//     features: [],
//     specs: [],
//     isFeatured: false,
//     isHotDeal: false
//   });

//   // Separate state for files
//   const [bannerFile, setBannerFile] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);
//   const [galleryFiles, setGalleryFiles] = useState([]);
//   const [galleryPreview, setGalleryPreview] = useState([]);

//   // Handle file input
//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "banner") {
//         setBannerFile(file);
//         setBannerPreview(reader.result);
//       } else if (type === "gallery" && galleryPreview.length < 4) {
//         setGalleryFiles(prev => [...prev, file]);
//         setGalleryPreview(prev => [...prev, reader.result]);
//       }
//     };
//     reader.readAsDataURL(file);
//     e.target.value = null;
//   };

//   // Handle features/specs
//   const handleAction = (type, action, index, field, val) => {
//     const list = [...product[type]];
//     if (action === "add") list.push(type === "features" ? "" : { key: "", value: "" });
//     else if (action === "update") type === "features" ? (list[index] = val) : (list[index][field] = val);
//     else if (action === "remove") list.splice(index, 1);
//     setProduct({ ...product, [type]: list });
//   };

//   // Submit product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       if (bannerFile) formData.append("banner", bannerFile);
//       galleryFiles.forEach(file => formData.append("gallery", file));
//       formData.append("productData", JSON.stringify(product));

//       dispatch(addProduct(formData))
//         .unwrap()
//         .then(res => {
//           alert("Product published successfully!");
//           setProduct({
//             name: "",
//             description: "",
//             category: "",
//             brand: "",
//             sku: "",
//             basePrice: "",
//             salePrice: "",
//             rating: "",
//             stock: "",
//             weight: "",
//             dimensions: "",
//             seoTitle: "",
//             seoKeywords: "",
//             features: [],
//             specs: [],
//             isFeatured: false,
//             isHotDeal: false
//           });
//           setBannerFile(null);
//           setBannerPreview(null);
//           setGalleryFiles([]);
//           setGalleryPreview([]);
//         })
//         .catch(err => alert(err));
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F5F6F8] font-['Poppins'] text-slate-800 antialiased pb-20">
//       <div className="flex-1 flex flex-col min-w-0">
//         <main className="p-8">
//           <div className="grid grid-cols-12 gap-8 max-w-[1400px] mx-auto">
            
//             {/* LEFT: DATA ENTRY */}
//             <div className="col-span-12 lg:col-span-8 space-y-6">
//               <input type="file" hidden ref={bannerInputRef} onChange={e => handleFileChange(e, "banner")} />
//               <input type="file" hidden ref={galleryInputRef} onChange={e => handleFileChange(e, "gallery")} />

//               {/* 1. IMAGES */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] mb-4">Media Assets</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div onClick={() => bannerInputRef.current.click()} className="md:col-span-3 aspect-video bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden rounded group relative">
//                     {bannerPreview ? <img src={bannerPreview} className="w-full h-full object-cover" alt="Banner" /> : <MdCloudUpload size={30} className="text-slate-300"/>}
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
//                     {galleryPreview.map((img, i) => (
//                       <div key={i} className="aspect-square bg-slate-100 relative group border border-slate-200">
//                         <img src={img} className="w-full h-full object-cover" alt="Gallery" />
//                         <button onClick={() => {
//                           setGalleryPreview(galleryPreview.filter((_, idx) => idx !== i));
//                           setGalleryFiles(galleryFiles.filter((_, idx) => idx !== i));
//                         }} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"><MdClose/></button>
//                       </div>
//                     ))}
//                     {galleryPreview.length < 4 && (
//                       <button onClick={() => galleryInputRef.current.click()} className="aspect-square border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-[#FF8200]"><MdAddCircleOutline size={24}/></button>
//                     )}
//                   </div>
//                 </div>
//               </section>

//               {/* 2. PRODUCT IDENTITY */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200 space-y-4">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] border-b pb-4">Product Identity</h3>
//                 <Input label="Product Name" value={product.name} onChange={e=>setProduct({...product,name:e.target.value})} />
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input label="Brand" value={product.brand} onChange={e=>setProduct({...product,brand:e.target.value})} />
//                   <Input label="SKU / ID" value={product.sku} onChange={e=>setProduct({...product,sku:e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Description</label>
//                   <textarea rows="4" value={product.description} onChange={e=>setProduct({...product,description:e.target.value})} className="w-full px-4 py-3 border border-slate-200 text-sm outline-none bg-white focus:ring-1 focus:ring-[#FF8200]" />
//                 </div>
//               </section>

//               {/* 3. VISIBILITY & MARKETING */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><MdCampaign size={18}/> Visibility & Promotion</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <Toggle 
//                     label="Featured Product" 
//                     description="Display this product in the homepage featured section"
//                     enabled={product.isFeatured} 
//                     onChange={() => setProduct({...product, isFeatured: !product.isFeatured})} 
//                   />
//                   <Toggle 
//                     label="Hot Deal" 
//                     description="Add a 'Hot' badge and include in flash sale carousels"
//                     enabled={product.isHotDeal} 
//                     onChange={() => setProduct({...product, isHotDeal: !product.isHotDeal})} 
//                   />
//                 </div>
//               </section>

//               {/* 4. PRICING & STOCK */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdBarChart/> Pricing & Stock</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <Input label="Sale Price" value={product.salePrice} onChange={e=>setProduct({...product,salePrice:e.target.value})} />
//                   <Input label="List Price" value={product.basePrice} onChange={e=>setProduct({...product,basePrice:e.target.value})} />
//                   <Input label="Stock Qty" value={product.stock} onChange={e=>setProduct({...product,stock:e.target.value})} />
//                   <Input label="Rating" type="number" value={product.rating} onChange={e=>setProduct({...product,rating:e.target.value})} />
//                 </div>
//               </section>

//               {/* 5. FEATURES & SPECS */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <section className="bg-white p-6 shadow-sm border border-slate-200">
//                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdStar className="text-[#FF8200]"/> Key Features</h3>
//                   {product.features.map((f,i)=>(
//                     <div key={i} className="flex items-center gap-2 mb-2">
//                       <input value={f} onChange={e=>handleAction('features','update',i,null,e.target.value)} className="w-full p-2 border-b border-slate-100 text-xs outline-none focus:border-[#FF8200]" placeholder="Feature..." />
//                       <button onClick={()=>handleAction('features','remove',i)} className="text-slate-300"><MdClose/></button>
//                     </div>
//                   ))}
//                   <button onClick={()=>handleAction('features','add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Bullet Point</button>
//                 </section>

//                 <section className="bg-white p-6 shadow-sm border border-slate-200">
//                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdSettings/> Technical Specs</h3>
//                   {product.specs.map((s,i)=>(
//                     <div key={i} className="flex gap-2 mb-2">
//                       <input value={s.key} onChange={e=>handleAction('specs','update',i,'key',e.target.value)} placeholder="Label" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
//                       <input value={s.value} onChange={e=>handleAction('specs','update',i,'value',e.target.value)} placeholder="Value" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
//                     </div>
//                   ))}
//                   <button onClick={()=>handleAction('specs','add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Parameter</button>
//                 </section>
//               </div>

//               {/* 6. SEO & SEARCH */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200 space-y-4">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] border-b pb-4"><MdSearch size={16} className="inline mr-1"/> SEO Engine</h3>
//                 <Input label="Meta Title" value={product.seoTitle} onChange={e=>setProduct({...product,seoTitle:e.target.value})} />
//                 <Input label="Keywords (Comma separated)" value={product.seoKeywords} onChange={e=>setProduct({...product,seoKeywords:e.target.value})} />
//               </section>

//               {/* 7. LOGISTICS */}
//               <section className="bg-white p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdLocalShipping/> Shipping & Dimensions</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input label="Weight (kg)" value={product.weight} onChange={e=>setProduct({...product,weight:e.target.value})} />
//                   <Input label="Box Dimensions" value={product.dimensions} onChange={e=>setProduct({...product,dimensions:e.target.value})} />
//                 </div>
//               </section>

//               {/* FINAL BUTTON */}
//               <div className="pt-6">
//                 <button onClick={handleSubmit} className="w-full py-4 bg-[#FF8200] text-white rounded font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100">
//                   <MdRocketLaunch size={20}/> Publish Final Product
//                 </button>
//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;





import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  MdCloudUpload, MdAddCircleOutline, MdClose, MdRocketLaunch, 
  MdStar, MdSettings, MdBarChart, MdSearch, MdLocalShipping, MdPhotoLibrary, MdFlashOn, MdCampaign 
} from "react-icons/md";

import { addProduct } from "../features/product/productSlice.js";
import Loader from "../components/bitComponents/Loader.jsx";
import { toast } from "react-toastify";

// Reusable Input & Toggle
const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">{label}</label>
    <input type={type} value={value} onChange={onChange} className="w-full px-4 py-3 border border-slate-200 focus:ring-1 focus:ring-[#FF8200] outline-none text-sm bg-white rounded-sm transition-all" />
  </div>
);

const Toggle = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between group">
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{label}</span>
      <span className="text-[9px] text-slate-400 max-w-[180px]">{description}</span>
    </div>
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-[#FF8200]' : 'bg-slate-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const AddProduct = () => {
  const dispatch = useDispatch();
  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const {loading} = useSelector(state=>state.product);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    basePrice: "",
    salePrice: "",
    rating: "",
    stock: "",
    weight: "",
    dimensions: "",
    seoTitle: "",
    seoKeywords: "",
    features: [],
    specs: [],
    isFeatured: false,
    isHotDeal: false

//  name: "Canon EOS R6 Full-Frame Mirrorless Camera",
//     description: "The Canon EOS R6 is a professional-grade full-frame mirrorless camera designed for photographers and videographers seeking high-speed performance and exceptional image quality. With a 20MP full-frame sensor and DIGIC X processor, it delivers sharp, detailed photos and 4K video at up to 60fps. The in-body image stabilization (IBIS) ensures smooth, blur-free shots even in low-light conditions. Dual card slots, high-speed autofocus, and advanced connectivity options make it perfect for both studio and outdoor photography.",
//     category: "Cameras",
//     subCategory:"Electronics",
//     brand: "Canon",
//     sku: "CAM-001",
//     basePrice: 240000,
//     salePrice: 229999,
//     stock: 10,
//     weight: 0.82,
//     dimensions: "138.4 x 97.5 x 88.4 mm",
//     features: [
//       "20MP full-frame CMOS sensor",
//       "4K video at 60fps",
//       "In-body image stabilization (IBIS)",
//       "Dual card slots",
//       "High-speed autofocus with Eye Detection"
//     ],
//     specs: [
//       { key: "Sensor Type", value: "Full-Frame CMOS" },
//       { key: "Max Video Resolution", value: "4K UHD" },
//       { key: "ISO Range", value: "100-102400" },
//       { key: "Connectivity", value: "Wi-Fi, Bluetooth" }
//     ],
 
//     rating: "4.8",
//     isFeatured: true,
//     isHotDeal: true,
//     seoTitle: "Canon EOS R6 Full-Frame Mirrorless Camera Online",
//     seoKeywords: "Canon, EOS R6, Mirrorless Camera, Full-Frame, Photography",
   
  });
// const [product, setProduct] = useState({

//   name: "Horizon 49-X Super Ultrawide Productivity",
//   // image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600",
//   description: "The Horizon 49-X is the ultimate command center for professionals. Equivalent to two 27-inch QHD monitors side-by-side without the distracting bezel, this 32:9 curved masterpiece utilizes Quantum Dot technology to provide a color-accurate workspace that spans your entire field of vision.",
//   category: "Electronics",
//   brand: "Horizon Display",
//   sku: "HZ-49X-DQHD-26",
//   basePrice: "1499.00",
//   salePrice: "1249.00",
//   rating: "4.8",
//   stock: "15",
//   weight: "14.5",
//   dimensions: "1199 x 523 x 349 mm",
//   seoTitle: "Horizon 49-X | 49-inch 32:9 Curved Productivity Monitor",
//   seoKeywords: "ultrawide monitor, 49 inch monitor, productivity screen, curved display, dqhd",
//   features: [
//     "Dual QHD 5120x1440 Resolution: Experience massive screen real estate with a pixel density that ensures every line of code, spreadsheet cell, and video frame is rendered in sharp detail.",
//     "1800R Immersive Curvature: Carefully calibrated to match the natural arc of the human eye, reducing neck strain and peripheral distortion during long hours of multitasking.",
//     "KVM Switch & Picture-by-Picture: Control two separate computers (like a MacBook and a PC) using a single mouse and keyboard, with both desktops displayed simultaneously on screen.",
//     "90W USB-C Power Delivery: A single-cable solution that transmits video, high-speed data, and charges your professional laptop at full speed, eliminating desk clutter entirely.",
//     "Nano-IPS Black Technology: Achieves a 2000:1 contrast ratio, providing deep, inky blacks and vibrant 98% DCI-P3 color coverage for professional-grade photo and video editing."
//   ],
//   specs: [
//     { key: "Resolution", value: "5120 x 1440 (DQHD)" },
//     { key: "Aspect Ratio", value: "32:9 Super Ultrawide" },
//     { key: "Panel Type", value: "Nano-IPS with Quantum Dot" },
//     { key: "Refresh Rate", value: "144Hz (Overclockable)" },
//     { key: "Brightness", value: "600 nits (HDR600 Certified)" }
//   ],
//   isFeatured: true,
//   isHotDeal: false

// });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);

  // Handle file input
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "banner") {
        setBannerFile(file);
        setBannerPreview(reader.result);
      } else if (type === "gallery" && galleryPreview.length < 4) {
        setGalleryFiles(prev => [...prev, file]);
        setGalleryPreview(prev => [...prev, reader.result]);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  // Handle features/specs
  const handleAction = (type, action, index, field, val) => {
    const list = [...product[type]];
    if (action === "add") list.push(type === "features" ? "" : { key: "", value: "" });
    else if (action === "update") type === "features" ? (list[index] = val) : (list[index][field] = val);
    else if (action === "remove") list.splice(index, 1);
    setProduct({ ...product, [type]: list });
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure category is filled
    if (!product.category?.trim()) {
      alert("Category is required");
      return;
    }

    try {
      const formData = new FormData();
      if (bannerFile) formData.append("banner", bannerFile);
      galleryFiles.forEach(file => formData.append("gallery", file));
      formData.append("productData", JSON.stringify(product));

      dispatch(addProduct(formData))
        .unwrap()
        .then(res => {
          // alert("Product published successfully!");
          toast.success(res.message || "product added succesufully")
          setProduct({
            name: "",
            description: "",
            category: "",
            brand: "",
            sku: "",
            basePrice: "",
            salePrice: "",
            rating: "",
            stock: "",
            weight: "",
            dimensions: "",
            seoTitle: "",
            seoKeywords: "",
            features: [],
            specs: [],
            isFeatured: false,
            isHotDeal: false
          });
          setBannerFile(null);
          setBannerPreview(null);
          setGalleryFiles([]);
          setGalleryPreview([]);
        })
        .catch(err => 
          alert(err)
          // toast.error(.message || err || "fai to upload product")
        
        );
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex min-h-screen  font-['Poppins'] text-slate-800 antialiased pb-20">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8">
          <div className="grid grid-cols-12 gap-8 max-w-[1400px] mx-auto">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              <input type="file" hidden ref={bannerInputRef} onChange={e => handleFileChange(e, "banner")} />
              <input type="file" hidden ref={galleryInputRef} onChange={e => handleFileChange(e, "gallery")} />

              {/* 1. IMAGES */}
              <section className="bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] mb-4">Media Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div onClick={() => bannerInputRef.current.click()} className="md:col-span-3 aspect-video bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden rounded group relative">
                    {bannerPreview ? <img src={bannerPreview} className="w-full h-full object-cover" alt="Banner" /> : <MdCloudUpload size={30} className="text-slate-300"/>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {galleryPreview.map((img, i) => (
                      <div key={i} className="aspect-square bg-slate-100 relative group border border-slate-200">
                        <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                        <button onClick={() => {
                          setGalleryPreview(galleryPreview.filter((_, idx) => idx !== i));
                          setGalleryFiles(galleryFiles.filter((_, idx) => idx !== i));
                        }} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"><MdClose/></button>
                      </div>
                    ))}
                    {galleryPreview.length < 4 && (
                      <button onClick={() => galleryInputRef.current.click()} className="aspect-square border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-[#FF8200]"><MdAddCircleOutline size={24}/></button>
                    )}
                  </div>
                </div>
              </section>

              {/* 2. PRODUCT IDENTITY */}
              <section className="bg-white p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] border-b pb-4">Product Identity</h3>
                <Input label="Product Name" value={product.name} onChange={e=>setProduct({...product,name:e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Brand" value={product.brand} onChange={e=>setProduct({...product,brand:e.target.value})} />
                  <Input label="Category" value={product.category} onChange={e=>setProduct({...product,category:e.target.value})} />
                  <Input label="subCategory" value={product.subCategory} onChange={e=>setProduct({...product,subCategory:e.target.value})} />

                </div>
                <Input label="SKU / ID" value={product.sku} onChange={e=>setProduct({...product,sku:e.target.value})} />
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Description</label>
                  <textarea rows="4" value={product.description} onChange={e=>setProduct({...product,description:e.target.value})} className="w-full px-4 py-3 border border-slate-200 text-sm outline-none bg-white focus:ring-1 focus:ring-[#FF8200]" />
                </div>
              </section>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 shadow-sm border border-slate-200">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdStar className="text-[#FF8200]"/> Key Features</h3>
                  {product?.features.map((f,i)=>(
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input value={f} onChange={e=>handleAction('features','update',i,null,e.target.value)} className="w-full p-2 border-b border-slate-100 text-xs outline-none focus:border-[#FF8200]" placeholder="Feature..." />
                      <button onClick={()=>handleAction('features','remove',i)} className="text-slate-300"><MdClose/></button>
                    </div>
                  ))}
                  <button onClick={()=>handleAction('features','add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Bullet Point</button>
                </section>

                <section className="bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><MdSettings/> Technical Specs</h3>
                  {product.specs.map((s,i)=>(
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={s.key} onChange={e=>handleAction('specs','update',i,'key',e.target.value)} placeholder="Label" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
                      <input value={s.value} onChange={e=>handleAction('specs','update',i,'value',e.target.value)} placeholder="Value" className="w-1/2 p-2 bg-slate-50 text-[10px] outline-none" />
                    </div>
                  ))}
                  <button onClick={()=>handleAction('specs','add')} className="text-[10px] font-bold text-[#FF8200] uppercase mt-2">+ Add Parameter</button>
                </section>
              </div>

              {/* 3. VISIBILITY & MARKETING */}
              {/* <section className="bg-white p-6 shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Toggle label="Featured Product" description="Display on homepage" enabled={product.isFeatured} onChange={() => setProduct({...product, isFeatured: !product.isFeatured})} />
                  <Toggle label="Hot Deal" description="Include in flash sale" enabled={product.isHotDeal} onChange={() => setProduct({...product, isHotDeal: !product.isHotDeal})} />
                </div>
              </section> */}
              <section className="bg-white p-6 shadow-sm border border-slate-200">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><MdCampaign size={18}/> Visibility & Promotion</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Toggle 
                    label="Featured Product" 
                    description="Display this product in the homepage featured section"
                    enabled={product.isFeatured} 
                    onChange={() => setProduct({...product, isFeatured: !product.isFeatured})} 
                  />
                  <Toggle 
                    label="Hot Deal" 
                    description="Add a 'Hot' badge and include in flash sale carousels"
                    enabled={product.isHotDeal} 
                    onChange={() => setProduct({...product, isHotDeal: !product.isHotDeal})} 
                  />
                </div>
              </section>
              {/* 4. PRICING & STOCK */}
              <section className="bg-white p-6 shadow-sm border border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input label="Sale Price" value={product.salePrice} onChange={e=>setProduct({...product,salePrice:e.target.value})} />
                  <Input label="List Price" value={product.basePrice} onChange={e=>setProduct({...product,basePrice:e.target.value})} />
                  <Input label="Stock Qty" value={product.stock} onChange={e=>setProduct({...product,stock:e.target.value})} />
                  <Input label="Rating" type="number" value={product.rating} onChange={e=>setProduct({...product,rating:e.target.value})} />
                </div>
              </section>

              {/* PRODUCT PREVIEW */}
              <section className="bg-white p-6 shadow-sm border border-slate-200 mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF8200] mb-4">Product Preview</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p><strong>Name:</strong> {product.name || "-"}</p>
                  <p><strong>Category:</strong> {product.category || "-"}</p>
                  <p><strong>Brand:</strong> {product.brand || "-"}</p>
                  <p><strong>SKU:</strong> {product.sku || "-"}</p>
                  <p><strong>Price:</strong> {product.basePrice} / Sale: {product.salePrice}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Rating:</strong> {product.rating}</p>
                  <p><strong>Featured:</strong> {product.isFeatured ? "Yes" : "No"}</p>
                  <p><strong>Hot Deal:</strong> {product.isHotDeal ? "Yes" : "No"}</p>
                  <p><strong>Description:</strong> {product.description || "-"}</p>
                  <div className="flex gap-2 mt-2">
                    {bannerPreview && <img src={bannerPreview} alt="Banner Preview" className="w-24 h-16 object-cover border" />}
                    {galleryPreview.map((img, i) => (
                      <img key={i} src={img} alt={`Gallery Preview ${i}`} className="w-24 h-16 object-cover border" />
                    ))}
                  </div>
                </div>
              </section>

              {/* FINAL BUTTON */}
              <div className="pt-6">
                <button onClick={handleSubmit} className="w-full py-4 bg-[#FF8200] text-white rounded font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100">
              {loading ? (
    <>
      <Loader color="#fff" size={20} /> {/* show loader */}
      <span>Uploading...</span>          {/* change text */}
    </>
  ) : (
    <>
      <MdRocketLaunch size={20} />       {/* rocket icon */}
      <span>Publish Final Product</span> {/* normal text */}
    </>
  )}

                  
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;