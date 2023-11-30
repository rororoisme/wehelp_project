import React from 'react';

const Fourth = () => {


    return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4' src="pic/big.png" />
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>皿</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>版面配置</h1>
                    <p className='md:text-2xl text-xl font-bold my-4 text-gray-500'>
                        將「皿」字的簡潔設計融入使用界面，<br/>
                        我們的頁面都是三格格子組成的。<br/>
                        簡單高效，沒有廢話。<br/>
                        這就是我們的科學精神！
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Fourth