import React from 'react';
import Typed from 'react-typed';

const Main = () => {


    function toLogin() {
        window.location.href = '/login';
    }

    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2'>與好友一起 打卡、行事曆、番茄鐘</p>
                {/* RWD 讓字體縮放有不同大小 */}
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>陪養皿</h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>戒掉那些</p>
                    {/* Typed 套件裡面的特效, 注意語法大小括號 */}
                    <Typed 
                    className='md:text-5xl sm:text-4xl text-xl font-bold p-2'
                    strings={['拖延症', '半途而廢', '三分鐘熱度']} typeSpeed={120} backSpeed={140} loop
                    />
                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500' >準備好了嗎...</p>
                {/* 注意在 tailwind下 預設的button標籤特性 */}
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={toLogin}>開始!</button>
            </div>
        </div>
    )
}

export default Main