import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mastercard from './image/svg/mastercard.svg';
import visa from './image/svg/visa.svg';
import paypal from './image/svg/paypal.svg';
import stripe from './image/svg/stripe.svg';
import amazon from './image/svg/amazon.svg';
import gpay from './image/svg/gpay.svg';

function HomeFooter() {
  return (
    <footer className="mt-auto bg-[#2f2f2f] w-full">
      <div className="flex w-4/5 mx-auto py-4 text-white">
        <div className="w-2/6 px-4">
          <p className="font-bold text-xl uppercase">Thông tin liên hệ</p>
          <p className="text-base my-3">
            Giới thiệu thông tin công tyLorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aliquam semper
          </p>
          <div className="flex">
            <div className="my-auto mr-2 text-sm">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <p>Địa chỉ: 221 Lê Quý Đôn, P. Tân An, TP. Buôn Ma Thuột</p>
          </div>
          <div className="flex">
            <div className="my-auto mr-2 text-sm">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p>Hotline: (+84) 0859.299.299</p>
          </div>
          <div className="flex">
            <div className="my-auto mr-2 text-sm">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <p>Email: thienchuc5aipcam@gmail.com</p>
          </div>
        </div>
        <div className="w-2/6 px-4">
          <p className="font-bold text-xl uppercase">Thông tin </p>
          <p className="text-base my-2">Giấy nhận nhà phân phối </p>
          <p className="text-base my-2">Giấy chứng nhận thương hiệu</p>
          <p className="text-base my-2">Chứng nhận xuất sứ CO & CC </p>
          <p className="text-base my-2">Nhận báo giá sản phẩm nhanh</p>
        </div>
        <div className="w-2/6 px-4">
          <p className="font-bold text-xl uppercase">Đăng ký nhận tin </p>
          <p className="text-base my-2">
            Gửi email đăng ký để nhận thông báo mới nhất về khuyến mãi, sự kiện
            nổi bật dành cho khách hàng.
          </p>
          <div className="w-full py-4 flex">
            <input
              className="h-10 w-4/6 rounded-md p-2 text-[#2f2f2f] mr-2"
              placeholder="Nhập Email"
            ></input>
            <button className="w-2/6 h-10 uppercase bg-red-500 p-2 rounded-md">
              đăng ký
            </button>
          </div>
          <div className="w-full flex py-2">
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={visa} alt="" />
            </div>
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={paypal} alt="" />
            </div>
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={mastercard} alt="" />
            </div>
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={stripe} alt="" />
            </div>
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={amazon} alt="" />
            </div>
            <div className="bg-white w-14 rounded-md mr-2">
              <img src={gpay} alt="" />
            </div>
          </div>
        </div>
      </div>
      <p className="w-full text-center text-gray-500 bg-neutral-800">
        Copyright © 2022 5ABmt
      </p>
    </footer>
  );
}

export default HomeFooter;
