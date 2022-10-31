import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faClock,
  faPhone,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import logo from './image/5a.jpg';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import imgDefault from './image/default.jpg';
// import Cart from './homepage/Cart';
// import Cart from './icon/cart.svg';

function HomeHeader() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [users] = state.userAPI.users;
  // const [search, setSearch] = state.productsAPI.search
  // const [menu, setMenu] = useState(false);
  // const [allusers] = state.userAPI.allusers

  // Đăng xuất
  const logoutUser = async () => {
    // gọi method và xóa session
    await axios.get('/user/logout');
    localStorage.removeItem('firstLogin');
    // trả về trang chủ
    window.location.href = '/';
  };

  const loggedRouter = () => {
    return (
      <>
        <button className="p-2 text-white peer flex">
          <div>
            <img
              className="w-10 h-10 mr-2 rounded-full bg-white"
              src={users.images !== undefined ? users.images.url : imgDefault}
              alt=""
            />
          </div>
          <p className="my-auto">{users.name.toUpperCase()}</p>
        </button>
        <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg absolute left-14 z-10">
          <Link to={`/profile/${users._id}`}>
            <p className="px-5 py-3 hover:bg-gray-200">Quản lí hồ sơ</p>
          </Link>
          <Link to={`/history_oder`}>
            <p className="px-5 py-3 hover:bg-gray-200">Lịch sử mua hàng</p>
          </Link>
          {isAdmin ? (
            <Link to="/dashboard">
              <p className="px-5 py-3 hover:bg-gray-200">Dashboard</p>
            </Link>
          ) : (
            ''
          )}

          <Link to="/" onClick={logoutUser}>
            <p className="px-5 py-3 hover:bg-gray-200">Đăng xuất</p>
          </Link>
        </div>
      </>
    );
  };
  return (
    <header>
      <div className="w-full flex bg-neutral-800 text-gray-400">
        <div className="flex w-4/5 mx-auto py-2 justify-between">
          <p>Công ty TNHH Lê Sa, chi nhánh 5ABmt</p>
          <div className="flex">
            <div className="flex text-gray-400 ml-2 items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <p className="ml-2">thienchuc5aipcam@gmail.com |</p>
            </div>
            <div className="flex text-gray-400 ml-2 items-center">
              <FontAwesomeIcon icon={faClock} />
              <p className="ml-2">Mở cửa từ 7:30 đến 17:00 |</p>
            </div>
            <div className="flex text-gray-400 ml-2 items-center">
              <FontAwesomeIcon icon={faPhone} />
              <p className="ml-2">0859.299.299</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#2f2f2f]">
        <div className="flex h-20 py-2 w-4/5 mx-auto items-center ">
          <a className="h-full" href="/">
            <img src={logo} alt="" className=" h-full" />
          </a>

          <form className="w-1/2 ml-8">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white border-transparent focus:border-transparent focus:ring-0"
                placeholder="Tìm kiếm tên sản phẩm, nhãn hiệu..."
                required=""
              ></input>
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-[#2f2f2f] hover:bg-[#585858] focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button>
            </div>
          </form>
          <div className="ml-auto flex items-center">
            <div className="relative h-full w-fit">
              {isLogged ? (
                loggedRouter()
              ) : (
                <Link to="/login">
                  <button className="p-2 text-white peer">Đăng nhập</button>
                </Link>
              )}
            </div>
            <Link to="/cart">
              <div className="flex w-fit py-1 px-2 m-4 mr-0 border rounded-xl border-gray-400 relative items-center">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: 'white' }}
                />
                <p className="p-2 text-white hover:text-white cursor-pointer">
                  Giỏ hàng
                  {
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.length}
                    </span>
                  }
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <nav className="w-full bg-neutral-800">
        <div className="flex w-4/5 mx-auto items-center">
          <Link to="/">
            <p className="py-2 px-6 text-lg font-bold uppercase text-white hover:bg-white hover:text-neutral-800">
              Trang chủ
            </p>
          </Link>
          <Link to="/product">
            <p className="py-2 px-6 text-lg font-bold uppercase text-white hover:bg-white hover:text-neutral-800">
              Sản phẩm
            </p>
          </Link>
          <Link to="/info">
            <p className="py-2 px-6 text-lg font-bold uppercase text-white hover:bg-white hover:text-neutral-800">
              Giới thiệu
            </p>
          </Link>
          <Link to="/news">
            <p className="py-2 px-6 text-lg font-bold uppercase text-white hover:bg-white hover:text-neutral-800">
              Tin Tức
            </p>
          </Link>
          <Link to="/contact">
            <p className="py-2 px-6 text-lg font-bold uppercase text-white hover:bg-white hover:text-neutral-800">
              Liên hệ
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default HomeHeader;
