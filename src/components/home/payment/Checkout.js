import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
// import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
function Checkout() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [users] = state.userAPI.users;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [infor, setInfor] = useState('');
  const [provisional, setProvisional] = useState(0);
  const [discount, setDiscount] = useState(0);
  // const param = useParams();
  const history = useNavigate();

  console.log(users._id)
  console.log("infor", infor)
  // console.log("param.id", param.id)


  // console.log(provisional)



  // console.log("param.id", param.id)
  useEffect(() => {
    if (users._id) {
      setInfor(users);
    } else {
      setInfor("");
    }
    // tạm tính
    const getProvisional = () => {
      const provisional = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setProvisional(provisional);
    };
    getProvisional();
    // tổng thành tiền đã giảm 5%
    const getDiscount = () => {
      const discount = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity * 0.05;
      }, 0);

      setDiscount(discount);
    };
    getDiscount();
    // total
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return (
          prev + item.price * item.quantity - item.price * item.quantity * 0.05
        );
      }, 0);

      setTotal(total);
    };
    getTotal();


  }, [cart, users]);

  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  // const increment = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       item.quantity += 1;
  //     }
  //   });

  //   setCart([...cart]);
  //   addToCart(cart);
  // };

  // const decrement = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
  //     }
  //   });

  //   setCart([...cart]);
  //   addToCart(cart);
  // };

  // const removeProduct = (id) => {
  //   cart.forEach((item, index) => {
  //     if (item._id === id) {
  //       cart.splice(index, 1);
  //     }
  //   });
  //   setCart([...cart]);
  //   addToCart(cart);
  //   let msg = 'Đã bỏ sản phẩm khỏi giỏ hàng .';
  //   toast.error(msg);
  // };

  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setInfor({ ...infor, [name]: value });
  // };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfor({ ...infor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/checkout',
        { ...infor, cart, provisional, total },
        {
          headers: { Authorization: token },
        }
      );
      setCart([]);
      addToCart([]);
      toast.success(res.data.msg);
      history('/cart');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>giỏ hàng trống</h2>
    );
  var formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="w-4/5 mx-auto flex">
      <div className="w-3/6 p-4 border-r border-r-gray-200">
        <p className="uppercase text-xl text-gray-600">Đơn hàng của bạn</p>
        <div className="w-full mt-4 flex border-b border-b-gray-400 border-opacity-50 py-2">
          <p className="uppercase font-bold w-3/4">Sản phẩm</p>
          <p className="uppercase font-bold w-1/4 ml-auto text-right">
            Tạm tính
          </p>
        </div>

        {cart.map((product) => (
          <div
            key={product._id}
            className="w-full flex py-2 border-b border-b-gray-400 border-opacity-30"
          >
            <div className="w-3/4 pr-8">
              <h2>{product.title}</h2>
              <span className="text-lg">{product.name}</span>
              {product.quantity > 1 ? (
                <div>
                  <span> x</span>
                  <span>{product.quantity}</span>
                </div>
              ) : null}
            </div>
            <div className="w-1/4 ml-auto text-right">
              {/* tạm tính tiền từng sản phẩm */}
              <h3>{formatter.format(product.price * product.quantity)}.đ</h3>
            </div>
          </div>
        ))}
        <div className="w-full flex py-2">
          <div className="w-3/4 pr-8 ">
            <p className="py-2 text-lg">Tạm tính</p>
            <p className="py-2 text-lg">Giảm giá thành viên 5%</p>
            <h3 className="py-2 text-lg">Tổng tiền </h3>
          </div>
          <div className="w-1/4 py-2 ml-auto text-right">
            <p className="font-bold py-2 text-lg">
              {formatter.format(`${provisional}`)}.đ
            </p>
            <p className="font-bold py-2 text-lg">

              {formatter.format(`${discount}`)}.đ
            </p>
            <p className="font-bold py-2 text-lg">
              {formatter.format(`${total}`)}.đ
            </p>
          </div>
        </div>
      </div>

      <div className="w-3/6 p-4">
        <div className="w-full h-5 border-b-2 border-neutral-400 text-center">
          <span className="text-neutral-800 font-bold text-2xl bg-white px-4 uppercase">
            Thông tin thanh toán
          </span>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="a">
            <label htmlFor="title">Tên Khách Hàng</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={infor.name}
              onChange={handleChangeInput}
              className="p-2 border-2 my-2 w-full"
            />
          </div>
          <div className="a">
            <label htmlFor="title">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              value={infor.phone}
              onChange={handleChangeInput}
              className="p-2 border-2 my-2 w-full"
            />
          </div>
          <div className="a">
            <label htmlFor="accessories">Địa chỉ</label>
            <textarea
              type="text"
              name="address"
              id="address"
              required
              value={infor.address}
              rows="3"
              onChange={handleChangeInput}
              className="p-2 border-2 my-2 w-full"
            />
          </div>
          {/* <div className="a">
            <label htmlFor="accessories">Ghi chú</label>
            <textarea
              type="text"
                name="address"
                id="address"
                required
                value={infor.address}
              rows="3"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng, chỉ dẫn địa điểm giao hàng..."
                onChange={handleChangeInput}
              className="p-2 border-2 my-2 w-full"
            />
          </div> */}
          <button
            type="submit"
            className="py-2 px-8 mt-4 mb-8 text-white uppercase bg-blue-400 hover:bg-blue-600"
          >
            Đặt hàng
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
