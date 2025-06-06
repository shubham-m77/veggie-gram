import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import {ProductType} from '../context/AppContext';

const AllVeggies = () => {
     const {products,addToCart,searchQuery,cartItems,removeFromCart,navigate}=useAppContext();
        const [filteredProducts,setFilteredProducts]=useState<any>([]);
        useEffect(()=>{
            if(searchQuery.length>0){
                setFilteredProducts(products.filter((product: ProductType) => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
            }
            else{
                setFilteredProducts(products);
            }
        },[products,searchQuery])

  return (
    <div className='my-4 '>
      <div className='relative'><h2 className='text-2xl md:text-3xl font-medium'>VEGGIES</h2>
      <hr className='border-1 border-primary-dull w-[70px] absolute top-9'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 items-center justify-center  gap-4 lg:gap-7 my-8'>
        {filteredProducts.filter((product:ProductType)=>product.inStock)?.map((product:ProductType,idx:number)=>(
            <div key={idx}  className="border border-gray-500/20 gap-7 rounded-md md:px-4 px-3 py-2 bg-gray-50 w-full">
            <div onClick={() => navigate(`/veggies/${product.category.toLowerCase()}/${product._id}`)} className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.images[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                    ₹{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">₹{product.price}</span>
                    </p>
                    <div className="text-primary ">
                        {!cartItems[product._id]? (
                            <button className="cursor-pointer bg-bg flex items-center transition ease-in hover:scale-95 justify-center gap-1 hover:bg-primary-dull border border-secondary md:w-[80px] w-[64px] h-[34px] rounded text-gray-900 font-medium" onClick={() => addToCart(product._id)} >
                                <svg width="14" height="14" className='' viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" className='stroke-gray-900' stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
           )
        )}
        
      </div>
      {/* <h2 className='text-center text-3xl'>No Product's Found!</h2> */}
    </div>
  )
}

export default AllVeggies
