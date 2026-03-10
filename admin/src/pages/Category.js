// import React, { useEffect, useState } from 'react';
// import { 
//   MdKeyboardArrowDown, MdKeyboardArrowRight, 
//   MdAdd, MdEdit, MdDeleteOutline, MdClose,
//   MdArrowForward
// } from 'react-icons/md';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   fetchCategories, addCategory, addSubcategory, 
//   updateCategory, deleteCategory, updateSubcategory, deleteSubcategory
// } from '../features/category/categorySlice';

// const CategoryTree = () => {
//   const dispatch = useDispatch();
//   const { categories, loading } = useSelector(state => state.category);

//   const [activeParent, setActiveParent] = useState(null);
//   const [editingNode, setEditingNode] = useState(null);
//   const [inputValue, setInputValue] = useState("");
//   const [expanded, setExpanded] = useState([]);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const toggle = (id) => {
//     setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!inputValue) return;

//     if (editingNode) {
//       // Editing a category or subcategory
//       if (editingNode.parentId) {
//         // Subcategory
//         dispatch(updateSubcategory({ 
//           categoryId: editingNode.parentId, 
//           subcategoryId: editingNode._id, 
//           name: inputValue 
//         }));
//       } else {
//         // Top-level category
//         dispatch(updateCategory({ id: editingNode._id, name: inputValue }));
//       }
//     } else if (activeParent) {
//       // Add subcategory
//       dispatch(addSubcategory({ categoryId: activeParent._id, name: inputValue }));
//       setExpanded(prev => [...prev, activeParent._id]); // auto-expand parent
//     } else {
//       // Add top-level category
//       dispatch(addCategory({ name: inputValue }));
//     }

//     setInputValue("");
//     setActiveParent(null);
//     setEditingNode(null);
//   };

//   const handleDelete = (node, parentId = null) => {
//     if (parentId) {
//       dispatch(deleteSubcategory({ categoryId: parentId, subcategoryId: node._id }));
//     } else {
//       dispatch(deleteCategory(node._id));
//     }
//   };

//   const RenderNode = ({ node, depth = 0, parentId = null }) => {
//     const isExpanded = expanded.includes(node._id);
//     const isActive = activeParent?._id === node._id || editingNode?._id === node._id;

//     return (
//       <div className="w-full" key={node._id}>
//         <div 
//           className={`flex items-center justify-between py-2.5 px-6 transition-colors group ${
//             isActive ? 'bg-slate-100' : 'hover:bg-slate-50'
//           }`}
//           style={{ paddingLeft: `${depth * 24 + 24}px` }}
//         >
//           <div className="flex items-center gap-4">
//             <button onClick={() => toggle(node._id)} className="text-black">
//               {node.subcategories?.length > 0 ? (
//                 isExpanded ? <MdKeyboardArrowDown size={24}/> : <MdKeyboardArrowRight size={24}/>
//               ) : <div className="w-6" />}
//             </button>
//             <span className={`text-lg font-medium tracking-tight ${isActive ? 'text-black' : 'text-slate-600'}`}>
//               {node.name}
//             </span>
//           </div>

//           <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
//             <button onClick={() => { setActiveParent(node); setEditingNode(null); setInputValue(""); }} 
//               className="text-xs font-bold text-black border-b-2 border-black pb-0.5">
//               Add
//             </button>
//             <button onClick={() => { setEditingNode({ ...node, parentId }); setInputValue(node.name); setActiveParent(null); }}
//               className="text-slate-400 hover:text-black"><MdEdit size={20}/></button>
//             <button onClick={() => handleDelete(node, parentId)} className="text-slate-300 hover:text-red-500"><MdDeleteOutline size={22}/></button>
//           </div>
//         </div>
//         <div className="mx-6 border-b border-slate-100" />

//         {isExpanded && node.subcategories?.length > 0 && (
//           <div className="bg-white">
//             {node.subcategories.map(child => (
//               <RenderNode key={child._id} node={child} depth={depth + 1} parentId={node._id} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) return <p className="p-6 text-center">Loading categories...</p>;

//   return (
//     <div className="mx-1 font-['Inter',sans-serif] text-black">
//       <header className="p-6 md:px-12 md:py-8 border-b border-slate-100">
//         <h1 className="text-3xl font-bold tracking-tighter">Categories</h1>
//         <p className="text-slate-500 text-sm mt-1">Manage your service hierarchy</p>
//       </header>

//       <div className="flex flex-col md:flex-row mx-auto gap-3">
//         {/* TREE LIST */}
//         <div className="flex-1 md:border-r border-slate-100 pb-40 md:pb-0">
//           <div className="py-2">
//             {categories.map(cat => <RenderNode key={cat._id} node={cat} />)}
//             <button 
//               onClick={() => {setActiveParent(null); setEditingNode(null); setInputValue("");}}
//               className="w-full text-left px-6 py-2.5 text-slate-400 font-medium hover:text-black transition-colors"
//             >
//                 + Add root category
//             </button>
//           </div>
//         </div>

