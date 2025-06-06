import React from 'react'
import { assets, features } from '../assets/images/assets'

const FeatureBanner = () => {
  return (
    <div className='my-15 rounded bg-bg w-full p-4 lg:py-12'>
        <div className="flex justify-around flex-col lg:flex-row">
            <div className=" relative">
                <img src={assets.feature_bg_1} className='w-full rounded-xl sm:rounded-t-xl sm:rounded-b-none lg:w-auto lg:h-100  lg:rounded-xl' alt="feature_banner_1" />
                <div className="absolute"></div>
            </div>
            <div className=" relative hidden sm:block">
            <img src={assets.feature_bg_2} className=' w-full lg:h-100 rounded-b-xl lg:rounded-xl' alt="feature_banner_2" />
            <div className="absolute gap-y-1 inset-0 flex flex-col items-end top-3 lg:top-5 px-2 lg:px-4">
                <div className='flex flex-col  w-full px-2 xl:px-5 justify-center sm:mb-17 lg:mb-7'>
                    <h2 className='sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-primary relative'>Farm-to-Home Freshness</h2>
                    <hr className='w-100 absolute sm:top-12 lg:top-9 border-primary-dull border-1'/>
                    <p className='bg-gray-100/10 backdrop-blur-xs rounded  md:bg-none sm:text-xl font-medium lg:text-lg sm:mt-4 lg:mt-2 text-gray-400 md:text-green-700/70 leading-4 sm:leading-4.5 lg:leading-5'>Sourced directly from local farms and delivered to your doorstep with zero middlemen.</p>
                </div>
                {features.map((feature,index)=>(
                    <div className='flex sm:w-60 lg:w-70 xl:w-80 sm:mt-3 md:mt-5  lg:mt-7' key={index}>
                        <div className="flex flex-row gap-x-1 md:gap-x-2 items-center justify-center sm:pl-0 lg:pl-9"><img src={feature.icon} className="  lg:w-[30px] xl:w-[40px]" alt="features" />
                        <h4 className='sm:text-sm md:text-md lg:text-base xl:text-md font-semibold text-bg leading-3 sm:leading-4.5 lg:leading-5'>{feature.title} </h4></div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default FeatureBanner
