import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export function AuthProtector() {
    const {authUser ,isCheckingAuth}= useSelector(state=>state.auth);
    if (isCheckingAuth) {
    return <div>Loading...</div>; 
  }
  return (
    authUser ? <Outlet/> : <Navigate to="/login"/>
  )
}





export function PublicProtector (){
    const {authUser} = useSelector(state=>state.auth);
    return(
     authUser ? <Navigate to={"/profile"}/> : <Outlet/>
    )
}