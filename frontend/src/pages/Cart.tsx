import { useEffect, useState } from 'react'
import { ProductType, useAppContext } from '../context/AppContext';
import { assets } from '../assets/images/assets';
import toast from 'react-hot-toast';
import logo from "../assets/veggiegram.png"

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false);
    const {axios,products,navigate,cartItems,setCartItems,removeFromCart,user,getCartItemCount,getCartTotal,addToCart,updateCartItem,removeCartItem}=useAppContext();
    const [addresses,setAddresses]=useState<any>([]);
    const [cartArray,setCartArray]=useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const [paymentMethod, setPaymentMethod] = useState<string>("COD");
    const [showOrderAnimation, setShowOrderAnimation] = useState(false);

const gifSrc = `${assets.order_placed}?t=${new Date().getTime()}`;

    // animation place order
const handlePlaceOrder = async(e:any) => {
    e.preventDefault();
    if(!selectedAddress){
        toast.error("Please Select Address!");
    }
      else{ 
    if (paymentMethod === "COD") {
        try {
        const {data}=await axios.post("/api/order/cod",{
            userId:user._id,
            items:cartArray.map((item:any)=>({product:item._id,quantity:item.quantity})),
            address:selectedAddress._id});
        if(data.success){
           // Show the animation
        setShowOrderAnimation(true);
         setTimeout(() => {
            setShowOrderAnimation(false);
            toast.success(data.message);
             navigate("/my-orders");
            setCartItems({});
        }, 3000);
       
        }
        else{
      toast.error(data.message)
        }
    } catch (error:any) {
        toast.error(error.message);
    }}
       
    // Razorpay Payment
else {
  try {
    const { data } = await axios.post("/api/order/online", {
      userId: user._id,
      items: cartArray.map((item: any) => ({ product: item._id, quantity: item.quantity })),
      address: selectedAddress._id
    });

    if (data.success) {
      const options = {
        key: data.key,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "VeggieGram",
        description: "Order Payment",
        image: logo,
        order_id: data.razorpayOrder.id,
        handler: async function (response: any) {
          // Verify payment with backend

          try {
            const verifyRes = await axios.post("/api/order/verify-online", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              toast.success("Payment Verified & Order Placed!");
              setShowOrderAnimation(true);
              setTimeout(() => {
                setShowOrderAnimation(false);
                navigate("/my-orders");
                setCartItems({});
              }, 3000);
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err: any) {
            console.error(err);
            toast.error("Error verifying payment!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: selectedAddress.phoneNumber,
        },
        notes: {
          address: `${selectedAddress.addressLine1}, ${selectedAddress.city}`,
        },
        theme: {
          color: "#0e9f6e",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } else {
      toast.error(data.message);
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}
}
};

const getCart=()=>{
    const tempCartArray:any[] = [];
    for(const item in cartItems){
        const product = products.find((p:any) => p._id === item);
        if(product){
            product.quantity = cartItems[item];
            tempCartArray.push(product);
        }
    }
    setCartArray(tempCartArray);
}
const fetchAddress =async()=>{
    try {
        const {data}=await axios.get("/api/address/list");
        if(data.success){
            setAddresses(data.addressData);
            if(data.addressData.length>0){
            setSelectedAddress(data.addressData[0]);}
        }
        else{
            setAddresses(null);
        }
    } catch (error:any) {
        console.log(error);
          setAddresses(null);
    }
}

useEffect(() => {
    getCart();
}, [cartItems,products]);

useEffect(() => {
    if(user){
         fetchAddress();
    }
}, [user]);

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

if (cartArray.length === 0) {
    return (<div className=' my-8 bg-gray-100/50 p-6 rounded-md'>
        <div className='flex flex-col items-center justify-center'>
            <div className="text-center text-3xl text-red-500 font-semibold">Your cart is empty!</div>
            <button onClick={() => navigate('/veggies')} className="mt-4 bg-primary/80 hover:bg-primary cursor-pointer  text-white py-2 px-4 rounded">Continue Shopping</button>
        </div>
        <div className='relative mt-16'><h2 className='text-xl md:text-2xl font-medium text-gray-600/80'>Suggestions</h2>
      <hr className='border-1 border-primary-dull w-[70px] absolute top-8'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 items-center justify-center  gap-4 lg:gap-7 my-8'>
              {products.filter((product:ProductType)=>product.inStock)?.slice(0, 5).map((product:ProductType,idx:number)=>(
                  <div key={idx}  className="border border-gray-500/20 gap-7 rounded-md md:px-4 px-3 py-2 bg-gray-50 w-full">
                  <div onClick={() => navigate(`/veggies/${product.category.toLowerCase()}/${product._id}`)} className="group cursor-pointer flex items-center justify-center px-2">
                      <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="text-gray-500/60 text-sm">
                      <p>{product.category}</p>
                      <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                      <div className="flex items-center gap-0.5">
                          
                      </div>
                      <div className="flex items-end justify-between mt-3">
                          <p className="md:text-xl text-base font-medium text-primary">
                          ₹{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">₹{product.price}</span>
                          </p>
                          <div className="text-primary ">
                              {!cartItems[product._id]? (
                                  <button className="cursor-pointer bg-bg flex items-center transition ease-in hover:scale-95 justify-center gap-1 hover:bg-primary-dull border border-secondary md:w-[80px] w-[64px] h-[34px] rounded text-gray-900 font-medium" onClick={() => addToCart(product._id)} >
                                      <svg width="14" height="14" className='' viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" className='stroke-gray-900' stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                      Add
                                  </button>
                              ) : (
                                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                      <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                          -
                                      </button>
                                      <span className="w-5 text-center">{cartItems[product._id]}</span>
                                      <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                          +
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
                 )
              )}
              
            </div>
        </div>
    );
}

    return (<div>
        <div className="flex flex-col md:flex-row py-4 md:py-8 max-w-6xl w-full md:px-6 mx-auto">
            <div className='flex-1 max-w-4xl '>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartItemCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 ">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Remove</p>
                </div>

                {cartArray?.map((product:any, index:number) => (
                    <div key={index}  className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded " onClick={() => {navigate(`/veggies/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}}>

                                <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none' onChange={(e) => {updateCartItem(product._id, Number(e.target.value))}} value={product.quantity}>
                                            {Array(cartItems[product._id]>9?cartItems[product._id]:9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">₹{product.offerPrice * product.quantity}</p>
                        <button className="cursor-pointer mx-auto" onClick={() => {removeCartItem(product._id);}}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium" onClick={() => {navigate('/veggies');scrollTo(0,0)}}>
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" className='stroke-primary' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 rounded-md">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500"><span className='font-medium'>{selectedAddress?` ${selectedAddress.firstName} ${selectedAddress.lastName},`: ""}</span>{selectedAddress?` ${selectedAddress.addressLine1},${selectedAddress.addressLine2}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.phoneNumber}`:"No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses?addresses.map((addresses:any)=>(
<p onClick={() => {setShowAddress(false);setSelectedAddress(addresses)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                     {addresses.firstName} {addresses.lastName}, {addresses.addressLine1},{addresses.addressLine2}, {addresses.city}, {addresses.state}, {addresses.zipCode}, {addresses.phoneNumber} <br />
                                </p>
                                )):(
                                    <p className="text-gray-500 p-2 hover:bg-gray-100">
                                        No address found
                                    </p>
                                )}
                                <p onClick={() => {navigate('/add-address');scrollTo(0,0)}} className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>₹{getCartTotal()}</span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span>Shipping Fee</span><span className="text-primary">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Platform Fee (2%)</span><span>₹{(getCartTotal() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>₹{(getCartTotal() + (getCartTotal() * 0.02)).toFixed(2)}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary/90 transition" onClick={handlePlaceOrder}>
                    {paymentMethod === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
           
        </div> 
        {showOrderAnimation &&<div className={`items-center justify-center flex fixed top-0 left-0 w-full h-full bg-[#22292f] ${showOrderAnimation ? 'opacity-100' : 'opacity-0'} transition-all duration-3500`}>
    <img src={gifSrc}  alt="order_placed" className='h-[80%]' />
</div>
}
        </div>
    )
}
   

export default Cart
