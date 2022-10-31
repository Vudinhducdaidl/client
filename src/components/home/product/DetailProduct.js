import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../productItem/ProductItem';
import { ToastContainer } from 'react-toastify';
import DetailLockHome from './DetailLockHome';
import DetailCamera from './DetailCamera';
import DetailSmartHome from './DetailSmartHome';
import DetailLockHotel from './DetailLockHotel';
import star from '../image/svg/star.svg';
// import Loading from '../../admin/utils/loading/Loading';

function DetailProduct() {
  // lấy id hiện tại bằng userParam
  const params = useParams();
  const state = useContext(GlobalState);
  const [detailProduct, setDetailProduct] = useState([]);
  const [detailSmart, setDetailSmart] = useState([]);
  const [detailCamera, setDetailCamera] = useState([]);
  const [detailLockHotel, setDetailLockHotel] = useState([]);
  const [detailLockHome, setDetailLockHome] = useState([]);


  const [products] = state.productsAPI.products;
  const [categories] = state.categoriesAPI.categories;
  const [brands] = state.brandsAPI.brands;
  const addCart = state.userAPI.addCart;
  const [lockhotel] = state.lockHotelAPI.lockhotel;
  const [camera] = state.cameraAPI.camera;
  const [smartHome] = state.smartHomeAPI.smartHome;
  const [lockHome] = state.lockhomeAPI.lockhome;
  useEffect(() => {
    if (params.id) {
      var idd = params.id
      products.forEach((product) => {
        if (product._id === idd)
          setDetailProduct(product)
      })
      const type = detailProduct.type
      if (type === "lockhotel") {
        lockhotel.forEach((lockht) => {
          if (lockht.idProduct === idd) setDetailLockHotel(lockht);
        })
      }
      else if (type === "camera") {
        camera.forEach((camera) => {
          if (camera.idProduct === idd) setDetailCamera(camera);
        })
        console.log(camera)
      } else if (type === "SmartHome") {
        smartHome.forEach((smartHome) => {
          if (smartHome.idProduct === idd) setDetailSmart(smartHome);
        })
      } else if (type === "lock") {
        lockHome.forEach((lockhome) => {
          if (lockhome.idProduct === idd) setDetailLockHome(lockhome);
        })
      }
    }
  }, [params.id, products, lockhotel, smartHome, camera, lockHome, detailProduct]);
  // convert product id thành tên
  const idcate = detailProduct.category;
  var result = categories.filter((obj) => {
    return obj._id === idcate;
  });
  var cate = result[0];
  // convert brand id thành tên
  const id = detailProduct.brand;
  var resultbrand = brands.filter((obj) => {
    return obj._id === id;
  });
  var namebrand = resultbrand[0];
  // conver tiền
  if (detailProduct.length === 0) return null;
  var formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
  });
  var price = `${detailProduct.price}`;
  return (
    <>
      <div className="w-3/4 mx-auto flex">
        {/* image */}
        <div className="w-1/2 p-4 border-r-2 border-gray-200">
          <img src={detailProduct.images.url} alt="" className="w-full" />
        </div>
        {/* info */}
        <div className="w-1/2 p-4">
          {/* nav */}
          <div className="text-xl text-gray-400 uppercase ">
            <Link to="/">
              <span className="hover:text-gray-600">Trang chủ</span>
            </Link>
            <span className="mx-2">/</span>
            <Link to="/product">
              <span className="hover:text-gray-600">
                {cate.name}
              </span>
            </Link>
          </div>
          {/* name */}
          <div className="text-3xl text-gray-700 font-bold mt-2">
            {detailProduct.name}
            {/* <h6>#id: {detailProduct.product_id}</h6> */}
          </div>
          {/* đánh giá và đã bán */}
          <div className="flex mt-2 text-gray-700 text-center">
            <img src={star} alt="" className="mr-1" />
            <img src={star} alt="" className="mr-1" />
            <img src={star} alt="" className="mr-1" />
            <img src={star} alt="" className="mr-1" />
            <img src={star} alt="" className="mr-1" />
            <div>( 0 đánh giá )</div>
            <span className="mx-2">|</span>
            <span>{detailProduct.sold} Đã bán</span>
            {/* <span className="mx-2">|</span>
            <span>còn {detailProduct.countInStock} sản phẩm</span> */}
          </div>
          {/* gía */}
          <div className="font-bold text-xl mb-4">
            <span>{formatter.format(price)}</span>
            <span className="text-base align-top">₫</span>
          </div>
          {/* Mua hàng */}
          <div className="mb-8">
            <li>FreeShip</li>
            <li>Đăng Ký Thành Viên Giảm 5%</li>
            <li>Xuất VAT +10%</li>
            <div className="flex">
              <div className="mt-2">
                <button className="p-2 border border-gray-400 bg-slate-200">
                  -
                </button>
                <input defaultValue={1} className="text-center p-2 border-y border-gray-400 w-14 focus:outline-none" />
                <button className="p-2 border border-gray-400 bg-slate-200">
                  +
                </button>
                {/* button them gio hang */}
                <button
                  className="py-2 px-4 ml-6 uppercase text-white bg-blue-400 hover:bg-blue-600"
                  onClick={() => addCart(detailProduct)}
                >
                  thêm vào giỏ hàng
                </button>
                <button className="py-2 px-4 ml-2 uppercase text-white bg-blue-400 hover:bg-blue-600">
                  mua ngay
                </button>
              </div>
            </div>
          </div>
          {/* detail */}
          <div>
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Thương Hiệu</div>
              <div className="w-3/5">{namebrand.name} </div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Model</div>
              <div className="w-3/5">{detailProduct.model} </div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Mục Đích</div>
              <div className="w-3/5">{detailProduct.feature} </div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Bảo Hành</div>
              <div className="w-3/5">{detailProduct.insurance} tháng</div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">OEM</div>
              <div className="w-3/5">{detailProduct.oem} </div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5"> WI-Fi/ Buletooth/Zigbee</div>
              <div className="w-3/5">{detailProduct.connection}</div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Màu Sắc</div>
              <div className="w-3/5">{detailProduct.color} </div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Cân nặng</div>
              <div className="w-3/5">{detailProduct.weight}</div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Kích Thước</div>
              <div className="w-3/5">{detailProduct.size}</div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Chất liệu</div>
              <div className="w-3/5">{detailProduct.material}</div>
            </div>
            <hr />
            <div className="flex text-gray-600 my-2">
              <div className="w-2/5">Đi Kèm</div>
              <div className="w-3/5">{detailProduct.accessories}</div>
            </div>
            <hr />
            {detailProduct.type === "lockhotel" ?
              <DetailLockHotel detailLockHotel={detailLockHotel} />
              :
              detailProduct.type === "SmartHome" ?
                <DetailSmartHome detailSmart={detailSmart} />
                : detailProduct.type === "camera" ?
                  <DetailCamera detailCamera={detailCamera} />
                  : detailProduct.type === "lock" ?
                    <DetailLockHome detailLockHome={detailLockHome} />
                    :
                    ""}
          </div >
        </div >
      </div >

      <div className="w-4/5 mx-auto mt-8 mb-4">
        {/* map nhung sp cung category */}
        <div className="w-full h-5 border-b-2 border-neutral-400 text-center">
          <span className="text-neutral-800 font-bold text-2xl bg-white px-4 uppercase">
            Sản phẩm liên quan
          </span>
        </div>
        <div className="w-full mt-2">
          <div className="w-full grid grid-cols-4 gap-6 py-4">
            {products.map((product) => {
              return product.category === detailProduct.category ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* {detailProduct.length === 0 && <Loading />} */}
    </>
  );
}

export default DetailProduct;
