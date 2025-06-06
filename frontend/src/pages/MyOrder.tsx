import  { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import OrderTracker from '../components/OrderTracker';

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const { navigate,user,axios } = useAppContext();

  const boxIcon =
    'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg';

  const fetchOrders = async () => {
   try {
   const {data}= await axios.get("/api/order/user");
   if(data.success){
    setMyOrders(data.ordersData);
    console.log(data.ordersData)
   }
   } catch (error) {
    setMyOrders([]);
   }
  };

  useEffect(() => {
  if(user){
    fetchOrders();
  }
  }, [user]);

  return (
    <div className="my-4 ">
      <div className="relative mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">My Orders</h2>
             <hr className='border-1 border-primary-dull w-[100px] absolute top-8'/>
      </div>

      <div className="grid gap-y-6">
        {myOrders.map((order, index) => (
          <div
            key={index}
            className="rounded-md border border-gray-200 bg-bg/5 shadow-sm p-5 md:p-6"
          >
            {/* Order Meta Info */}
            <div className="flex flex-col md:flex-row justify-between text-sm text-gray-600 gap-2 md:gap-4">
              <p>
                <span className="font-semibold text-gray-700">Order ID:</span>{' '}
                <span className="text-primary">{order._id}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Payment:</span>{' '}
                <span className="text-primary">{order.paymentMode}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Total:</span>{' '}
                <span className="text-primary font-bold text-base">₹{order.amount}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Date:</span>{' '}
                <span className="text-primary">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>

           

            <hr className="my-4 border-gray-200" />

            {/* Order Items */}
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row justify-between w-full md:items-center gap-4 py-4 ${
                  index !== order.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex flex-row  space-x-4">
                {/* Image */}
                <div
                  onClick={() =>
                    navigate(
                      `veggies/${item.product.category.toLowerCase()}/${item.product._id.toLowerCase()}`
                    )
                  }
                  className="cursor-pointer flex-shrink-0 "
                >
                  <img
                    src={item.product.images ? item.product.images[0] : boxIcon}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover border border-primary/20 bg-bg/40"
                  />
                </div>

                {/* Product Details */}
                <div className="flex  flex-col flex-grow mx-3">
                  <h3 className="text-md md:text-lg font-medium text-gray-800">{item.product.name}</h3>
                  <p className="text-primary font-semibold text-lg md:text-xl mt-1">
                    ₹{item.product.offerPrice * item.quantity}{' '}
                    <span className="text-gray-400 text-sm line-through">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                </div></div>
 {/* Progress Tracker */}
            <OrderTracker
              orderDate={order.createdAt}
              status={order.status.toLowerCase() as 'placed' | 'shipped' | 'delivered'}
            />
                {/* Status (Mobile Only) */}
                <div className="md:hidden text-sm text-gray-700">
                  Order Status:{' '}
                  <span
                    className={`font-semibold ${
                      order.status === 'delivered' ? 'text-green-600' : 'text-primary'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* Status (Desktop Right-Aligned) */}
                <div className="hidden md:flex flex-col items-end text-sm text-gray-700">
                  <span>Order Status:</span>
                  <span
                    className={`font-semibold ${
                      order.status === 'delivered' ? 'text-green-600' : 'text-primary'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
