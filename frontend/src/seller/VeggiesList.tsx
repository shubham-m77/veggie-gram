import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const VeggiesList = () => {
  const { products,productStore,axios } = useAppContext();

  const toggleStock= async(id:any,inStock:any)=>{
   try {
    const {data}= await axios.post("/api/product/stock",{id,inStock});
    if(data.success){
        productStore();
        toast.success(data.message);
    }
else{
    toast.error(data.message)
}
   } catch (error:any) {
    toast.error(error);
   }
    
  }
  return (
    <div className="flex flex-col justify-between">
            <div className="md:px-10 md:py-7 p-4 space-y-4">
                <h2 className="pb-4 text-xl font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-3xl md:w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-2 py-1.5 md:px-4 md:py-3 font-semibold truncate">Product</th>
                                <th className="px-2 py-1.5 md:px-4 md:py-3 font-semibold truncate">Category</th>
                                <th className="px-2 py-1.5 md:px-4 md:py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-2 py-1.5 md:px-4 md:py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products?.map((product:any, index:number) => (
                                <tr key={index} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-2 md:space-x-3 truncate">
                                        <div className="border border-gray-300 rounded p-1">
                                            <img src={product?.images[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-2 py-1.5 md:px-4 md:py-3">{product.category}</td>
                                    <td className="px-2 py-1.5 md:px-4 md:py-3 max-sm:hidden">₹{product.offerPrice}</td>
                                    <td className="px-2 py-1.5 md:px-4 md:py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 ml-3 md:ml-0">
                                            <input type="checkbox" className="sr-only peer" checked={product.inStock} onClick={()=>{toggleStock(product._id,!product.inStock)}} defaultChecked={product.inStock} />
                                            <div className="h-5 w-8 md:w-12 md:h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-3 h-3 md:w-5 md:h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-3 md:peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default VeggiesList
