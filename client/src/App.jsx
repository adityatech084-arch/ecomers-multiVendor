import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shope'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Categories from './pages/Categories'
import Footer from './components/Footer'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import ForgetPassword from './authPages/ForgetPassword'
import Login from './authPages/Login'
import Signup from './authPages/Signup'
// import VendorShowcaseCard from './components/biteComponents/VendorShowcaseCard'
import VendorStore from './pages/VendorStore'
import StorePage from './pages/Stores'
import VerifyOtp from './authPages/VerifyOtp'
import AuthLayout from './authPages/AuthLayout'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './features/authSlice'
import Loader from './components/biteComponents/Loader'
import PreLoader from './components/biteComponents/PreLoader'
import SearchModal from './components/SearchModel'
import { toggleSearchModel } from './features/toggleSlice'
import ProfilePage from './pages/ProfilePage'
import { AuthProtector, PublicProtector } from './Protector/Protect'


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
const {authUser,isCheckingAuth} = useSelector(state=>state.auth);
const {searchModel}= useSelector(state=>state.toggle)
useEffect(()=>{
dispatch(checkAuth())
},[dispatch])
  useEffect(()=>{
window.scrollTo({
  top:0,
  behavior:'smooth'
})
  },[location.pathname])


if(isCheckingAuth){

  return <PreLoader/>
}



  return (
  <>
{searchModel && <SearchModal isOpen={searchModel} onClose={toggleSearchModel}/>}
<ToastContainer />
  <Navbar/>
  <div className='w-full bg-gray-50 ' >
<div className=' mx-auto px-2 py-3 '>
  {/* <SearchModal/> */}
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/shop' element={<Shop/>}/>
  <Route path='/product/:id' element={<ProductDetails/>}/>
  <Route path='/cart' element={<Cart/>}/>
  
  {/* <Route path='/category/:vendorId' element={<Categories/>}/> */}
  <Route path='/wishlist' element={<Wishlist/>}/>
  {/* <Route path='/profile'element={<Profile/>}/> */}
  <Route element={<PublicProtector />}>
  <Route path='/forget-pass'element={<ForgetPassword/>}/>
  <Route path='/login'element={<Login/>}/>
  <Route path='/signup'element={<Signup/>}/>
  </Route>
  

  <Route path='/vendor-store/:vendorId'element={<VendorStore/>}/>
  <Route path='/stores'element={<StorePage/>}/>
  <Route path='/verify-otp'element={<AuthLayout><VerifyOtp/></AuthLayout>}/>
  <Route element={<AuthProtector/>}>
  <Route path='/category/:vendorId' element={<Categories/>}/>
  
  <Route path='/profile'element={<ProfilePage/>}/>
  </Route>


 </Routes>
</div>
  </div>
  {/* <VendorShowcaseCard/> */}
  <Footer/>
  </>
  )
}

export default App
