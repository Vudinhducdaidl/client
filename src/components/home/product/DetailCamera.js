function DetailCamera({ detailCamera }) {
  return (
    <>
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Độ Phân Giải</div>
        <div className="w-3/5">{detailCamera.resolution}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Microphone/ Speaker</div>
        <div className="w-3/5">{detailCamera.microphonespeaker}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Mở Bằng APP</div>
        <div className="w-3/5">{detailCamera.appLock}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Báo Động Qua App</div>
        <div className="w-3/5">{detailCamera.alarmViaApp === true ? 'có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Hỗ Trợ Alexa Google Home Siri</div>
        <div className="w-3/5">{detailCamera.supportalexagooglehomesiri === true ? 'có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Chia Sẽ Người Dùng</div>
        <div className="w-3/5">{detailCamera.usersharing === true ? 'có' : 'không'}</div>
      </div>
      <hr />
      <div className="flex text-gray-600 my-2">
        <div className="w-2/5">Power Source</div>
        <div className="w-3/5">{detailCamera.PowerSource}</div>
      </div>
      <hr />
    </>
  );
}

export default DetailCamera;
