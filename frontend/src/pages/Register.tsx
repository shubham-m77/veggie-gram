import {useState} from 'react'
import { assets } from '../assets/images/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Register = () => {
    const {setUser,navigate,axios}=useAppContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler =async(e:any)=>{
        e.preventDefault();
       try {
               const {data}= await axios.post("/api/user/register",{
                name,email,password
               });
               if(data.success){
                   toast.success(data.message);
                   setUser(data.data);
                   navigate("/");
               }
               else{
                   toast.error(data.message || "User not registered!");
                
               }    
             } catch (error:any) {
                toast.error(error.response.data.message || "Internal Server Error");
             } 
    }

  return (
    <div className="flex h-auto md:h-[90vh] w-full px-6 py-2 lg:p-0">
    <div className="w-[60%] hidden lg:flex h-full">
        <img className=" w-full h-full" src={assets.login_page_bg} alt="leftSideImage" />
    </div>

    <div className="flex flex-col items-center justify-center w-full lg:w-[40%] p-3 lg:px-6 lg:py-4 shadow-md rounded md:rounded-none md:shadow-none">

        <form onSubmit={(e)=>{submitHandler(e)}} className="md:w-96 w-full sm:w-80 flex flex-col items-center justify-center relative">
            <h2 className="text-4xl text-gray-900 font-medium ">Sign up</h2>
            <hr className='absolute w-[90px] border-1 top-10.5 border-primary-dull'/>
            <p className="text-md text-gray-500/90 mt-3">Register for healthy farm fresh veggies!</p>

            <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo"/>
            </button>

            <div className="flex items-center gap-4 w-full my-5">
                <div className="w-full h-px bg-gray-300/90"></div>
                <p className="w-full text-nowrap text-sm text-gray-500/90">or sign up with email</p>
                <div className="w-full h-px bg-gray-300/90"></div>
            </div>
           <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-5.75 gap-2">
           <svg className="text-[#6B7280]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>


                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter your Name" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required/>                 
            </div>

            <div className="mt-6 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                </svg>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  placeholder="Email id" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required/>                 
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                </svg>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Create a new Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required/>
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                <div className="flex items-center gap-2">
                    <input className="h-5" type="checkbox" id="checkbox"/>
                    <label className="text-sm" htmlFor="checkbox">Remember me</label>
                </div>
                <Link className="text-sm underline" to="#">Forgot password?</Link>
            </div>

            <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-primary cursor-pointer hover:scale-90 transition-all ease-in-out hover:opacity-90">
                Register
            </button>
            <p className="text-gray-500/90 text-sm mt-4">Already have an account? <Link className="text-primary hover:underline" to="/login">Sign-in</Link></p>
        </form>
    </div>
</div>
  )
}

export default Register
