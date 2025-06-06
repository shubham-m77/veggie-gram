import {assets} from "../assets/images/assets"
import { Link } from 'react-router-dom'

const HomeBanner = () => {
  return (
    <div className='my-4 relative'>
      <img src={assets.main_banner_bg} alt="Home_banner" className='w-full hidden md:block'/>
      <img src={assets.main_banner_bg_sm} alt="Home_banner" className='w-full md:hidden' />
    <div className='absolute inset-0 flex flex-col md:items-start items-center justify-end md:justify-center pb-10 sm:pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-85 lg:max-w-120 leading-tight lg:leading-15 text-gray-800'>Fresh from the Fields, Fast to Your Door!</h1>
      
      <div className='flex items-center mt-6 font-medium gap-3'><Link to={"/veggies"} className='group flex items-center gap-2 px-4 md:px-6 py-2 bg-secondary hover:bg-primary transition rounded-4xl text-white cursor-pointer'>Shop Now <img src={assets.white_arrow_icon}  className="md:hidden transition group-hover:translate-x-1 " alt="shop" /></Link>
     <Link to={"/veggies"} className='group flex items-center gap-2 px-4 md:px-6 py-2 outline-[2px] hover:outline-primary outline-primary-dull transition rounded-full text-black cursor-pointer hidden md:flex'>Explore Top Deals <img src={assets.black_arrow_icon} alt="shop" className='transition group-hover:translate-x-1'/></Link>
     </div></div>
</div>
 

  )
}

export default HomeBanner
