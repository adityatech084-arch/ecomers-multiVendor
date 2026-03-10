import React, { useEffect } from 'react'
import ProductCard from '../ProductCard'
import ProductFilter from '../ProductFilter'
import {useDispatch ,useSelector} from "react-redux";
import { getStarterProducts } from '../../features/productSlice';
import Loader from './Loader';
function StarterProducts() {
   const dispatch = useDispatch();
   const {starterProduct ,loading} = useSelector(state=>state.product);
    // useEffect(()=>{
    // dispatch(getStarterProducts());
    // },[dispatch]);

    // console.log(starterProduct)

  return (
    <>
    
    
        <ProductFilter/>

             {loading ? (
                 <div className="flex-1 my-3 min-h-60 flex items-center justify-center bg-gray-100 w-full">
      <Loader color="#000" size={28} />
    </div>
  ) : (
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
        {
   starterProduct.map((product,idx)=>{
    return(
        <ProductCard product={product} index={idx} key={idx}/>
    )
})
}
</div>
  )}

    
    
    
    
    </>
  )
}

export default StarterProducts
