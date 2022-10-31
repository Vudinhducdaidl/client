function DetailLockHotel({ detailLockHotel }) {
  return (
    <>
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Mở Bằng Thẻ Từ</div>
        <div className="w-3/5">{detailLockHotel.magneticCartLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Mở Bằng Vân Tay</div>
        <div className="w-3/5">{detailLockHotel.fingerprintLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Mở Bằng Phím</div>
        <div className="w-3/5">{detailLockHotel.keyLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Chìa Khóa Cơ</div>
        <div className="w-3/5">{detailLockHotel.mechanical}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Pin</div>
        <div className="w-3/5">{detailLockHotel.battery}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Hoạt Động Với Phần Mềm Hotel</div>
        <div className="w-3/5">{detailLockHotel.Workswithhotelsoftware === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Yêu cầu độ dày cửa</div>
        <div className="w-3/5">{detailLockHotel.doorThickness}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Yêu Cầu Độ Sâu Cửa</div>
        <div className="w-3/5">{detailLockHotel.doorDepth}</div>
      </div>
      <hr />
    </>
  );
}
export default DetailLockHotel;
