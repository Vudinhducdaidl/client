import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function CreateProduct() {
  return (
    <>
      <div className="w-full">
        <p className="py-2 text-center uppercase font-bold text-2xl border-b-2 mb-4">
          Tạo sản phẩm
        </p>
        <button className="p-2 text-black peer font-bold text-xl border-2">
          Chọn danh mục sản phẩm
        </button>
        <div className="hidden peer-hover:flex hover:flex w-80 flex-col bg-white drop-shadow-lg absolute right-auto z-10">
          <Link to="/dashboard/create_product/createcameraproduct">
            <p className="p-2 hover:bg-gray-200">Camera</p>
          </Link>
          <Link to="/dashboard/create_product/CreateLockHomeProduct">
            <p className="p-2 hover:bg-gray-200">Khóa nhà</p>
          </Link>
          <Link to="/dashboard/create_product/CreateLockHotelProduct">
            <p className="p-2 hover:bg-gray-200">Khóa khách sạn</p>
          </Link>
          <Link to="/dashboard/create_product/CreateSmartHomeProduct">
            <p className="p-2 hover:bg-gray-200">
              Nhà thông minh | Đèn năng lượng mặt trời
            </p>
          </Link>
          <Link to="/dashboard/create_product/CreateHDMIProduct">
            <p className="p-2 hover:bg-gray-200">Cáp HDMI</p>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default CreateProduct;
