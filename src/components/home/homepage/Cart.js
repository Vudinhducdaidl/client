import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import PaypalButton from './PaypalButton'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [provisional, setProvisional] = useState(0);
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    // giảm giá
    const getDiscount = () => {
      const discount = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity * 0.05;
      }, 0);

      setDiscount(discount);
    };
    getDiscount();
    // tạm tính
    const getProvisional = () => {
      const provisional = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setProvisional(provisional);
    };
    getProvisional();

    // tổng thành tiền đã trừ 5%
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return (
          prev + item.price * item.quantity - item.price * item.quantity * 0.05
        );
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart, discount]);

  // add card

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart',
      { cart }, {
      headers: { Authorization: token },
    }


    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
    let msg = 'Đã bỏ sản phẩm khỏi giỏ hàng .';
    toast.error(msg);
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
    <div className="w-4/5 mx-auto">
      {/* Title */}
      <div className="w-full mt-4 mb-8">
        <div className="w-full h-5 border-b-2 border-neutral-400 text-center">
          <span className="text-neutral-800 font-bold text-2xl bg-white px-4 uppercase">
            Giỏ hàng
          </span>
        </div>
      </div>
      <div className="w-full px-4 pb-4">
        <div className="w-full pr-4 border-b border-r-gray-300">
          <div className="w-full py-4 flex border-b border-b-gray-300">
            <p className="uppercase font-bold w-3/5 text-center">sản phẩm</p>
            <div className="w-2/5 flex text-center">
              <p className="uppercase font-bold w-1/3">giá</p>
              <p className="uppercase font-bold w-1/3">số lượng</p>
              <p className="uppercase font-bold w-1/3">tạm tính</p>
            </div>
          </div>
          {cart.map((product) => (
            <div className="w-full flex" key={product._id}>
              <div className="w-3/5 flex items-center">
                <button
                  className="w-7 h-7 text-sm border border-gray-400 rounded-full"
                  onClick={() => removeProduct(product._id)}
                >
                  X
                </button>
                <div className="w-32 h-32 p-2 text-center items-center justify-center overflow-hidden">
                  <img
                    className="min-h-full min-w-full"
                    src={product.images.url}
                    alt=""
                  />
                </div>
                <p className="p-4">{product.name}</p>
              </div>
              <div className="w-2/5 flex items-center text-center">
                <div className="w-1/3">
                  <h3>{formatter.format(product.price)}.đ</h3>
                </div>
                <div className="w-1/3 flex justify-center">
                  <button
                    className="p-2 border border-gray-400 bg-slate-200"
                    onClick={() => decrement(product._id)}
                  >
                    -
                  </button>
                  <span className="text-center p-2 border-y border-gray-400 w-14 focus:outline-none">
                    {product.quantity}
                  </span>
                  <button
                    className="p-2 border border-gray-400 bg-slate-200"
                    onClick={() => increment(product._id)}
                  >
                    +
                  </button>
                </div>
                {/* tạm tính từng sản phẩm */}
                <div className="w-1/3">
                  <div className="">
                    <h3>
                      {formatter.format(product.price * product.quantity)}.đ
                    </h3>
                    {/* <p>Mô tả : {product.description}</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex">
          <Link to="/product" className="h-fit">
            <button className="py-2 px-4 text-white bg-gray-800 mt-4 rounded-full">
              <FontAwesomeIcon icon={faArrowCircleLeft} />
              <span className="ml-2 uppercase">Tiếp tục mua hàng</span>
            </button>
          </Link>

          <div className="w-2/5 ml-auto">
            <div className="w-full flex py-2">
              <p>Tạm tính</p>
              <p className="ml-auto font-bold">
                {formatter.format(`${provisional}`)}.đ
              </p>
            </div>
            <div className="w-full flex py-2">
              <p>Giảm giá thành viên 5%</p>
              <p className="ml-auto font-bold">
                {' '}
                {formatter.format(`${discount}`)}.đ
              </p>
            </div>
            <div className="w-full flex py-2">
              <p>Tổng</p>
              <p className="ml-auto font-bold">
                {formatter.format(`${total}`)}.đ
              </p>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-red-600 py-2 px-4 text-center text-white uppercase hover:bg-red-800">
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
