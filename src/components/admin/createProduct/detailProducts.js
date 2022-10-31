import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from '../products/Filters';
import LoadMore from '../products/LoadMoreADMIN';
import BtnRender from '../utils/productItem/BtnRender';
import { toast } from 'react-toastify';
import downArrow from '../image/svg/down-arrow.svg';


function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [brands] = state.brandsAPI.brands;
  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [lockhotel] = state.lockHotelAPI.lockhotel;
  const [camera] = state.cameraAPI.camera;
  const [smartHome] = state.smartHomeAPI.smartHome;
  const [lockHome] = state.lockhomeAPI.lockhome;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [myStyle, setMyStyle] = useState(false);
  const [detailSmart, setDetailSmart] = useState([]);
  const [detailcamera, setDetailcamera] = useState([]);
  const [detaillockhome, setDetaillockhome] = useState([]);
  const [detaillockht, setDetaillockht] = useState([]);

  // chuyển đổi category trong product thành tên
  const getCategoryNameById = (id) => {
    var result = categories.filter((obj) => {
      return obj._id === id;
    });
    var cate = result[0];
    return cate.name;
  };
  // chuyển đổi id brand trong product thành tên
  const getBrandNameById = (id) => {
    var result = brands.filter((obj) => {
      return obj._id === id;
    });
    var bran = result[0];
    return bran.name;
  };

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  // xóa sản phẩm
  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post('/api/destroy', { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      toast.error((await deleteProduct).data.msg);

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      // alert(err.response.data.msg)
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };
  // xóa tất cả các sản phẩm đã được chọn
  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };
  // fomat tiền
  var formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
  });
  // checkloading
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  // check id detail
  const expand = (id) => {
    setMyStyle((prevState) => ({
      ...myStyle,
      [id]: !prevState[id],
    }));
  };
  // update outstanding
  const handleChangeInputDT = async (id, outstanding) => {
    products.forEach(async (product) => {
      if (product._id === id) {
        if (outstanding === false) {
          try {
            const res = await axios.put(`/api/products_outstanding/${id}`, { outstanding: true }, {
              headers: { Authorization: token },
            }
            );
            toast.success(res.data.msg);
            setCallback(!callback);
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        } else {
          try {
            const res = await axios.put(`/api/products_outstanding/${id}`, { outstanding: false }, {
              headers: { Authorization: token },
            }
            );
            toast.success(res.data.msg);
            setCallback(!callback);
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      }
    });
  }

  const idproduct = (id, type) => {
    // setDeType(type)
    if (type === "lockhotel") {
      lockhotel.forEach((lockht) => {
        if (lockht.idProduct === id) setDetaillockht(lockht);
      })
    } else if (type === "SmartHome") {
      smartHome.forEach((smartHome) => {
        if (smartHome.idProduct === id) setDetailSmart(smartHome);
      })
    } else if (type === "camera") {
      camera.forEach((camera) => {
        if (camera.idProduct === id) setDetailcamera(camera);
      })
    } else if (type === "lock") {
      lockHome.forEach((lockhome) => {
        if (lockhome.idProduct === id) setDetaillockhome(lockhome);
      })
    }
  }

  return (
    <>
      {/*tìm kiếm */}
      <Filters />
      {/* Bang san pham */}
      <table className='w-full'>
        <thead>
          <tr>
            <th>Chọn</th>
            <th></th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Model</th>
            <th>Price</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Nhãn hiệu</th>
            <th>Nổi bật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <>
              <tr>
                <td>
                  {isAdmin && (
                    <input
                      type="checkbox"
                      checked={product.checked}
                      onChange={() => handleCheck(product._id)}
                    />
                  )}
                </td>
                {/* nut hien chi tiet san pham */}
                <td>
                  <button onClick={() => idproduct(product._id, product.type)}>
                    <button onClick={() => expand(i)}>
                      <img src={downArrow} alt="" className="w-3/5 mx-auto" />
                      {/* <span>{product._id}</span> */}
                    </button>
                  </button>
                </td>
                <td>
                  <img className="imgslide" src={product.images.url} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.model}</td>
                <td>
                  <span>{formatter.format(product.price)} .đ</span>
                </td>
                <td>{product.countInStock}</td>
                <td>{getCategoryNameById(product.category)}</td>
                <td>{getBrandNameById(product.brand)}</td>
                <td>
                  <input
                    type="checkbox"

                    onClick={() => handleChangeInputDT(product._id, product.outstanding)}
                    checked={product.outstanding}
                  // onChange={() => handleCheckoutstanding(product._id)}
                  />

                </td>
                <td>
                  <BtnRender product={product} deleteProduct={deleteProduct} />
                </td>
              </tr>
              {/* chi tiet san pham */}
              {
                product.type === "lockhotel" ?
                  <tr>
                    <td
                      colSpan="11"
                      key={i}
                      style={{
                        display: myStyle[`${i}`] ? 'table-cell' : 'none',
                      }}
                    >
                      <div className="text-left">
                        <p className="font-bold text-lg p-2">Chi tiết sản phẩm khóa khách sản</p>
                        <div className="flex w-full">
                          <div className="w-1/4 border-r-2 px-2">
                            <p className="">Sản xuất tại: {product.oem}</p>
                            <p className="">Màu sắc: {product.color}</p>
                            <p className="">Trọng lượng: {product.weight}</p>
                            <p className="">kích cỡ: {product.size}</p>
                            <p className="">Phụ kiện: {product.accessories}</p>
                          </div>
                          <div className="w-1/4 border-r-2 px-2">
                            <p className="">Bảo hành: {product.insurance} tháng</p>
                            <p className="">Chất liệu: {product.material}</p>
                            <p className="">Tính năng: {product.feature}</p>
                            <p className="">Đã bán: {product.sold}</p>
                            <p className="">Kết nối: {product.connection}</p>

                          </div>
                          <div className="w-1/4 border-r-2 px-2">
                            <p className="">Mở bằng khóa vân tay: {detaillockht.fingerprintLock === true ? 'có' : 'không'}</p>
                            <p className="">Mở bằng app: {detaillockht.appLock}</p>
                            <p className="">Mở bằng thẻ từ: {detaillockht.magneticCartLock === true ? 'có' : 'không'}</p>
                            <p className="">Mở bằng mật khẩu: {detaillockht.keyLock === true ? 'có' : 'không'}</p>
                            <p className="">Sử dụng pin: {detaillockht.battery}</p>

                          </div>
                          <div className="w-1/4 border-r-2 px-2">
                            <p className="">Số chìa khóa cơ: {detaillockht.mechanical}</p>
                            <p className="">Độ dày yêu cầu: {detaillockht.doorThickness}</p>
                            <p className="">Độ sâu yêu cầu: {detaillockht.doorDepth}</p>
                            <p className="">Hoạt động với phầm mềm hotell: {detaillockht.Workswithhotelsoftware === true ? 'có' : 'không'}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  :
                  product.type === "SmartHome" ?
                    <tr>
                      <td
                        colSpan="11"
                        key={i}
                        style={{
                          display: myStyle[`${i}`] ? 'table-cell' : 'none',
                        }}
                      >
                        <div className="text-left">
                          <p className="font-bold text-lg p-2">Chi tiết sản phẩm nhà thông minh</p>
                          <div className="flex w-full">
                            <div className="w-1/4 border-r-2 px-2">
                              <p className="">Sản xuất tại: {product.oem}</p>
                              <p className="">Màu sắc: {product.color}</p>
                              <p className="">Trọng lượng: {product.weight}</p>
                              <p className="">kích cỡ: {product.size}</p>
                            </div>
                            <div className="w-1/4 border-r-2 px-2">
                              <p className="">Phụ kiện: {product.accessories}</p>
                              <p className="">Bảo hành: {product.insurance} tháng</p>
                              <p className="">Chất liệu: {product.material}</p>
                              <p className="">Tính năng: {product.feature}</p>
                            </div>
                            <div className="w-1/4 border-r-2 px-2">
                              <p className="">Đã bán: {product.sold}</p>
                              <p className="">Kết nối: {product.connection}</p>
                              <p className="">Mở bằng app: {detailSmart.appLock}</p>
                              <p className="">Hỗ trợ googlehomesiri: {detailSmart.supportalexagooglehomesiri === true ? 'có' : 'không'}</p>
                            </div>
                            <div className="w-1/4 border-r-2 px-2">
                              <p className="">Báo động qua app: {detailSmart.alarmViaApp === true ? 'có' : 'không'}</p>
                              <p className="">Chia sẻ người dùng: {detailSmart.usersharing === true ? 'có' : 'không'}</p>
                              <p className="">Dòng Điện: {detailSmart.electric}</p>
                              <p className="">Dòng tải: {detailSmart.loadCurrent}</p>

                            </div>

                          </div>
                        </div>
                      </td>
                    </tr>
                    : product.type === "camera" ?
                      <tr>
                        <td
                          colSpan="11"
                          key={i}
                          style={{
                            display: myStyle[`${i}`] ? 'table-cell' : 'none',
                          }}
                        >
                          <div className="text-left">
                            <p className="font-bold text-lg p-2">Chi tiết sản phẩm camera</p>
                            <div className="flex w-full">
                              <div className="w-1/4 border-r-2 px-2">
                                <p className="">Sản xuất tại: {product.oem}</p>
                                <p className="">Màu sắc: {product.color}</p>
                                <p className="">Trọng lượng: {product.weight}</p>
                                <p className="">kích cỡ: {product.size}</p>
                                <p className="">Phụ kiện: {product.accessories}</p>
                              </div>
                              <div className="w-1/4 border-r-2 px-2">
                                <p className="">Bảo hành: {product.insurance} tháng</p>
                                <p className="">Chất liệu: {product.material}</p>
                                <p className="">Tính năng: {product.feature}</p>
                                <p className="">Đã bán: {product.sold}</p>
                              </div>
                              <div className="w-1/4 border-r-2 px-2">
                                <p className="">Kết nối: {product.connection}</p>
                                <p className="">Độ phân giải: {detailcamera.resolution}</p>
                                <p className="">Microphone/ Speaker: {detailcamera.microphonespeaker}</p>
                                <p className="">mở bằng app: {detailcamera.appLock}</p>
                              </div>
                              <div className="w-1/4 border-r-2 px-2">
                                <p className="">Báo động qua app: {detailcamera.alarmViaApp === true ? 'có' : 'không'}</p>
                                <p className="">Hỗ Trợ Alexa Google Home Siri: {detailcamera.supportalexagooglehomesiri === true ? 'có' : 'không'}</p>
                                <p className="">Chia Sẻ Người Dùng: {detailcamera.usersharing === true ? 'có' : 'không'}</p>
                                <p className="">Power Source: {detailcamera.PowerSource}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      : product.type === "lock" ?
                        <tr>
                          <td
                            colSpan="11"
                            key={i}
                            style={{
                              display: myStyle[`${i}`] ? 'table-cell' : 'none',
                            }}
                          >
                            <div className="text-left">
                              <p className="font-bold text-lg p-2">Chi tiết sản phẩm khóa thông minh</p>
                              <div className="flex w-full">
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Sản xuất tại: {product.oem}</p>
                                  <p className="">Màu sắc: {product.color}</p>
                                  <p className="">Trọng lượng: {product.weight}</p>
                                  <p className="">kích cỡ: {product.size}</p>
                                  <p className="">Phụ kiện: {product.accessories}</p>
                                  <p className="">Bảo hành: {product.insurance} tháng</p>
                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Chất liệu: {product.material}</p>
                                  <p className="">Tính năng: {product.feature}</p>
                                  <p className="">Đã bán: {product.sold}</p>
                                  <p className="">Kết nối: {product.connection}</p>
                                  <p className="">Mở bằng khóa vân tay: {detaillockhome.fingerprintLock === true ? 'có' : 'không'}</p>
                                  <p className="">Mở bằng app: {detaillockhome.appLock}</p>

                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Mở bằng thẻ từ: {detaillockhome.magneticCartLock === true ? 'có' : 'không'}</p>
                                  <p className="">Mở bằng mật khẩu: {detaillockhome.keyLock === true ? 'có' : 'không'}</p>
                                  <p className="">Sử dụng pin: {detaillockhome.battery}</p>
                                  <p className="">Số chìa khóa cơ: {detaillockhome.mechanical}</p>
                                  <p className="">Độ dày yêu cầu: {detaillockhome.doorThickness}</p>
                                  <p className="">Độ sâu yêu cầu: {detaillockhome.doorDepth}</p>
                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Số lượng người dùng: {detaillockhome.userLimit}</p>
                                  <p className="">Hỗ Trợ Alexa Google Home Siri: {detaillockhome.supportalexagooglehomesiri === true ? 'có' : 'không'}</p>
                                  <p className="">Chia sẻ mật khẩu: {detaillockhome.shareEkeyCode === true ? 'có' : 'không'}</p>
                                  <p className="">Xem mặt qua khóa: {detaillockhome.videoDoorbell === true ? 'có' : 'không'}</p>
                                  <p className="">Đàm thoại 2 chiều: {detaillockhome.twoWayTalk === true ? 'có' : 'không'}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        :
                        <tr>
                          <td
                            colSpan="11"
                            key={i}
                            style={{
                              display: myStyle[`${i}`] ? 'table-cell' : 'none',
                            }}
                          >
                            <div className="text-left">
                              <p className="font-bold text-lg p-2">Chi tiết sản phẩm HDMI</p>
                              <div className="flex w-full">
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Sản xuất tại: {product.oem}</p>
                                  <p className="">Màu sắc: {product.color}</p>
                                  <p className="">Trọng lượng: {product.weight}</p>
                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">kích cỡ: {product.size}</p>
                                  <p className="">Phụ kiện: {product.accessories}</p>
                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Bảo hành: {product.insurance} tháng</p>
                                  <p className="">Chất liệu: {product.material}</p>
                                </div>
                                <div className="w-1/4 border-r-2 px-2">
                                  <p className="">Tính năng: {product.feature}</p>
                                  <p className="">Đã bán: {product.sold}</p>

                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
              }
            </>
          ))}
        </tbody>
      </table>

      {/* <LoadMore /> */}
      {products.length === 0 && <Loading />}
      <LoadMore />

      {
        isAdmin && (
          <div className="delete-all mb-4">
            <span className="uppercase">Chọn tất cả</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <button onClick={deleteAll}>Xóa tất cả</button>
          </div>
        )
      }
    </>
  );
}

export default Products;
