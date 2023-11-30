import React from 'react';

const Third = () => {


    return (
        <div className='w-full bg-black py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>養</p>
                    <h1 className='text-white md:text-4xl sm:text-3xl text-2xl font-bold py-2'>番茄鐘功能</h1>
                    <p className='md:text-2xl text-xl font-bold my-4 text-gray-500'>
                        專為提升時間管理設計的番茄鐘。<br/>
                        每位會員都是一名小小的生物學家！<br/>
                        每當你完成一個番茄鐘，就會在你的行事曆上留下細菌圖樣的打卡紀錄。<br/>
                        讓花費的時間一目瞭然，有效追蹤進度。<br/>
                    </p>
                </div>
                <img className='w-[500px] mx-auto my-4' src="pic/man.png" />
            </div>
        </div>
    )
}

export default Third