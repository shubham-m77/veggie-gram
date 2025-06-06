import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';
import logo from "../assets/veggiegram.png"
import toast from 'react-hot-toast';


const SellerLogin = () => {
    const {isSeller,setIsSeller,navigate,axios} = useAppContext();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    },[]);



    const handleSubmit =async(e:any)=>{
        e.preventDefault();
       try {
        const {data}= await axios.post("/api/seller/login",{email,password});
        if(data.success){
        setIsSeller(true);
        }
        else{
            toast.error(data.message);
        }
       } catch (err:any) {
      toast.error(err.message);
      console.log(err);
       }
    }

  return !isSeller && (
    <div className='p-4 md:p-0 w-full h-screen flex items-center justify-center bg-bg'>

        <form onSubmit={handleSubmit} className="w-full md:max-w-96 text-center border border-primary/20 rounded-2xl px-8 bg-white">
        <div onClick={()=>navigate("/")} className="flex justify-center mr-1.5 items-center gap-x-1.5 py-2 text-xl mt-8 font-extrabold brand-logo" >
                        <img className="h-7 md:h-8 " src={logo} alt="VeggieGram" />
                        <h1 className="text-[16px] md:text-lg">Veggie<span>Gram</span></h1>
                    </div>
    <div className="relative">
    <h1 className="text-gray-900 text-3xl font-semibold"><span className='text-primary'>Seller</span> Login</h1>
    <hr className='border-1 border-primary-dull w-[105px] absolute top-8 left-10 md:left-22'/></div>

    <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
    <div className="flex items-center w-full mt-10 bg-white border hover:border-primary/80 border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
        </svg>
        <input value={email} onChange={(e)=>{setEmail(e.target.value);}} type="email" placeholder="Email Address" className="bg-transparent  text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>                 
    </div>

    <div className="flex items-center mt-4 w-full hover:border-primary/80 bg-white border  border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
        </svg>
        <input value={password} onChange={(e)=>{setPassword(e.target.value);}} type="password" placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required/>                 
    </div>
    <div className="mt-5 text-left text-primary">
        <Link className="text-sm" to="#">Forgot password?</Link>
    </div>

    <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-primary/80 hover:bg-primary transition-all">
        Login
    </button>
    <p className="text-gray-500 text-sm mt-3 mb-11">Don’t have an account? <Link className="text-primary hover:text-primary/80"  to="#">Sign up</Link></p>
</form>
      
    </div>
  )
}

export default SellerLogin
