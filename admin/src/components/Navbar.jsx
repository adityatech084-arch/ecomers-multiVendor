import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-black flex items-center justify-between px-4.5 py-2.5'>
        <div className='logo text-2xl'>
            <span className='text-2xl font-Poppins text-white font-semibold'>
                Eco
            </span>
            <span className='text-2xl font-Poppins text-purple-600 font-semibold'>
                mart
            </span>
        </div>


<div className='menu-items'>
    <ul>
        <li className=' inline-block list-none'><Link to={"/"} className='font-Poppins font-semibold text-white text-sm flex px-3 py-2'>Questions</Link></li>
        <li className=' inline-block list-none'><Link to={"/"} className='font-Poppins text-white font-semibold text-sm flex px-3 py-2'>Doc</Link></li>

        
    </ul>
</div>

      
    </div>
  )
}

export default Navbar
