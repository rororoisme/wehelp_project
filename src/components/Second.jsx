import React from 'react';

const Second = () => {


    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4' src="pic/friends.png" />
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>陪</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>好友功能</h1>
                    <p className='md:text-2xl text-xl font-bold my-4 text-gray-500'>
                        利用會員系統加強好友間的聯繫。<br/>
                        透過互相監督，讓達成目標的過程變得更加輕鬆愉快。<br/>
                        與朋友一起，向成功邁進！
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Second