import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/checkout', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="">
      <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
        Danh sách đơn hàng
      </p>

      <h4>Bạn có {history.length} đơn đặt hàng</h4>

      <table className="w-full mt-4">
        <thead>
          <tr>
            <th></th>
            <th>Người đặt hàng</th>
            <th>Số điên thoại</th>
            <th>email</th>
            <th>Địa chỉ nhận hàng</th>
            <th>Phương thức thanh toán</th>
            <th>Ngày mua</th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => (
            <tr key={items._id}>
              <td>
                <Link to={`/dashboard/history/${items._id}`}>View</Link>
              </td>
              <td>{items.name}</td>
              <td>{items.phone}</td>
              <td>{items.email}</td>
              <td>{items.address}</td>
              <td>nhận hàng thanh toán</td>
              <td>{new Date(items.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
