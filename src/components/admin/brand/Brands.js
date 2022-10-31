import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Brands() {
  const state = useContext(GlobalState);
  const [brands] = state.brandsAPI.brands;
  const [brand, setBrand] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.brandsAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  // console.log("brand", brands)

  const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/api/brand/${id}`, { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
        // alert(res.data.msg)
      } else {
        const res = await axios.post('/api/brand', { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
        // alert(res.data.msg)
      }
      setOnEdit(false);
      setBrand('');
      setCallback(!callback);
    } catch (err) {
      // alert(err.response.data.msg)
      toast.error(err.response.data.msg);
    }
  };
  const editBrand = async (id, name) => {
    setID(id);
    setBrand(name);
    setOnEdit(true);
  };
  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(`/api/brand/${id}`, {
        headers: { Authorization: token },
      });
      toast.error(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="">
      <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
        Danh sách nhãn hiệu
      </p>
      <form onSubmit={createBrand} className="mb-4 text-center">
        <label className="font-bold text-xl">Thêm nhãn hiệu mới</label>
        <input
          className="p-2 border-2 mx-4 w-1/4"
          type="text"
          name="category"
          value={brand}
          required
          onChange={(e) => setBrand(e.target.value)}
        />

        <button
          className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
          type="submit"
        >
          {onEdit ? 'Sửa' : 'Thêm'}
        </button>
      </form>
      {/* đổ dữ liệu vào table */}
      <table className="w-1/2 mx-auto">
        <tr>
          <th>Tên nhãn hiệu</th>
          <th>Hành động</th>
        </tr>
        {brands.map((brand) => (
          <tr>
            <td>{brand.name}</td>
            <td>
              <div>
                <button
                  onClick={() => editBrand(brand._id, brand.name)}
                  className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800 mx-4"
                >
                  Sửa
                </button>
                <button
                  onClick={() => deleteBrand(brand._id)}
                  className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
                >
                  Xóa
                </button>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <ToastContainer />
    </div>
  );
}

export default Brands;
