import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/veggiegram.png"
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/images/assets";
import toast from "react-hot-toast";

const SellerLayout = () => {
        const {navigate,axios} = useAppContext();
    

const logoutHandler= async()=>{
    try {
        const {data}=await axios.get("/api/seller/logout");
        if(data.success){
            toast.success(data.message);
            navigate("/");
        }
        else{
             toast.error(data.message);

        }
    } catch (error:any) {
        toast.error(error.message);
    }
}
    const sidebarLinks = [
        { name: "Orders", path: "/seller" ,icon : assets.order_icon},
        { name: "Veggies", path: "/seller/veggies-list", icon: assets.product_list_icon },
        { name: "Add Veggies", path: "/seller/add-veggies", icon: assets.add_icon },
        
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to="/" className="flex items-center gap-1.5 text-xl font-extrabold brand-logo" >
                                <img className="h-9 md:h-10 " src={logo} alt="VeggieGram" />
                                <h1 className="text-[18px] md:text-xl hidden md:block">Veggie<span>Gram</span></h1>
                            </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button className='border rounded-full border-primary text-sm px-4 py-1 hover:bg-primary cursor-pointer hover:text-white' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <div className="flex">
            <div className="md:w-64 w-24 border-r md:h-[96vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item:any) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                        className={({isActive})=> `flex items-center py-3 px-2 md:px-4 gap-3 
                            ${isActive ? "border-r-3 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <img src={item.icon} alt="" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet/>
            </div>
        </>
    );
};
export default SellerLayout
