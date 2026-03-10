import React from 'react'

function AuthLayout({children}) {
  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center '>
      {children}
    </div>
  )
}

export default AuthLayout
