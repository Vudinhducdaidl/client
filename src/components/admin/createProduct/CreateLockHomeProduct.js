import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  model: '',
  price: 0,
  accessories: 'một sản phẩm , 2 chía khóa , ốc.',
  countInStock: 0,
  insurance: 0,
  category: '',
  oem: '',
  color: '',
  weight: '',
  size: '',
  _id: '',
};

function CreateLockHomeProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [brands] = state.brandsAPI.brands;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const history = useNavigate();
  const param = useParams();
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  const [lockHome] = state.lockhomeAPI.lockhome;

  const [lockHomeDetail, setLockHomeDetail] = useState([]);

  // console.log("product nè", product)
  // console.log("lockHomeDetail nè", lockHomeDetail)

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
        lockHome.forEach((lockhome) => {
          if (lockhome.idProduct === param.id) setLockHomeDetail(lockhome);
          // console.log('vô rồi', lockhome);
        });
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products, lockHome]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
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
      if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleChangeInputDT = (e) => {
    const { name, value } = e.target;
    setLockHomeDetail({ ...lockHomeDetail, [name]: value });
    // console.log(cameraDetail)
  };
  // const handleChangeInputDTDT = (e) => {
  //   const { name, value } = e.target;

  //   console.log("name, value", name, value)
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải là quản trị viên.');
      if (!images) return alert('Không có hình ảnh tải lên.');

      if (onEdit) {
        const res = await axios.put(
          `/api/products_lockHome/${product._id}`,
          { ...lockHomeDetail, ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
      } else {
        const res = await axios.post(
          '/api/products_lockHome',
          { ...lockHomeDetail, ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(res.data.msg);
      }
      setCallback(!callback);
      // gọi đến trang =>>
      history('/dashboard/detailProduct');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  return (
    <>
      <div className="w-full p-4 text-center">
        <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
          Tạo sản phẩm: Khóa nhà
        </p>
        <div className="create_product flex" key={product.id}>
          <div className="upload w-[30rem] h-[30rem]">
            <p>Hình sản phẩm</p>
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

          <form onSubmit={handleSubmit} className="flex-grow">
            {/* thong tin chung */}
            <p className="py-2 px-4 text-center uppercase font-bold text-lg border-b-2 mb-4">
              Thông tin chung
            </p>
            <div className="w-full">
              <div className="row w-full px-4">
                <p className="">Tên sản phẩm</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={product.name}
                  onChange={handleChangeInput}
                  className="p-2 border-2 my-2 w-full"
                />
              </div>
              <div className="w-full flex">
                <div className="w-1/3 px-4">
                  <div className="row">
                    <p className="">Model</p>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      required
                      value={product.model}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">OEM</p>
                    <input
                      type="text"
                      name="oem"
                      id="oem"
                      required
                      value={product.oem}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Màu sắc</p>
                    <input
                      type="text"
                      name="color"
                      id="color"
                      required
                      value={product.color}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Đi kèm</p>
                    <textarea
                      type="text"
                      name="accessories"
                      id="accessories"
                      required
                      value={product.accessories}
                      rows="4"
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4">
                  <div className="row">
                    <p className="">Tổng sản phẩm có trong kho</p>
                    <input
                      type="number"
                      name="countInStock"
                      id="countInStock"
                      required
                      value={product.countInStock}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Bảo hành (tháng):</p>
                    <input
                      type="number"
                      name="insurance"
                      id="insurance"
                      required
                      value={product.insurance}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Tính năng</p>
                    <input
                      type="text"
                      name="feature"
                      id="feature"
                      required
                      value={product.feature}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Chất liệu</p>
                    <input
                      type="text"
                      name="material"
                      id="material"
                      required
                      value={product.material}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">WI-Fi/ Buletooth/Zigbee</p>
                    <input
                      type="text"
                      name="connection"
                      id="connection"
                      required
                      value={product.connection}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                </div>
                <div className="w-1/3 px-4">
                  <div className="row">
                    <p className="">Kích thước</p>
                    <input
                      type="text"
                      name="size"
                      id="size"
                      required
                      value={product.size}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    <p className="">Giá</p>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      value={product.price}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                  <div className="row">
                    {/* map data cho danh mục */}
                    <p className="">Danh Mục</p>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <p className="">Nhãn hiệu</p>
                    {/* map data cho nhãn hiệu */}
                    <select
                      name="brand"
                      value={product.brand}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    >
                      <option value="">Chọn nhãn hiệu</option>
                      {brands.map((brand) => (
                        <option value={brand._id} key={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <p className="">Cân nặng</p>
                    <input
                      type="text"
                      name="weight"
                      id="weight"
                      required
                      value={product.weight}
                      onChange={handleChangeInput}
                      className="p-2 border-2 my-2 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Khoa nha */}
            <p className="py-2 text-center uppercase font-bold text-lg border-b-2 mb-4">
              Thông tin khác
            </p>
            <div className="w-full flex">
              <div className="w-1/3 px-4">
                <div className="row">
                  <p>Mở Khóa bằng vân tay</p>
                  <select className="p-2 border-2 my-2 w-full" name='fingerprintLock'
                    value={lockHomeDetail.fingerprintLock} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>
                {/*  */}
                <div className="row">
                  <p>Mở khóa bằng thẻ từ</p>
                  <select className="p-2 border-2 my-2 w-full" name='magneticCartLock'
                    value={lockHomeDetail.magneticCartLock} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>
                {/*  */}
                <div className="row">
                  <p>Mở khóa bằng app</p>
                  <input
                    type="text"
                    name="appLock"
                    id="appLock"
                    required
                    value={lockHomeDetail.appLock}
                    onChange={handleChangeInputDT}
                    className="p-2 border-2 my-2 w-full"
                  />
                </div>

                <div className="row">
                  <p>Mở khóa bằng mật khẩu</p>
                  <select className="p-2 border-2 my-2 w-full" name='keyLock'
                    value={lockHomeDetail.keyLock} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>
                {/*  */}
              </div>

              <div className="w-1/3 px-4">
                <div className="row">
                  <p>Sử dụng pin</p>
                  <input
                    type="text"
                    name="battery"
                    id="battery"
                    required
                    value={lockHomeDetail.battery}
                    onChange={handleChangeInputDT}
                    className="p-2 border-2 my-2 w-full"
                  />
                </div>

                {/*  */}
                <div className="row">
                  <p>Độ dày cửa yêu cầu</p>
                  <input
                    type="text"
                    name="doorThickness"
                    id="doorThickness"
                    required
                    value={lockHomeDetail.doorThickness}
                    onChange={handleChangeInputDT}
                    className="p-2 border-2 my-2 w-full"
                  />
                </div>
                <div className="row">
                  <p>Độ sâu cửa yêu cầu</p>
                  <input
                    type="text"
                    name="doorDepth"
                    id="doorDepth"
                    required
                    value={lockHomeDetail.doorDepth}
                    onChange={handleChangeInputDT}
                    className="p-2 border-2 my-2 w-full"
                  />
                </div>
                <div className="row">
                  <p>Số lượng người dùng</p>
                  <input
                    type="text"
                    name="userLimit"
                    id="userLimit"
                    required
                    value={lockHomeDetail.userLimit}
                    onChange={handleChangeInputDT}
                    className="p-2 border-2 my-2 w-full"
                  />
                </div>
              </div>
              <div className="w-1/3 px-4">
                <div className="row">
                  <p>Hỗ Trợ Alexa Google Home Siri</p>
                  <select className="p-2 border-2 my-2 w-full" name='supportalexagooglehomesiri'
                    value={lockHomeDetail.supportalexagooglehomesiri} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>

                <div className="row">
                  <p>Chia sẻ mật khẩu</p>
                  <select className="p-2 border-2 my-2 w-full" name='shareEkeyCode'
                    value={lockHomeDetail.shareEkeyCode} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>

                <div className="row">
                  <p>Xem mặt qua khóa</p>
                  <select className="p-2 border-2 my-2 w-full" name='videoDoorbell'
                    value={lockHomeDetail.videoDoorbell} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>
                <div className="row">
                  <p>Đàm thoại hai chiều</p>
                  <select className="p-2 border-2 my-2 w-full" name='twoWayTalk'
                    value={lockHomeDetail.twoWayTalk} onChange={handleChangeInputDT}>
                    <option value="" >------lựa chọn------</option>
                    <option value={true} >có</option>
                    <option value={false} key={false}>không</option>
                  </select>
                </div>
              </div>
            </div>
            {/* kết */}
            <button
              type="submit"
              className="py-2 px-8 mt-4 mb-8 text-white uppercase bg-gray-600 hover:bg-gray-800"
            >
              {onEdit ? 'Sửa' : 'Thêm'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateLockHomeProduct;
