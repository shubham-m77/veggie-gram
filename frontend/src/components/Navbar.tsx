import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/veggiegram.png"
import { useAppContext } from "../context/AppContext"
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

export const Navbar = () => {
    const [open, setOpen] = useState(false)
    const {user,searchQuery,setSearchQuery,setShowUserLogin,navigate,getCartItemCount}=useAppContext();

    useEffect(()=>{
        if(searchQuery.length>0){
            navigate("/veggies");
        }
    },[searchQuery])
   

    return (
    
        <nav className="w-full transition-all z-[50] ease-in-out top-0 sticky h-[70px] border-b-[1px] flex items-center justify-between px-6  md:px-12 lg:px-20 xl:px-32 py-4 bg-gray-50 text-gray-900 transition-all shadow-sm">  
            <Link to="/" className="flex items-center gap-1.5 text-xl font-extrabold brand-logo" onClick={()=>{setOpen(false);}}>
                <img className="h-9 md:h-10 " src={logo} alt="VeggieGram" />
                <h1 className="text-[18px] md:text-xl">Veggie<span>Gram</span></h1>
            </Link>
           <div className="flex items-center justify-between gap-6 md:gap-10">
            {/* Desktop Menu
            <div className="hidden lg:flex items-center gap-8 font-medium desktop-menu-links">
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
</div> */}

{/* SearchBar */}
                <div className="searchBar hidden sm:flex items-center text-sm gap-2 border focus:border-primary border-primary-dull px-3 rounded-full min-w-[200px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[470px]">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search veggies..." />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
{/* Cart */}
                <div className="relative cursor-pointer cart-group" onClick={()=>{navigate("/cart");scrollTo(0,0);}}>
                    <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" className="stroke-[#06723ed8] hover:stroke-primary" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className={`absolute -top-2 -right-3 text-xs text-white ${getCartItemCount() > 0 ? 'bg-secondary' : 'bg-primary-dull'} w-[18px] h-[18px] rounded-full`}>{getCartItemCount()}</button>
                </div>

                {user?(<Link to={"/account"}> <button onClick={()=>setOpen(false)} className="relative hidden lg:flex cursor-pointer  text-[#088b4c] hover:text-primary transition text-sm">
                <FaRegUserCircle className="text-2xl"/>
                </button></Link>):(<><button onClick={()=>{open?setOpen(false):setOpen(true);setShowUserLogin(true)}} className="hidden group lg:flex  cursor-pointer px-6 py-2  bg-[#088b4c] hover:bg-primary transition text-white rounded-full text-sm">
                    Login <IoLogIn className="text-xl"/>
                    <ul className="hidden group-hover:block absolute top-13 right-32 z-10 w-25 rounded shadow bg-white text-black  border-gray-200 border-[1px] text-sm">
                        <li onClick={()=>{navigate("/register");scrollTo(0,0)}} className="hover:bg-gray-200 px-2 py-1">Sign-up</li>
                        <li onClick={()=>{navigate("/login");scrollTo(0,0)}} className="hover:bg-gray-200 px-2 py-1">Log-in</li>
                    </ul>
                </button></>)}
            {/* </div> */}
            
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="lg:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>
            
            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm lg:hidden `}>
                <Link to="/" className="block">Home</Link>
               {user?(<Link to="/my-orders" className="block">My Orders</Link>):("")} 
               {user?(<Link to={"/account"}> <button onClick={()=>open?setOpen(false):setOpen(true)} className="cursor-pointer">
                <FaRegUserCircle className="text-2xl"/>
                </button></Link>):(<><button onClick={()=>{open?setOpen(false):setOpen(true);navigate("/login"); scrollTo(0,0)}} className="flex cursor-pointer ">
                    Login <IoLogIn className="text-xl"/>
                </button></>)}
                <Link to="/about" className="block">About</Link>
                <Link to="/contact" className="block">Contact</Link>
                </div>
            </div>
           
        </nav>
      
    )
}