import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios'
function Login() {
  const state = useContext(GlobalState);
  // const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  // const logoutUser = async () => {
  //   // gọi method và xóa session
  //   await axios.get('/user/logout');
  //   localStorage.removeItem('firstLogin');
  //   // trả về trang chủ
  //   window.location.href = '/adminAuthen';
  // };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/login', { ...user });

      localStorage.setItem('firstLogin', true);
      if (isAdmin) {
        alert("Bạn đã đăng nhập bằng quyền ADMIN.")
        window.location.href = "/Dashboard"
      }
      else { window.location.href = "/" }
      // if (isAdmin) {

      //   
      // } else {
      //   window.location.href = "/adminAuthen"
      //   logoutUser()
      //   alert("Đăng nhập thất bại")
      // }
      // window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response.data.msg);


    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
