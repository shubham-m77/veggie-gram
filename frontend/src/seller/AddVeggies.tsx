import React, { useState } from 'react'
import { assets, categories } from '../assets/images/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AddVeggies = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");

    const {axios} =useAppContext();
    // Add Product API call
    const submitHandler = async(e:any) => {
        e.preventDefault();
        try {
            const productData={
                name,
                description:description.split("\n"),
                category,
                price,
                offerPrice,
            };
            const formData= new FormData();
            formData.append("productData",JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append("images",files[i]);
            }
            const {data}= await axios.post("/api/product/add",formData);
            if(data.success){
                toast.success(data.message);
                setName("");
                setCategory("");
                setDescription("");
                setFiles([]);
                setOfferPrice("");
                setPrice("");
            }
            else{
            toast.error(data.message);
            }
        } catch (error:any) {
        toast.error(error);
   
        }
    }
  return (
    <div className="flex flex-col justify-between overflow-y-scroll h-screeen no-scrollbar">
            <form className="md:px-10 md:py-7  p-4 space-y-4" onSubmit={submitHandler}>
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFiles([...files, e.target.files[0]]);
                                        }
                                    }}
                                />
                                <img className="max-w-24 cursor-pointer" src={files[index]? URL.createObjectURL(files[index]):assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input id="product-name" type="text" value={name} placeholder="Type here" onChange={(e)=>setName(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea id="product-description" rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="" className='font-medium' disabled>Select Category</option>
                       {categories.map((category:any, index:number) => (
                           <option key={index} value={category.path}>{category.path}</option>
                       ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input id="product-price" type="number" value={price} placeholder="0" onChange={(e)=>setPrice(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input id="offer-price" type="number" value={offerPrice} placeholder="0" onChange={(e)=>setOfferPrice(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary/85 cursor-pointer hover:bg-primary text-white font-medium rounded">ADD</button>
            </form>
        </div>
  )
}

export default AddVeggies
