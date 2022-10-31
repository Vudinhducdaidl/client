import React, { useState, useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../utils/loading/Loading';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Slide() {
  const state = useContext(GlobalState);
  const [slides] = state.slideAPI.slides;
  const [slide, setSlide] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.slideAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const [isAdmin] = state.userAPI.isAdmin;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const param = useParams();


  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      slides.forEach((slide) => {
        if (slide._id === param.id) {
          setSlide(slide);
          setImages(slide.images);
        }
      });
    } else {
      setOnEdit(false);
      setSlide('');
      setImages(false);
    }
  }, [param.id, slides]);

  const createSlide = async (e) => {
    e.preventDefault();
    try {
      // kiểm tra phân quyền
      if (!isAdmin) return alert('Bạn không phải là quản trị viên');
      // kiểm tra đã tải hình ảnh lên chưa
      if (!images) return alert('Không có hình ảnh tải lên');
      // nhận vào sự kiện nếu đúng thì sửa nếu sai thì thêm
      if (onEdit) {
        const res = await axios.put(
          `/api/slide/${id}`,
          { name: slide, images },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);

        // alert(res.data.msg)
      } else {
        const res = await axios.post(
          '/api/slide',
          { name: slide, images },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);

        // alert(res.data.msg)
      }
      setOnEdit(false);
      setSlide('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editSlide = async (id, name, images) => {
    setID(id);
    setSlide(name, images);
    setImages(images);
    setOnEdit(true);
  };
  // xóa dựa trên id đã lấy lại đc
  const deleteSlide = async (id) => {
    try {
      const res = await axios.delete(`/api/slide/${id}`, {
        headers: { Authorization: token },
      });
      // alert(res.data.msg)
      toast.error(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const styleUpload = {
    display: images ? 'block' : 'none',
  };
  return (
    <div className="">
      <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
        Slide trang chủ
      </p>
      <div className="flex mb-8 items-center justify-center">
        <div className="uploadSlide">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>
        <form onSubmit={createSlide} className="align-middle">
          <label className="font-bold text-xl">Tên slide</label>
          <input
            className="p-2 border-2 mx-4 w-1/2"
            type="text"
            name="category"
            value={slide}
            required
            onChange={(e) => setSlide(e.target.value)}
          />

          <button
            className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800"
            type="submit"
          >
            {onEdit ? 'Sửa' : 'Thêm'}
          </button>
        </form>
      </div>

      {/* đổ dữ liệu vào table */}
      <table className="w-1/2 mx-auto">
        <tr>
          <th>Tên slide</th>
          <th>Ảnh</th>
          <th>Hành động</th>
        </tr>
        {slides.map((slide) => (
          <tr>
            <td>{slide.name}</td>
            <td>
              <img className="imgslide" src={slide.images.url} alt="" />
            </td>
            <td>
              <div>
                <button
                  onClick={() => editSlide(slide._id, slide.name, slide.images)}
                  className="py-2 px-4 text-white bg-gray-600 hover:bg-gray-800 mx-4"
                >
                  Sửa
                </button>
                <button
                  onClick={() => deleteSlide(slide._id)}
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

export default Slide;
