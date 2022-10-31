import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Header() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [users] = state.userAPI.users
    const [menu, setMenu] = useState(false)
    // const [allusers] = state.userAPI.allusers

    // Đăng xuất
    const logoutUser = async () => {
        // gọi method và xóa session
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        // trả về trang chủ

        isAdmin ? window.location.href = "/detailProduct" : window.location.href = "/";
    };

    // tạo router cho admin
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/statistical">Thống kê</Link></li>
                <li><Link to="/detailProduct"> Sản phẩm</Link></li>
                <li><Link to="/create_product">Tạo sản phẩm mới</Link></li>
                <li><Link to="/category">Danh mục</Link></li>
                <li><Link to="/brand">Nhãn hiệu</Link></li>
                <li><Link to="/slide">Slide</Link></li>
                <li><Link to="/users">Users</Link></li>
            </>
        )
    }
    // tạo router lúc đăng nhập thành công
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">Lịch sử đặt hàng</Link></li>
                <li><Link to="/" onClick={logoutUser}>Đăng xuất</Link></li>
            </>
        )
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (

        <header>
            {/* check nếu là admin thì show ra header admin và ngược lại */}
            {isAdmin ?
                // header admin
                <>
                    <div className="menu" onClick={() => setMenu(!menu)}>
                        <img src={Menu} alt="" width="30" />
                    </div>
                    <div className="logo">
                        <h1>
                            <Link to="/">Admin</Link>
                        </h1>
                    </div>
                    <ul style={styleMenu}>

                        {isAdmin && adminRouter()}
                        {
                            isLogged ? loggedRouter() : <li><Link to="/login">Đăng nhập</Link></li>
                        }
                        <li onClick={() => setMenu(!menu)}>
                            <img src={Close} alt="" width="30" className="menu" />
                        </li>
                    </ul>
                </> : <>
                    {/* header user */}
                    <div className="menu" onClick={() => setMenu(!menu)}>
                        <img src={Menu} alt="" width="30" />
                    </div>
                    <div className="logo">
                        <h1>
                            <Link to="/">5ABMT</Link>
                        </h1>
                    </div>
                    <ul style={styleMenu}>
                        <li><Link to={`/profile/${users._id}`}>profile</Link></li>
                        {isAdmin && adminRouter()}

                        {
                            isLogged ? loggedRouter() : <li><Link to="/login">Đăng nhập</Link></li>
                        }
                        <li onClick={() => setMenu(!menu)}>
                            <img src={Close} alt="" width="30" className="menu" />
                        </li>
                    </ul>
                    {
                        <div>
                            <div className="cart-icon">
                                <span>{cart.length}</span>
                                <Link to="/cart">
                                    <img src={Cart} alt="" width="30" />
                                </Link>
                            </div>
                        </div>
                    }
                    {/* xuất ra tên user đăng nhập */}
                    <h1 >{users.name}</h1>
                </>
            }
        </header>
    )
}

export default Header
