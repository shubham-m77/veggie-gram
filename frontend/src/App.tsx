// App.js
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Account from './pages/Account.tsx';
import { Navbar } from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import AllVeggies from './pages/AllVeggies.tsx';
import ProductCategory from './pages/ProductCategory.tsx';
import ProductOverview from './pages/ProductOverview.tsx';
import Cart from './pages/Cart.tsx';
import AddAddress from './pages/AddAddress.tsx';
import MyOrder from './pages/MyOrder.tsx';
import SellerLogin from './seller/SellerLogin.tsx';
import { useAppContext } from './context/AppContext.tsx';
import SellerLayout from './seller/SellerLayout.tsx';
import OrderList from './seller/OrderList.tsx';
import VeggiesList from './seller/VeggiesList.tsx';
import AddVeggies from './seller/AddVeggies.tsx';
// import Loading from './components/Loading.tsx';

function App() {
  const isSellerUrl=useLocation().pathname.includes("seller");
  const isSignInPage=useLocation().pathname.includes("login");
  const isRegisterPage=useLocation().pathname.includes("register");
      const {isSeller} = useAppContext();
  


  return (
    <div>{isSellerUrl?(null):(<Navbar/>)}
    <div className={`${isSellerUrl || isSignInPage || isRegisterPage?"bg-bg/10 min-h-screen ":"px-6 md:px-12 lg:px-20 xl:px-24 py-2"}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/veggies" element={<AllVeggies />} />
        <Route path="/veggies/:category" element={<ProductCategory />} />
        <Route path="/veggies/:category/:id" element={<ProductOverview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/my-orders" element={<MyOrder />} />
         {/* <Route path="/loader" element={<Loading />} /> */}
        {/* seller page */}
        <Route path="/seller" element={isSeller?<SellerLayout/>:(<SellerLogin />)} >
          <Route index element={isSeller?<OrderList />:null} />
          <Route path="veggies-list" element={<VeggiesList />} />
          <Route path="add-veggies" element={<AddVeggies />} />
        </Route>

      </Routes>
      </div>
      {isSellerUrl?(""):(<Footer/>)}
      </div>
  );
}

export default App;
