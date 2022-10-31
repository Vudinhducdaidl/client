function DetailLockHome({ detailLockHome }) {
  return (
    <>
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Khóa Vân Tay</div>
        <div className="w-3/5">{detailLockHome.fingerprintLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Mở Băng App</div>
        <div className="w-3/5">{detailLockHome.appLock === true ? ' có' : 'không'}</div>
      </div>
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Khóa Thẻ Từ</div>
        <div className="w-3/5">{detailLockHome.magneticCartLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Khóa Mật Khẩu</div>
        <div className="w-3/5">{detailLockHome.keyLock === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Pin</div>
        <div className="w-3/5">{detailLockHome.battery}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Chìa Khóa Cơ</div>
        <div className="w-3/5">{detailLockHome.mechanical}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Người Dùng</div>
        <div className="w-3/5">{detailLockHome.userLimit}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Hỗ Trợ Alexa Google Home Siri</div>
        <div className="w-3/5">{detailLockHome.supportalexagooglehomesiri === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Share Ekey & Code</div>
        <div className="w-3/5">{detailLockHome.shareEkeyCode === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Video Doorbell</div>
        <div className="w-3/5">{detailLockHome.videoDoorbell === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Đàm Thoại 2 Chiều</div>
        <div className="w-3/5">{detailLockHome.twoWayTalk === true ? ' có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Yêu cầu độ dày cửa</div>
        <div className="w-3/5">{detailLockHome.doorThickness}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Yêu Cầu Độ Sâu Cửa</div>
        <div className="w-3/5">{detailLockHome.doorDepth}</div>
      </div>
      <hr />
    </>
  );
}

export default DetailLockHome;
