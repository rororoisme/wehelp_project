import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNavbar = () => {
        setNav(!nav)
    }

    function toSignup() {
        window.location.href = '/signup';
    }
    
    function toLogin() {
        window.location.href = '/login';
    }

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240x] mx-auto px-4 text-white'>
            <h1 className='w-full text-3xl font-bold text-[#00df9a]'>陪養皿</h1>
            {/* RWD, 小的時候hidden, 套用下方那個點 menu的效果 */}
            <ul className='hidden md:flex'>
                    <li className='p-4 hover:bg-gray-500 cursor-pointer' onClick={toSignup}>SignUp</li>
                    <li className='p-4 hover:bg-gray-500 cursor-pointer' onClick={toLogin}>Login</li>
            </ul>
            <div onClick={handleNavbar} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
            </div>
            {/* 如果nav不存在, 套用效果(ease-in-out讓nav更有出現特效) */}
            <div className={nav ? 'fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>陪養皿</h1>
                <ul className='uppercase p-4'>
                    <li className='p-4 border-b border-gray-600 hover:bg-gray-500 cursor-pointer' onClick={toSignup}>SignUp</li>
                    <li className='p-4 border-b border-gray-600 hover:bg-gray-500 cursor-pointer' onClick={toLogin}>LogIn</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar