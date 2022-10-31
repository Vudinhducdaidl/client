import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
        // alert(res.data.msg)
      } else {
        const res = await axios.post(
          '/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
        // alert(res.data.msg)
      }
      setOnEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (err) {
      // alert(err.response.data.msg)
      toast.error(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      toast.error(res.data.msg);
      // alert(res.data.msg)
      setCallback(!callback);
    } catch (err) {
      // alert(err.response.data.msg)
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-full">
      <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
        Danh sách danh mục
      </p>
      <form onSubmit={createCategory} className="mb-4 text-center">
        <label className="font-bold text-xl">Thêm danh mục mới</label>
        <input
          className="p-2 border-2 mx-4 w-1/3"
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          type="submit"
          className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
        >
          {onEdit ? 'Sửa' : 'Thêm'}
        </button>
      </form>

      <table className="w-1/2 mx-auto">
        <tr>
          <th>Tên category</th>
          <th>Hành động</th>
        </tr>
        {categories.map((category) => (
          <tr>
            <td>{category.name}</td>

            <td>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                  className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800 mx-4"
                >
                  Sửa
                </button>
                <button
                  onClick={() => deleteCategory(category._id)}
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

export default Categories;
