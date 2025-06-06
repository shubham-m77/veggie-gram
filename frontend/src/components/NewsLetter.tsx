    import React from 'react'

    const NewsLetter = () => {
    return (
        <div className='my-8 md:my-10 lg:my-12 flex items-center justify-center flex-col'>
        <h2 className='text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900'>Stay Updated!</h2>
        <h4 className='text-sm md:text-md lg:text-lg text-gray-700/70'>Get the latest offers, seasonal arrivals, and discounts—straight to your inbox.</h4>
        
        <div className='relative mt-4 group w-[230px] sm:w-[270px] md:w-[300px] lg:w-[450px]  h-[40px] flex items-center justify-center'>
            <input type="text" placeholder='' className='input transition-all peer h-[40px] px-2 py-1 w-[80%] sm:w-[90%] outline-none border-1 border-r-0 rounded-l border-primary-dull'/>
            <label htmlFor="email" className="absolute text-sm text-gray-500 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-80 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text">Email Address</label>
        <button className='bg-secondary hover:bg-primary py-1 px-2 lg:px-4 rounded-r cursor-pointer h-[40px] text-sm md:text-md'>Subscribe</button>
        </div>

        </div>
    )
    }

    export default NewsLetter
