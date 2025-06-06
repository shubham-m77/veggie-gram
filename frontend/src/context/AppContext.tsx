import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"
// Set the base URL for axios requests
axios.defaults.withCredentials = true; // Enable credentials for cross-origin requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Define a proper interface for context value
export interface ProductType {
  _id: string;
  name: string;
  category: string;
  quantity?: number;
  price: number;
  offerPrice: number;
  images: any[];
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
}  

// interface AppContextType {
//   navigate: ReturnType<typeof useNavigate>;
//   user: any;
//   setUser: React.Dispatch<React.SetStateAction<any>>;
//   isSeller: boolean;
//   setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
//   showUserLogin:boolean;
//   setShowUserLogin:React.Dispatch<React.SetStateAction<boolean>>;
//   products:ProductType[];
//   addToCart:any;
//   removeFromCart:any;
//   updateCartItem:any;
//   cartItems:any;
//   searchQuery:any;
//   setSearchQuery:any;
//   getCartItemCount:any;
//   getCartTotal:any;
//   removeCartItem:any;
// }

// Create context with undefined initial value for better type safety
const AppContext = createContext<any | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products,setProducts] =  useState<ProductType[]>([]);
  const [cartItems, setCartItems] = useState<any>({});
  const [searchQuery,setSearchQuery]=useState<any>({});

  // fetch seller status
const fetchSeller = async()=>{
        try {
            const {data}=await axios.get("api/seller/auth-seller");
            if(data.success){
                setIsSeller(true);
            }
            else{
              setIsSeller(false);
            }
        } catch (err:any) {
            setIsSeller(false);
            
        }
    }

    // fetch user status ,cartItems,userData
const fetchUser = async()=>{
        try {
            const {data}=await axios.get("/api/user/auth-user");
            if(data.success){
              setUser(data.userData);
              setCartItems(data.userData.cartItems);
            }
            else{
              setUser(null);
            }
        } catch (err:any) {
            setUser(null);
            
        }
    }

  // Fetch Products
  const productStore=async()=>{
    try {
      const {data}=await axios.get("/api/product/list");
      if(data.success){
        setProducts(data.products);
      }
      else{
        toast.error(data.message);
      }
    } catch (error:any) {
      toast.error(error.message|| "Internal server error");
    }
  }
  useEffect(()=>{
  productStore();
  fetchSeller();
  fetchUser();
  },[])

  // update cart itesm in database
  useEffect(()=>{
    const updateCart=async()=>{
      try {
        const {data}=await axios.post("/api/cart/update",{cartItems});
      if(!data.success){
        toast.error(data.message);
      }
      } catch (error:any) {
      toast.error(error.message|| "Internal server error");
      }
      if(user){
        updateCart();
      }
      
    }
  },[cartItems])

  
// Add Cart items
const addToCart=(itemId:number)=>{
  const cartData= structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId]+=1;
  }
  else{
    cartData[itemId]=1;
    toast.success("Added to Cart");
  }
  setCartItems(cartData);
}
// update cart item quantity
const updateCartItem=(itemId:any,quantity:number)=>{
 const cartData=structuredClone(cartItems);
 cartData[itemId]=quantity;
 setCartItems(cartData);
}
// remove items from cart
const removeFromCart=(itemId:number)=>{
  const cartData=structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId]-=1;
    if(cartData[itemId]===0){
      delete cartData[itemId];
      
    }
  }
  setCartItems(cartData);
}

// remove items from cart
const removeCartItem=(itemId:number)=>{
  const cartData=structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId]=0;
    if(cartData[itemId]===0){
      delete cartData[itemId];
      
    }
  }
  setCartItems(cartData);
  toast.error("Removed from Cart");

}

// cart item count
const getCartItemCount = () => {
  let count = 0;
  for (const item in cartItems) {
    count += cartItems[item];
  }
  return count;
}

// cart items total
const getCartTotal = () => {
  let total = 0;
  for (const item in cartItems) {
    const product = products.find((p) => p._id === item);
    if (product) {
      total += product.offerPrice * cartItems[item];
    }
  }
  return total; 
}
  const value: any = { navigate, user, setUser, isSeller, setIsSeller,showUserLogin,setShowUserLogin, products,addToCart,removeFromCart,updateCartItem,cartItems,searchQuery,setSearchQuery,getCartItemCount,getCartTotal,removeCartItem,axios,productStore};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
