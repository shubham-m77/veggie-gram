import { categories } from '../assets/images/assets'
import { useAppContext } from '../context/AppContext'
const Categories = () => {
    const {navigate}=useAppContext();
  return (
    <div>
      <div className='relative'><p className='font-medium text-xl md:text-2xl my-8 '>CATEGORIES </p>
      <hr className='absolute w-[70px] border-1 top-8 border-primary-dull'/></div>
      <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 items-center justify-center gap-4 md:gap-7 mt-6'>
            {categories.map((cat,idx)=>( 
                <div onClick={()=>{navigate(`/veggies/${cat.path.toLowerCase()}`);scrollTo(0,0)}} className='bg-primary-dull flex flex-col items-center justify-center rounded-lg group cursor-pointer ' key={idx}>
                <img src={cat.image} alt={cat.text} className='group-hover:scale-105 transition ease-in-out' />
                <p className='font-medium bg-gray-100 w-full text-center rounded-b-lg p-1 leading-4.5 md:leading-6'>{cat.text}</p>
                </div>
           
            ))}
      </div>
    </div>
  )
}

export default Categories