//         {/* STICKY INPUT CARD */}
//         <div className="fixed bottom-0 border border-gray-200 left-0 w-full b md:relative md:w-[450px] z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] md:shadow-none">
//           <div className="p-4 md:p-4 md:sticky md:top-0">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-xl font-bold">
//                 {editingNode ? "Edit item" : activeParent ? `New in ${activeParent.name}` : "New category"}
//               </h2>
//               {(editingNode || activeParent) && (
//                 <button onClick={() => {setEditingNode(null); setActiveParent(null); setInputValue("");}} className="p-2 bg-slate-100 rounded-full">
//                   <MdClose size={20} />
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <span className="text-sm py-2 flex font-semibold font-Poppins text-slate-800">Category Name</span>
//                 <input 
//                   autoFocus
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   className="w-full bg-slate-100 border-none py-2 px-4.5 text-lg outline-none focus:ring-2 focus:ring-black transition-all rounded-sm"
//                   placeholder="e.g. Electronics"
//                 />
//               </div>

//               <button 
//                 type="submit"
//                 className="w-full bg-black text-white py-4 px-6 rounded-sm font-bold flex items-center justify-between group hover:bg-slate-800 transition-all"
//               >
//                 <span>{editingNode ? "Save changes" : "Confirm addition"}</span>
//                 <MdArrowForward size={24} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CategoryTree;


import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdEdit,
  MdDeleteOutline,
  MdClose,
  MdArrowForward,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
  updateCategory,
  deleteCategory,
  updateSubcategory,
  deleteSubcategory,
  addCategoryLocal,
  addSubcategoryLocal,
  updateCategoryLocal,
  updateSubcategoryLocal,
} from "../features/category/categorySlice";
import Loader from "../components/bitComponents/Loader";
import Empty from "../components/bitComponents/Empty";

const CategoryTree = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const [activeParent, setActiveParent] = useState(null);
  const [editingNode, setEditingNode] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [expanded, setExpanded] = useState([]);

  // console.log(expanded)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggle = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!inputValue) return;

  //   const slug = inputValue.toLowerCase().replace(/\s+/g, "-");

  //   if (editingNode) {
  //     // Editing category or subcategory
  //     if (editingNode.parentId) {
  //       dispatch(
  //         updateSubcategory({
  //           categoryId: editingNode.parentId,
  //           subcategoryId: editingNode._id,
  //           name: inputValue,
  //           slug,
  //         })
  //       );
  //     } else {
  //       dispatch(updateCategory({ id: editingNode._id, name: inputValue, slug }));
  //     }
  //   } else if (activeParent) {
  //     // Add subcategory
  //     dispatch(
  //       addSubcategory({
  //         categoryId: activeParent._id,
  //         name: inputValue,
  //         slug,
  //       })
  //     );
  //     setExpanded((prev) => [...prev, activeParent._id]); // auto-expand parent
  //   } else {
  //     // Add top-level category
  //     dispatch(addCategory({ name: inputValue, slug }));
  //   }

  //   setInputValue("");
  //   setActiveParent(null);
  //   setEditingNode(null);
  // };
