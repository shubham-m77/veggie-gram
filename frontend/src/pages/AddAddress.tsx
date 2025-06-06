import { useEffect, useState } from "react";
import { assets } from "../assets/images/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email:"",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
    });
    const {axios,navigate,user}=useAppContext();
 
   
     const handleSubmit = async(e:any)=>{
        e.preventDefault();
      try {
        const {data} = await axios.post("/api/address/add",{address});
        if(data.success){
          toast.success(data.message);
          navigate("/cart");
        }
        else{
          toast.error(data.message);
        }
      } catch (error:any) {
          toast.error(error.message);  
          console.log(error);      
      }
    }

    const handleChanging = (e:any) => {
     
        // Handle input change logic here
        setAddress((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }
    useEffect(()=>{
      if(!user){
        navigate("/login");
      }
    },[user])
  return (
    <div className='mt-8 pb-8'>
        <div className='relative'><h2 className='text-xl md:text-2xl font-semibold text-gray-700 '>Add Shipping <span className="text-primary"> Address</span></h2>
      <hr className='border-1 border-primary-dull w-[100px] absolute top-8'/>
      </div>
        <div className="flex flex-col-reverse md:flex-row justify-between mt-4 items-center md:items-start">
            
          <div className="bg-bg/50 rounded p-4 ">
           <form onSubmit={handleSubmit} className="gap-y-3 text-md grid">
  <div className="flex flex-row gap-x-4">
    <input
      type="text"
      placeholder="First Name"
      name="firstName"
      value={address.firstName}
      onChange={handleChanging}
      className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
      required
    />
    <input
      type="text"
      placeholder="Last Name"
      name="lastName"
      value={address.lastName}
      onChange={handleChanging}
      className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
      required
    />
  </div>
 <div className="flex flex-row gap-x-4">
<input
    type="email"
    placeholder="Emil address"
    name="email"
    value={address.email}
    onChange={handleChanging}
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
    required
  />

  <input
    type="tel"
    placeholder="Phone Number"
    name="phoneNumber"
    value={address.phoneNumber}
    onChange={handleChanging}
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
    required
  />
</div>
  <input
    type="text"
    placeholder="Address Line 1"
    name="addressLine1"
    value={address.addressLine1}
    onChange={handleChanging}
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
    required
  />

  <input
    type="text"
    placeholder="Address Line 2"
    name="addressLine2"
    value={address.addressLine2}
    onChange={handleChanging}
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
  />

  <div className="flex flex-row gap-x-4">
    <input
      type="text"
      placeholder="City"
      name="city"
      value={address.city}
      onChange={handleChanging}
      className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
      required
    />
    <input
      type="text"
      placeholder="State"
      name="state"
      value={address.state}
      onChange={handleChanging}
      className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
      required
    />
  </div>

  <input
    type="text"
    placeholder="Pin Code"
    name="zipCode"
    value={address.zipCode}
    onChange={handleChanging}
    className="w-full p-2 border border-gray-500/30 rounded outline-none text-gray-700 focus:border-primary transition"
    required
  />

  <button
    type="submit"
    className="bg-primary/80 text-white p-2 rounded hover:bg-primary transition cursor-pointer"
  >
    Add Address
  </button>
</form>

          </div>
          <div className="md:w-120 sm:w-100 w-full md:rotate-x-10 md:rotate-y-[-15deg] md:scale-x-[-1]">
            <img src={assets.address_bg} className="mt-[-20px]"   loading="lazy" alt="add address" />
          </div>
        </div>
      </div>

  )
}

export default AddAddress
