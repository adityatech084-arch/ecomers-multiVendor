import React from 'react'
import AuthLayout from '../authPages/AuthLayout'
import Login from '../authPages/Login'
import ForgetPassword from '../authPages/ForgetPassword'
import VerifyOtp from '../authPages/VerifyOtp'
import Signup from '../authPages/Signup'

function Profile() {
  return (
    <div>
        <AuthLayout>
      {/* <Login/> */}
      {/* <ForgetPassword/> */}
      {/* <VerifyOtp/> */}
      <Signup/>
        </AuthLayout>
      
    </div>
  )
}

export default Profile
