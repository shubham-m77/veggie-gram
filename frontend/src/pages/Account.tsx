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
            <div className=" w-[50px] h-[50px] flex-col gap-2 rounded-full border-primary/50 border-1 items-center justify-center overflow-hidden">
            <img src="https://media.istockphoto.com/id/1136413215/photo/young-man-at-street-market.jpg?s=612x612&w=0&k=20&c=obnaR5III0jRxHKd4ZPl3LRC2pI792KbHYR2eBzKKe8=" alt="Profile_img" className='w-full h-full object-cover' /></div>
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
        <div className='col-span-3 rounded border-gray-400 border-[1px] shadow bg-white  p-2' >Pc Page</div>
    </div>
    </div>
  )
}

export default Account
