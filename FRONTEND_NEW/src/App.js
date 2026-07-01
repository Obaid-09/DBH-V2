
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import LoginSignup from './Pages/LoginSignup'
import Checkout from './Pages/Checkout';
import Footer from './Components/Footer/Footer';
import MyOrders from './Pages/MyOrders';
import OrderSuccess from './Pages/OrderSuccess';
import Dashboard from './Admin/Pages/Dashboard.jsx';
import AdminLayout from './Admin/Layout/Adminlayout.jsx';
import Products from './Admin/Pages/Products.jsx';
import Orders from './Admin/Pages/Orders.jsx';
import Users from './Admin/Pages/Users.jsx';
import Analytics from './Admin/Pages/Analytics.jsx';
import AddProduct from './Admin/Pages/AddProduct.jsx';
import Coupons from './Admin/Pages/Coupons.jsx';
import Settings from './Admin/Pages/Settings.jsx';
import ChangePassword from './Pages/ChangePassword';
import EditProduct from './Admin/Pages/EditProduct.jsx';
import abaya_banner from './Components/Assets/abaya_banner.jpg'
import scarf_banner from './Components/Assets/scarf_banner.jpg'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './Admin/AdminRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Shop category="shop"/>}/>
        <Route path = '/abaya' element = {<ShopCategory banner = {abaya_banner}category = "abaya"/>}/>
        <Route path = '/scarf' element = {<ShopCategory banner = {scarf_banner} category = "scarf"/>}/>
        <Route path = '/product' element = {<Product/>}>
          <Route path = ':productId' element={<Product/>}/>
        </Route>
        <Route
            path='/change-password'
            element={<ChangePassword />}
        />
        <Route path = '/cart' element = {<Cart/>}/>
        <Route path = '/login' element = {<LoginSignup/>}/>
        <Route path = '/wishlist' element = {<Wishlist/>}/>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success' element={<OrderSuccess />} />
        <Route path='/orders' element={<MyOrders />} />
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
            path="/admin/add-product"
            element={<AddProduct />}
        />
        <Route
            path="/admin/edit-product/:productId"
            element={<EditProduct />}
        />
        <Route
            path="/admin/orders"
            element={<Orders />}
        /> */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route
              path="edit-product/:productId"
              element={<EditProduct />}
          />
        </Route>
      </Routes>
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          background: "#ffffff",
          color: "#111111",
          border: "1px solid #C9A227",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          fontFamily: "inherit"
        }}
      />
      </BrowserRouter>
    </div>
  );
}

export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<h1>HOME PAGE</h1>} />
//         <Route path="/admin" element={<h1>ADMIN WORKING</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
