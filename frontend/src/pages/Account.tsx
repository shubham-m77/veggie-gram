import { FaAngleRight } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast';

const Account = () => {
  const {user,setUser,navigate,axios}=useAppContext();
  const logoutHandler=async()=>{
          try {
            const {data}= await axios.get("/api/user/logout");
            if(data.success){
                toast.success(data.message);
                setUser(null);
                navigate("/");
              
    
            }
            else{
                toast.error(data.message);
            }
          } catch (error:any) {
                toast.error(error.response.data.message || "Internal Server Error");
            
          } 
          // useEffect(()=>{
          
          // },[])
}
  return (
    <div className='my-6'>
     <div className='flex gap-2 items-center text-gray-500'>Home <FaAngleRight className='text-md text-gray-500'/> <span className='text-black'>Account</span></div>
    <h1 className='text-2xl text-black mt-1 font-medium'>Account Overview</h1>
    <div className="grid grid-cols-4 gap-3 mt-3">
        <div className="rounded border-gray-400 border-[1px] shadow bg-white p-2">
          <div className='account_owner flex gap-2.5 items-center  text-center'>
            <div className=" w-[50px] h-[50px] flex-col gap-2 rounded-full  items-center justify-center overflow-hidden">
           <img src="data:image/png;base64,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" alt="user-male-circle"/></div>
          <h3 className='font-semibold text-lg text-primary'>{`${user?.name}`}</h3>

            </div><hr className='border-gray-300 my-2'/>
        <div className="flex justify-around">
          <button onClick={() => navigate("/edit-profile")} className="transition-all ease-linear rounded-md card text-md items-center justify-center p-2 flex flex-col hover:bg-primary-dull/30 cursor-pointer bg-primary-dull/20">
            <div className="rounded-full bg-gray-100 p-1.5"><FaUserCog className='text-xl'/></div>
            Profile
          </button>
        <button onClick={() => navigate("/my-orders")} className="transition-all ease-linear rounded-md card text-md items-center justify-center p-2 flex flex-col hover:bg-primary-dull/30 cursor-pointer bg-primary-dull/20"> 
          <div className="rounded-full bg-gray-100 p-1.5"><BsCartCheckFill className='text-xl'/></div>My Orders</button>
          <button  onClick={logoutHandler} className="transition-all ease-linear rounded-md card text-md items-center justify-center p-2 flex-col flex hover:bg-primary-dull/30 cursor-pointer bg-primary-dull/20" > 
          <div className="rounded-full bg-gray-100 p-1.5"><CiLogout className='text-xl' /></div>Log-out</button></div>
        </div>
        <div className='col-span-3 rounded p-2 hidden md:block' ></div>
    </div>
    </div>
  )
}

export default Account
