import React, { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/Order'
import Layout from './pages/Layout'
import "react-toastify/dist/ReactToastify.css";

import AddProduct from './pages/AddProduct'
// import Category from './pages/Category'
// import CategoryManager from './pages/Category'
// import CategoryConsole from './pages/Category'
import CategoryTree from './pages/Category'
import SignUp from './authPages/SignUp'
import AuthLayout from './authPages/AuthLayout'
import StoreSuccess from './components/bitComponents/StoreSuccess'
import VerifyOtp from './authPages/VerifyOtp'
import PreLoader from './components/bitComponents/PreLoader'
import {useDispatch, useSelector} from "react-redux";
import { checkAuth } from './features/auth/authSlice'
import { AuthProtector, PublicProtector } from './protector/AppProtector'
import Login from './authPages/Login'
import { ToastContainer } from 'react-toastify'
function App() {
 const dispatch = useDispatch();
 const {authChecked,authUser} = useSelector(state=>state.auth);
  useEffect(() => {
    if (!authChecked) {
      dispatch(checkAuth()); // run only once on app load
    }
  }, [dispatch, authChecked]);

  // Show PreLoader only **once on app load**
  if (!authChecked) return <PreLoader />;



  return (
   
    <>
    {/* <PreLoader/> */}
    <ToastContainer         position="top-right"          // top-right | top-left | top-center | bottom-right | bottom-left | bottom-center
        autoClose={3000}              // Auto close after 3 seconds
        hideProgressBar={false}       // Progress bar show kare ya nahi
        newestOnTop={true}            // New toast upar aaye
        closeOnClick                  // Click karne pe close ho
        rtl={false}                   // Right-to-left support
        pauseOnFocusLoss              // Tab change pe pause
        draggable                     // Drag karke close kar sakte ho
        pauseOnHover                  // Hover pe timer pause
        theme="colored"               // light | dark | colored
        limit={3}                     />
    <Routes>
     <Route path="/auth" element={<AuthLayout />}>
    
    {/* 2. Nested Protector ensures logic applies to all children */}
    <Route element={<PublicProtector />}>
      {/* 3. The actual pages */}
      <Route index element={<SignUp />} />
      <Route path='verify-otp'element={<VerifyOtp/>}/>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
    </Route>

  </Route>
  <Route element={<AuthProtector/>}>
      <Route path='/store-sucess'element={<StoreSuccess/>}/>
      <Route path='/'element={ <Layout/>}>

      <Route index element={<Dashboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

      
      <Route path='/order'element={<Order/>}/>
      <Route path='/add-product'element={ <AddProduct/>}/>
      <Route path='/category'element={<CategoryTree/>}/>
      </Route>
      </Route>
    </Routes>
    {/* <Dashboard/> */}
    </>
  )
}

export default App
