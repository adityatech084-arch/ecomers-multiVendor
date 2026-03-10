import React from 'react'

function ForgetPassword() {

const handelChange = (e) => {
  // setFormData({...formData,[e.target.name]:e.target.value})
}   
const handleSubmit = (e) => {
  e.preventDefault();
}

  return (
    <>
<main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-2xl font-semibold tracking-tight mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access your account.</p>
          </div>

    

      

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-300"
                onChange={handelChange}
                name="email"
                required
              />
            </div>

        
            <div className="pt-2">
              <button 
                type="submit"
                // disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-[0.96]"
              >
                {/* {
   isLoggingIn &&
                
                                <ColorRing
visible={true}
height="26"
width="26"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
  colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
/>
} */}
    
                Send Reset Link
              </button>
            </div>
          </form>

         
        </div>
      </main>

    </>
  )
}

export default ForgetPassword
