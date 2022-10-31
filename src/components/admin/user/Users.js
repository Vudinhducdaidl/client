import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// admin update role

function Users() {
  const state = useContext(GlobalState);
  const [allusers] = state.userAPI.allusers;
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [role, setRole] = useState('');
  const [id, setID] = useState('');
  const update = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/updateuser/${id}`, { role: role },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);

      // alert(res.data.msg);
      setRole('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editUser = async (id, role) => {
    setID(id);
    setRole(role);
    update();
  };

  return (
    <div className="">
      <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
        Tài khoản
      </p>
      {/* đổ dữ liệu vào table */}
      <form onSubmit={update} className="mb-4 text-center">
        <label className="font-bold text-xl">Phân quyền</label>
        <select
          className="p-2 border-2 mx-4 w-1/4"
          name="user"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Phân quyền</option>
          <option value={1} key={allusers._id}>
            Admin
          </option>
          <option value={0} key={allusers._id}>
            User
          </option>
        </select>

        <button
          className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
          type="submit"
        >
          {editUser} Sửa
        </button>
      </form>
      <table className="w-1/2 mx-auto">
        <tr>
          <th>ID</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          {/* <th>Ngày tạo</th> */}
          <th>Phân quyền</th>
          <th>Hành động</th>
        </tr>
        {allusers.map((users) => (
          <tr>
            {/*cắt ngắn kí tự bằng hàm :".substring(20, 24)"  */}
            <td>{users._id.substring(20, 24)}</td>
            <td>{users.name}</td>
            <td>{users.email}</td>
            <td>{users.phone}</td>
            {/* <td>{users.createdAt}</td> */}
            <td>{users.role === 1 ? 'admin' : 'user'}</td>
            <td>
              <button
                className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
                onClick={() => editUser(users._id, users.role)}
              >
                Sửa
              </button>
            </td>
          </tr>
        ))}
      </table>
      <ToastContainer />
    </div>
  );
}

export default Users;
