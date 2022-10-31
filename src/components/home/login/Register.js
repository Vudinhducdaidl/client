import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  // const [emailreg, setEmailreg] = useState([]);
  // console.log(emailreg);
  let vl = {
    name: "",
    password: "",
    phone: "",
    otp: "",
    email: "",
  };
  const [user, setUser] = useState(vl);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // const onChangeInputemail = (e) => {
  //   const { name, value } = e.target;
  //   setEmailreg({ ...emailreg, [name]: value });
  // };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/veryOtp", {
        name: user.name,
        password: user.password,
        phone: user.phone,
        otp: user.otp,
        email: user.email,
      });
      alert("thành công ");

      console.log("haha", user.name);

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const res = await axios.post("/user/regisOtp", {
      email: user.email,
    });
    console.log(res.data);
  };

  return (
    <div className='login-page'>
      <form>
        <h2>Đăng kí</h2>
        <input
          type='text'
          name='name'
          required
          placeholder='Name'
          value={user.name}
          onChange={onChangeInput}
        />

        <input
          type='mail'
          name='email'
          required
          placeholder='Email'
          value={user.email}
          onChange={onChangeInput}
        />
        <button onClick={sendOtp}>send OTP</button>
        <div>
          <input
            type='text'
            name='otp'
            required
            placeholder='otp'
            value={user.otp}
            onChange={onChangeInput}
          />
        </div>
        <input
          type='text'
          name='phone'
          required
          placeholder='số điện thoại'
          value={user.phone}
          onChange={onChangeInput}
        />

        <input
          type='password'
          name='password'
          required
          autoComplete='on'
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
        />

        <div className='row'>
          <button onClick={registerSubmit}>Đăng kí</button>
          <Link to='/login'>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
