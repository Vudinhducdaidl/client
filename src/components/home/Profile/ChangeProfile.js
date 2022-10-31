// import React, { useContext, useState } from 'react';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../admin/utils/loading/Loading';
function ChangeProfile() {
  const state = useContext(GlobalState);
  const [users] = state.userAPI.users;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);
  const [token] = state.token;
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      if (users._id === param.id) {
        setProfile(users);
        setImages(users.images)
      } else {
        setProfile("");
      }
    }
  }, [param.id, users])

  const history = useNavigate();
  // const aaaa = setImages(users.images)
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/updateprofile/${users._id}`, { ...profile, images },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);
      history(`/profile/${users._id}`);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert('Tệp không tồn tại.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Kích thước quá lớn!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('Định dạng tệp không chính xác.');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/uploaduser', formData, {
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
      setLoading(true);
      await axios.post('/api/destroyuser', { public_id: images.public_id },
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
    <div className="w-4/5 mx-auto mt-8 mb-4">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-[2rem]">Thay đổi hồ sơ </h1>
        <hr />


        {/* hình ảnh */}

        <div className="upload w-[30rem] h-[30rem]">
          <p>avatar</p>
          <input
            type="file"
            name="file"
            id="file_up"
            onChange={handleUpload}
          />
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
        {/* end */}


        <div className="my-2">
          <p className="uppercase">Tên người dùng</p>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={profile.name}
            onChange={handleChangeInput}
            className="p-2 border-2 my-2 w-1/3"
          />
        </div>

        <div className="my-2">
          <p className="uppercase">Email</p>
          <input
            type="text"
            name="email"
            id="email"
            required
            value={profile.email}
            onChange={handleChangeInput}
            className="p-2 border-2 my-2 w-1/3"
          />
        </div>
        <div className="my-2">
          <p className="uppercase">Số điện thoại</p>
          <input
            type="text"
            name="phone"
            id="phone"
            required
            value={profile.phone}
            onChange={handleChangeInput}
            className="p-2 border-2 my-2 w-1/3"
          />
        </div>
        <div className="my-2">
          <p className="uppercase">Địa chỉ</p>
          <input
            type="text"
            name="address"
            id="address"
            value={profile.address}
            onChange={handleChangeInput}
            className="p-2 border-2 my-2 w-1/3"
          />
        </div>
        <button
          className="uppercase py-2 px-8 mr-4 text-white bg-blue-400 hover:bg-blue-600"
          type="submit"
        >
          Lưu
        </button>
      </form>
    </div>
  );
}

export default ChangeProfile;
