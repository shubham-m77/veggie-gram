import { useEffect, useState } from 'react'
import { ProductType, useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { FaCartArrowDown,FaArrowUp  } from "react-icons/fa6";

const ProductOverview = () => {
         const {products,navigate,addToCart,cartItems,removeFromCart}=useAppContext();
    const {id}=useParams();
    const product=products.find((item:any)=>item._id===id);
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
    const [thumbnail, setThumbnail] = useState(product?.images[0]);

    useEffect(()=>{
        if(products.length>0){
            let related=products.slice();
            related=related.filter((item:any)=>item.category==product?.category);
            setRelatedProducts(related.slice(0,5));
        }
    },[products]);
    useEffect(() => {
        setThumbnail(product?.images[0]);
    }, [product]);
  return (
    <div className='my-4'>
 {product && (
    <div className="">
<div className="flex flex-wrap items-center space-x-2 text-sm text-gray-500 font-medium">
<Link to={`/`}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7.609c.352 0 .69.122.96.343l.111.1 6.25 6.25v.001a1.5 1.5 0 0 1 .445 1.071v7.5a.89.89 0 0 1-.891.891H9.125a.89.89 0 0 1-.89-.89v-7.5l.006-.149a1.5 1.5 0 0 1 .337-.813l.1-.11 6.25-6.25c.285-.285.67-.444 1.072-.444Zm5.984 7.876L16 9.5l-5.984 5.985v6.499h11.968z" fill="#475569" stroke="#475569" stroke-width=".094"/>
        </svg>
    </Link>
    
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <Link to={`/veggies`}>Veggies</Link>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <Link to={`/veggies/${product.category.toLowerCase()}`}>{product.category}</Link>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <Link to={`/veggies/${product.category.toLowerCase()}/${product.name.toLowerCase()}`} className="text-primary">{product.name}</Link>
</div>  
        <div className="flex flex-col md:flex-row gap-16 mt-4">
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    {product.images.map((image:any, index:number) => (
                        <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                            <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                    <img src={thumbnail} alt="Selected product" />
                </div>
            </div>

            <div className="text-sm w-full md:w-1/2">
                <h1 className="text-3xl font-medium">{product.name}</h1>

                <div className="flex items-center gap-0.5 mt-1">
                    {Array(5).fill('').map((_, i) => (
                       
                        <img src={i>4?assets.star_icon:assets.star_dull_icon} alt="Star" className="w-4 h-4" />
                        
                    ))}
                   
                </div>

                <div className="mt-6">
                    <p className="text-gray-500/70 line-through">MRP: 
                    ₹{product.price}</p>
                    <p className="text-2xl font-medium">MRP: 
                    ₹{product.offerPrice}</p>
                    <span className="text-gray-500/70">(inclusive of all taxes)</span>
                </div>

                <p className="text-base font-medium mt-6">About Product</p>
                <ul className="list-disc ml-4 text-gray-500/70">
                    {product.description.map((desc:any, index:number) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>

                <div className="flex items-center mt-10 gap-4 text-base">
                    <button onClick={()=>{addToCart(product);}} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2" >
                        Add to Cart <FaCartArrowDown className='text-lg'/>
                    </button>
                    <button onClick={()=>{addToCart(product);navigate(`/cart`);scrollTo(0,0)}} className="w-full py-3.5 cursor-pointer font-medium bg-secondary text-white rounded-full hover:bg-primary transition flex items-center gap-x-2 justify-center" >
                        Buy now <FaArrowUp className='text-lg'/>
                    </button>
                </div>
            </div>
        </div>
        {/* Related Products */}
        <div className='my-12 bg-bg/50 py-4 px-8 rounded'>
            <div className='relative flex '><h2 className='text-2xl font-medium text-gray-600'>Similar Veggies</h2>
      <hr className='border-1 border-primary-dull w-[100px] absolute top-8'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 items-center justify-center  gap-4 lg:gap-7 my-8'>
      {
        relatedProducts.filter((item:ProductType)=>item.inStock).map((product:ProductType,idx:number)=>(
            <div key={idx} onClick={() => {navigate(`/veggies/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}} className="border border-gray-500/20 gap-7 rounded-md md:px-4 px-3 py-2 bg-gray-50 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
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
        ))
      }
      </div>
      <div className="flex justify-center">
      <button className="my-4 py-2 px-4 border-1  border-primary hover:bg-primary/10 bg-primary/3 text-primary rounded transition cursor-pointer" onClick={() => {navigate(`/veggies/${product.category.toLowerCase()}`);scrollTo(0,0)}}>See more...</button>
        </div></div>
    </div>
)
}
    </div>
  )
}

export default ProductOverview
