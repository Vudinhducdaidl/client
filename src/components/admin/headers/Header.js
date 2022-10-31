import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
// import Menu from './icon/menu.svg';
// import Close from './icon/close.svg';
// import Cart from './icon/cart.svg';
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  // const [cart] = state.userAPI.cart;
  // const [users] = state.userAPI.users;
  // const [menu, setMenu] = useState(false);
  // const [allusers] = state.userAPI.allusers

  // Đăng xuất
  const logoutUser = async () => {
    // gọi method và xóa session
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    // trả về trang chủ
    window.location.href = "/";
  };
  // const styleMenu = {
  //   left: menu ? 0 : '-100%',
  // };
  return (
    <header>
      <>
        {/* <div className="menu" onClick={() => setMenu(!menu)}>
          <img src={Menu} alt="" width="30" />
        </div> */}

        <ul className='flex text-gray-600 text-xl'>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/chart'>Thống kê</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/detailProduct'> Sản phẩm</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/create_product'>Tạo sản phẩm mới</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/category'>Danh mục</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/brand'>Nhãn hiệu</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/slide'>Slide</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/users'>Tài khoản</Link>
          </li>
          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/dashboard/history'>Lịch sử đặt hàng</Link>
          </li>

          <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
            <Link to='/login' onClick={logoutUser}>
              Đăng xuất
            </Link>
          </li>
          {isLogged ? (
            ""
          ) : (
            <li className='py-2 px-4 font-bold hover:bg-gray-800 hover:text-white'>
              <Link to='/adminAuthen'>Đăng nhập</Link>
            </li>
          )}
          {/* <li onClick={() => setMenu(!menu)}>
            <img src={Close} alt="" width="30" className="menu" />
          </li> */}
        </ul>
      </>
    </header>
  );
}

export default Header;