const handleSubmit = (e) => {
  e.preventDefault();
  if (!inputValue) return;

  const slug = inputValue.toLowerCase().replace(/\s+/g, "-");

  if (editingNode) {
    if (editingNode.parentId) {
      // Update subcategory locally first
      const updatedSub = { ...editingNode, name: inputValue, slug };
      dispatch(updateSubcategoryLocal({ categoryId: editingNode.parentId, subcategory: updatedSub }));

      // Then call server
      dispatch(updateSubcategory({
        categoryId: editingNode.parentId,
        subcategoryId: editingNode._id,
        name: inputValue,
        slug,
      }));
    } else {
      // Update category locally first
      const updatedCat = { ...editingNode, name: inputValue, slug };
      dispatch(updateCategoryLocal(updatedCat));

      // Then call server
      dispatch(updateCategory({ id: editingNode._id, name: inputValue, slug }));
    }
  } else if (activeParent) {
    // Add subcategory locally first
    const newSub = {
      _id: Date.now().toString(), // temporary ID
      name: inputValue,
      slug,
      subcategories: [],
    };
    dispatch(addSubcategoryLocal({ categoryId: activeParent._id, subcategory: newSub }));

    // Then call server
    dispatch(addSubcategory({
      categoryId: activeParent._id,
      name: inputValue,
      slug,
    }));

    setExpanded((prev) => [...prev, activeParent._id]); // auto-expand
  } else {
   const tempId = "temp-" + Date.now();

dispatch(addCategoryLocal({
  _id: tempId,
  name: inputValue,
  slug,
  subcategories: []
}));

dispatch(addCategory({
  name: inputValue,
  slug,
  tempId
}));
  }

  // Reset form
  setInputValue("");
  setActiveParent(null);
  setEditingNode(null);
};
  const handleDelete = (node, parentId = null) => {
    if (parentId) {
      dispatch(deleteSubcategory({ categoryId: parentId, subcategoryId: node._id }));
    } else {
      dispatch(deleteCategory(node._id));
    }
  };

  const RenderNode = ({ node, depth = 0, parentId = null }) => {
    const isExpanded = expanded.includes(node._id);
    const isActive = activeParent?._id === node._id || editingNode?._id === node._id;

    return (
      <div className="w-full" key={node._id}>
        <div
          className={`flex items-center justify-between border border-gray-200 py-2.5 px-6 transition-colors group ${
            isActive ? "bg-slate-100" : "hover:bg-slate-50"
          }`}
          style={{ paddingLeft: `${depth * 24 + 24}px` }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => toggle(node._id)} className="text-black">
              {node.subcategories?.length > 0 ? (
                isExpanded ? (
                  <MdKeyboardArrowDown size={24} />
                ) : (
                  <MdKeyboardArrowRight size={24} />
                )
              ) : (
                <div className="w-6" />
              )}
            </button>
            <span
              className={`text-lg font-medium tracking-tight ${
                isActive ? "text-black" : "text-slate-600"
              }`}
            >
              {node.name}
            </span>
          </div>

          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                setActiveParent(node);
                setEditingNode(null);
                setInputValue("");
              }}
              className="text-xs font-bold text-black border-b-2 border-black pb-0.5"
            >
              Add
            </button>
            <button
              onClick={() => {
                setEditingNode({ ...node, parentId });
                setInputValue(node.name);
                setActiveParent(null);
              }}
              className="text-slate-400 hover:text-black"
            >
              <MdEdit size={20} />
            </button>
            <button
              onClick={() => handleDelete(node, parentId)}
              className="text-slate-300 hover:text-red-500"
            >
              <MdDeleteOutline size={22} />
            </button>
          </div>
        </div>
        <div className="mx-6 border-b border-slate-100" />

        {isExpanded && node.subcategories?.length > 0 && (
          <div className="bg-gray-100">
            {node.subcategories.map((child) => (
              <RenderNode
                key={child._id}
                node={child}
                depth={depth + 1}
                parentId={node._id}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="p-6 text-center flex items-center justify-center flex-1"><Loader color={"#000000"} size={50}/></div>;

  return (
    <div className="mx-1 font-['Inter',sans-serif] text-black">
      <header className="p-6 md:px-12 md:py-8  border-slate-100">
        <h1 className="text-3xl font-bold tracking-tighter">Categories</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your service hierarchy</p>
      </header>

      <div className="flex flex-col md:flex-row mx-auto gap-3 px-6">
        {/* TREE LIST */}
        <div className="flex-1 md:border-r border-slate-100 pb-40 md:pb-0">
          <div className="">
          {(!categories || categories.length === 0) && <Empty />}
            {categories.map((cat) => (
              <RenderNode key={cat._id} node={cat} />
            ))}
            <button
              onClick={() => {
                setActiveParent(null);
                setEditingNode(null);
                setInputValue("");
              }}
              className="w-full text-left px-6 py-2.5 text-slate-400 font-medium hover:text-black transition-colors"
            >
              + Add root category
            </button>
          </div>
        </div>

        {/* STICKY INPUT CARD */}
        <div className="fixed bottom-0 border h-fit border-gray-200 left-0 w-full b md:relative md:w-[450px] z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] md:shadow-none">
          <div className="p-4 md:p-4 md:sticky md:top-0">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">
                {editingNode
                  ? "Edit item"
                  : activeParent
                  ? `New in ${activeParent.name}`
                  : "New category"}
              </h2>
              {(editingNode || activeParent) && (
                <button
                  onClick={() => {
                    setEditingNode(null);
                    setActiveParent(null);
                    setInputValue("");
                  }}
                  className="p-2 bg-slate-100 rounded-full"
                >
                  <MdClose size={20} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 h-fit">
              <div className="space-y-2">
                <span className="text-sm py-2 flex font-semibold font-Poppins text-slate-800">
                  Category Name
                </span>
                <input
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-slate-100 border-none py-2 px-4.5 text-lg outline-none focus:ring-2 focus:ring-black transition-all rounded-sm"
                  placeholder="e.g. Electronics"
                />
              </div>

              <button
                type="submit"
                className="w-full  bg-black text-white py-4 px-6 rounded-sm font-bold flex items-center justify-center gap-5 group hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-2">
                {
                  loading && <Loader/>
                }
                <span>{editingNode ? "Save changes" : "Confirm addition"}</span>
                </div>
                <MdArrowForward
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTree;