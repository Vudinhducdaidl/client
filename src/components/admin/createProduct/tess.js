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
    // const [products1] = state.ProductsAdminAPI.products
    // console.log(products1)
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
    const [detype, setDeType] = useState([]);
    console.log("type nè", detype)


    // console.log("alo tao product nè", products)
    // chuyển đổi id category trong product thành tên
    const getCategoryNameById = (id) => {
        var result = categories.filter((obj) => {
            return obj._id === id;
        });
        var cate = result[0];
        return cate.name;
    };

    // lấy data

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
            const destroyImg = axios.post(
                '/api/destroy',
                { public_id },
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

    const deleteAll = () => {
        products.forEach((product) => {
            if (product.checked) deleteProduct(product._id, product.images.public_id);
        });
    };

    var formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
    });

    if (loading)
        return (
            <div>
                <Loading />
            </div>
        );

    const expand = (id) => {
        setMyStyle((prevState) => ({
            ...myStyle,
            [id]: !prevState[id],
        }));
    };

    const idproduct = (id, type) => {
        // console.log("type nè", type)
        setDeType(type)
        // products.forEach((product) => {
        //   if (product._id === id)
        //     console.log("id nè", id)
        //   console.log("prodcut nè:", product)

        // })
        // smartHome.forEach((smartHome) => {
        //   if (smartHome.idProduct === id) setDetailSmart(smartHome);
        //   // console.log("vô rồi lockht", smartHome)

        // })

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
    // console.log("ủa alo")
    return (
        <>
            {/*tìm kiếm */}
            <Filters />
            {/* Bang san pham */}
            <table>
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
                                        <button onClick={() => expand(i, product._id)}>
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
                                <td>On</td>
                                <td>
                                    <BtnRender product={product} deleteProduct={deleteProduct} />
                                </td>
                            </tr>
                            {/* chi tiet san pham */}
                            {
                                detype === "lockhotel" ?
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
                                                        <p className="">Mở bằng khóa vân tay: {detaillockht.fingerprintLock}</p>
                                                        <p className="">Mở bằng app: {detaillockht.appLock}</p>
                                                        <p className="">Mở bằng thẻ từ: {detaillockht.magneticCartLock}</p>
                                                        <p className="">Mở bằng mật khẩu: {detaillockht.keyLock}</p>
                                                        <p className="">Sử dụng pin: {detaillockht.battery}</p>

                                                    </div>
                                                    <div className="w-1/4 border-r-2 px-2">
                                                        <p className="">Số chìa khóa cơ: {detaillockht.mechanical}</p>
                                                        <p className="">Độ dày yêu cầu: {detaillockht.doorThickness}</p>
                                                        <p className="">Độ sâu yêu cầu: {detaillockht.doorDepth}</p>
                                                        <p className="">Hoạt động với phầm mềm hotell: {detaillockht.Workswithhotelsoftware}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    :
                                    detype === "SmartHome" ?
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
                                                            <p className="">Hỗ trợ googlehomesiri: {detailSmart.supportalexagooglehomesiri}</p>
                                                        </div>
                                                        <div className="w-1/4 border-r-2 px-2">
                                                            <p className="">Chia sẻ người dùng: {detailSmart.usersharing}</p>
                                                            <p className="">Dòng Điện: {detailSmart.electric}</p>
                                                            <p className="">Dòng tải: {detailSmart.loadCurrent}</p>

                                                        </div>

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        : detype === "camera" ?
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
                                                                <p className="">Báo động qua app: {detailcamera.alarmViaApp}</p>
                                                                <p className="">Hỗ Trợ Alexa Google Home Siri: {detailcamera.supportalexagooglehomesiri}</p>
                                                                <p className="">Chia Sẻ Người Dùng: {detailcamera.usersharing}</p>
                                                                <p className="">Power Source: {detailcamera.PowerSource}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            : detype === "lock" ?
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
                                                                    <p className="">Mở bằng khóa vân tay: {detaillockhome.fingerprintLock}</p>
                                                                    <p className="">Mở bằng app: {detaillockhome.appLock}</p>

                                                                </div>
                                                                <div className="w-1/4 border-r-2 px-2">
                                                                    <p className="">Mở bằng thẻ từ: {detaillockhome.magneticCartLock}</p>
                                                                    <p className="">Mở bằng mật khẩu: {detaillockhome.keyLock}</p>
                                                                    <p className="">Sử dụng pin: {detaillockhome.battery}</p>
                                                                    <p className="">Số chìa khóa cơ: {detaillockhome.mechanical}</p>
                                                                    <p className="">Độ dày yêu cầu: {detaillockhome.doorThickness}</p>
                                                                    <p className="">Độ sâu yêu cầu: {detaillockhome.doorDepth}</p>
                                                                </div>
                                                                <div className="w-1/4 border-r-2 px-2">
                                                                    <p className="">Số lượng người dùng: {detaillockhome.userLimit}</p>
                                                                    <p className="">Hỗ Trợ Alexa Google Home Siri: {detaillockhome.supportalexagooglehomesiri}</p>
                                                                    <p className="">Chia sẻ mật khẩu: {detaillockhome.shareEkeyCode}</p>
                                                                    <p className="">Xem mặt qua khóa: {detaillockhome.videoDoorbell}</p>
                                                                    <p className="">Đàm thoại 2 chiều: {detaillockhome.twoWayTalk}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                :
                                                ""
                            }
                        </>
                    ))}
                </tbody>
            </table>

            {/* <LoadMore /> */}
            {products.length === 0 && <Loading />}
            <LoadMore />

            {isAdmin && (
                <div className="delete-all mb-4">
                    <span className="uppercase">Chọn tất cả</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Xóa tất cả</button>
                </div>
            )}

            {/*cắt ngắn kí tự bằng hàm :".substring(20, 24)"  */}
            {/* <td>{product._id.substring(20, 24)}</td> */}
            {/* <td>{product.accessories}</td> */}
            {/* <td>{product.insurance}</td>
          <td>{product.material}</td>
          <td>{product.feature}</td>
          <td>{product.connection}</td> */}
        </>
    );
}

export default Products;
