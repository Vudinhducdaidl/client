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

function DetailProduct() {
  // lấy id hiện tại bằng userParam
  const params = useParams();
  const state = useContext(GlobalState);
  const [brands] = state.brandsAPI.brands;
  const [products] = state.productsAPI.products;
  const [smartHome] = state.smartHomeAPI.smartHome;
  const [camera] = state.cameraAPI.camera;
  const [lockhotel] = state.lockHotelAPI.lockhotel;
  const [lockhome] = state.lockHomeAPI.lockhome;
  const [categories] = state.categoriesAPI.categories;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);


  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);

      });
    }
  }, [params.id, products]);

  // gắn id = id  của category trong product
  const idcate = detailProduct.category;
  // tìm id category trong mảng categories
  var result = categories.filter((obj) => {
    return obj._id === idcate;
  });
  var cate = result[0];




  // // lấy data smart
  // const idcheck = params.id;
  // if (detailProduct.type === "SmartHome") {
  //   // const [lockhome] = state.lockhomeAPI.lockhome;
  //   const [smartHome] = state.smartHomeAPI.smartHome;
  //   var resultsm = smartHome.filter((obj) => {
  //     return obj.idProduct === idcheck;
  //   });
  //   var namesm = resultsm[0];

  // } else if (detailProduct.type === "lockhotel") {
  //   // lấy data lockhotel
  //   const [lockhotel] = state.lockHotelAPI.lockhotel;
  //   var resultlhotel = lockhotel.filter((obj) => {
  //     return obj.idProduct = idcheck;
  //   });
  //   var namelhotel = resultlhotel[0];
  // } else if (detailProduct.type === "camera") {
  //   const [camera] = state.cameraAPI.camera;
  //   // lấy data camera
  //   var resultcam = camera.filter((obj) => {
  //     return obj.idProduct === idcheck;
  //   });
  //   var namecam = resultcam[0];
  // }
  // else {
  //   const [Lockhome] = state.LockhomeAPI.lockhome;
  //   // lấy data lockhome
  //   var resultlhome = Lockhome.filter((obj) => {
  //     return obj.idProduct === idcheck;
  //   });
  //   var namelhome = resultlhome[0];
  // }





  // // gắn id = id  của category trong product
  const id = detailProduct.brand;
  // // tìm id brand trong mảng brand
  var resultbrand = brands.filter((obj) => {
    return obj._id === id;
  });
  var namebrand = resultbrand[0];
  // 
  // lấy data smart
  const idsm = params.id;
  var resultsm = smartHome.filter((obj) => {
    return obj.idProduct === idsm;
  });
  var namesm = resultsm[0];
  // lấy data lockhome
  const idlhome = params.id;
  var resultlhome = lockhome.filter((obj) => {
    return obj.idProduct === idlhome;
  });
  var namelhome = resultlhome[0];
  // lấy data lockhotel
  const idlhotel = params.id;
  var resultlhotel = lockhotel.filter((obj) => {
    return obj.idProduct === idlhotel;
  });
  var namelhotel = resultlhotel[0];
  // lấy data camera
  const idcam = params.id;
  var resultcam = camera.filter((obj) => {
    return obj.idProduct === idcam;
  });
  var namecam = resultcam[0];

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
            <span className="mx-2">|</span>
            <span>còn {detailProduct.countInStock} sản phẩm</span>
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
            {detailProduct.type === "SmartHome" ?
              <DetailSmartHome namesm={namesm} />
              :
              detailProduct.type === "camera" ?
                <DetailCamera namecam={namecam} />
                :
                detailProduct.type === "lock" ?
                  <DetailLockHome namelhome={namelhome} />
                  :
                  detailProduct.type === "lockhotel" ?
                    <DetailLockHotel namelhotel={namelhotel} />
                    : ""
            }

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
    </>
  );
}

export default DetailProduct;



// 
