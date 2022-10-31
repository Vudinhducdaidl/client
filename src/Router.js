import React, { useContext } from "react";
import { GlobalState } from "./GlobalState";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/homepage/HomePage";
// import AdminLogin from './components/admin/AdminLogin';
//home
import Product from "./components/home/product/Product";
import DetailProduct from "./components/home/product/DetailProduct";
import Info from "./components/home/info/info";
import News from "./components/home/news/news";
import Contact from "./components/home/contact/contact";
import HomeProfile from "./components/home/Profile/Profile";
import Changepass from "./components/home/Profile/ChangePass";
import ChangeProfile from "./components/home/Profile/ChangeProfile";
import Checkout from "./components/home/payment/Checkout";
import HistoryOder from "./components/home/homepage/HistoryOder";
import DetailsOrder from "./components/home/homepage/DetailsOrder";

import HomeMain from "./components/home/homepage/HomeMain";
import HomeLogin from "./components/home/login/Login";
import HomeRegister from "./components/home/login/Register";
import Cart from "./components/home/homepage/Cart";
//admin
import OrderHistory from "./components/admin/history/OrderHistory";
import OrderDetails from "./components/admin/history/OrderDetails";
import NotFound from "./components/admin/utils/not_found/NotFound";
import Categories from "./components/admin/categories/Categories";
import CreateProduct from "./components/admin/createProduct/CreateProduct";
import CreateCameraProduct from "./components/admin/createProduct/CreateCameraProduct";
import CreateHDMIProduct from "./components/admin/createProduct/CreateHDMIProduct";
import CreateLockHomeProduct from "./components/admin/createProduct/CreateLockHomeProduct";
import CreateSmartHomeProduct from "./components/admin/createProduct/CreateSmartHomeProduct";
import CreateLockHotelProduct from "./components/admin/createProduct/CreateLockHotelProduct";

import Chart from "./components/admin/chart/Chart";
import DetailProducts from "./components/admin/createProduct/detailProducts";
import Profile from "./components/admin/user/Profile";
import Brands from "./components/admin/brand/Brands";
import Slide from "./components/admin/createSlide/Slide";
import User from "./components/admin/user/Users";
import Dashboard from "./components/admin/Dashboard";

// import Products from './mainpages/products/Products';

function Router() {
  const state = useContext(GlobalState);
  // const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      {/* Route homepage */}
      <Route path='/' element={<HomePage />}>
        <Route path='' element={<HomeMain />} />
        <Route path='/product' element={<Product />} />
        <Route path='/detail/:id' element={<DetailProduct />} />
        <Route path='/info' element={<Info />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/news' element={<News />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile/:id' element={<HomeProfile />} />
        <Route path='/login' element={<HomeLogin />} />
        <Route path='/register' element={<HomeRegister />} />
        <Route path='/history_oder' element={<HistoryOder />} />
        <Route path='/history/:id' element={<DetailsOrder />} />
        <Route path='/changepassword/:id' element={<Changepass />} />
        <Route path='/changeprofile/:id' element={<ChangeProfile />} />
        {/* payment */}
        <Route path='/checkout/' element={<Checkout />} />
        {/* báo giá và giấy tờ */}

        <Route path='/*' element={<NotFound />} />
      </Route>
      {/* Route Admin */}
      {/* <Route path="/adminAuthen" element={<AdminLogin />} /> */}
      {/* Router dashboard */}
      <Route path='/dashboard' element={isAdmin ? <Dashboard /> : <NotFound />}>
        <Route path='' element={<DetailProducts />} />
        <Route path='/dashboard/chart' element={<Chart />} />
        <Route path='/dashboard/detailProduct' element={<DetailProducts />} />
        <Route path='/dashboard/profile/:id' element={<Profile />} />
        <Route path='/dashboard/brand' element={<Brands />} />
        <Route path='/dashboard/slide' element={<Slide />} />
        <Route path='/dashboard/slide/:id' element={<Slide />} />
        <Route path='/dashboard/category' element={<Categories />} />
        <Route path='/dashboard/users' element={<User />} />
        <Route path='/dashboard/create_product' element={<CreateProduct />}>
          {/* route nhỏ */}
          <Route
            path='/dashboard/create_product/CreateCameraProduct'
            element={<CreateCameraProduct />}
          />
          <Route
            path='/dashboard/create_product/CreateLockHomeProduct'
            element={<CreateLockHomeProduct />}
          />
          <Route
            path='/dashboard/create_product/CreateLockHotelProduct'
            element={<CreateLockHotelProduct />}
          />

          <Route
            path='/dashboard/create_product/CreateHDMIProduct'
            element={<CreateHDMIProduct />}
          />
          <Route
            path='/dashboard/create_product/CreateSmartHomeProduct'
            element={<CreateSmartHomeProduct />}
          />
        </Route>

        {/* router edit */}
        <Route
          path='/dashboard/edit_camera_product/:id'
          element={<CreateCameraProduct />}
        />
        <Route
          path='/dashboard/edit_lockHome_product/:id'
          element={<CreateLockHomeProduct />}
        />
        <Route
          path='/dashboard/edit_smarthome_product/:id'
          element={<CreateSmartHomeProduct />}
        />
        <Route
          path='/dashboard/edit_hdmi_product/:id'
          element={<CreateHDMIProduct />}
        />
        <Route
          path='/dashboard/edit_lockHotel_product/:id'
          element={<CreateLockHotelProduct />}
        />

        <Route path='/dashboard/edit_product/:id' element={<CreateProduct />} />
        <Route path='/dashboard/history' element={<OrderHistory />} />
        <Route path='/dashboard/history/:id' element={<OrderDetails />} />
        <Route path='/dashboard/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
