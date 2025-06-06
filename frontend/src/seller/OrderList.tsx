import { useEffect, useState } from 'react'
import { assets } from '../assets/images/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const OrderList = () => {
    const {axios}= useAppContext();
  const [orders, setOrders] = useState([]);
  const fetchOrders=async()=>{
try {
    const {data} = await axios.get("/api/order/seller");
    if(!data.success){
        setOrders(data.ordersData);
    }
    else{
        toast.error(data.message);
    }
} catch (error:any) {
  console.error(error.message);
    
}
  }
  useEffect(()=>{
    fetchOrders();
  },[
    orders
  ])
  return (
     <div className="md:px-10 md:py-7 p-4 space-y-4">
            <h2 className="text-xl font-medium">Orders List</h2>
            {orders?.map((order:any, index:number) => (
                <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 px-5 py-2 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-2.5 md:gap-5 items-center justify-center">
                        <div className=''>
                            {order.items.map((item:any, index:number) => (
                                <div key={index} className="flex my-1 md:my-3 flex-col justify-center items-center md:border-1 border-primary/20 md:bg-bg/50 md:p-3 rounded">
                                    <img className="w-12 h-12 object-cover" src={item.product.images[0] || assets.box_icon} alt="" />
                                    <p className="font-medium">
                                        {item.product.name} <span className={`text-primary ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm md:w-[30%]">
                        <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.addressLine1},{order.address.addressLine2}, {order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.phoneNumber}</p>
                    </div>

                    <p className="font-medium text-lg my-auto text-black/70">₹{order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentMode}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: <span className={`${order.isPaid?"text-primary":"text-yellow-600"}`}>{order.isPaid ? "Paid" : "Pending"}</span></p>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default OrderList
