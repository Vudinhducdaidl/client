function DetailSmartHome({ detailSmart }) {
        // console.log("ủa alo", detailSmart.usersharing)
        return (
                <>
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Mở Bằng APP</div>
                                <div className="w-3/5">{detailSmart.appLock} </div>
                        </div>
                        <hr />
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Báo Động Qua App</div>
                                <div className="w-3/5">{detailSmart.alarmViaApp === true ? ' có' : 'không'} </div>
                        </div>
                        <hr />
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Hỗ Trợ Alexa Google Home Siri</div>
                                <div className="w-3/5">{detailSmart.supportalexagooglehomesiri === true ? 'có' : 'không'} </div>
                        </div>
                        <hr />
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Chia Sẽ Người Dùng</div>
                                <div className="w-3/5">{detailSmart.usersharing === true ? 'có' : 'không'} </div>
                        </div>
                        <hr />
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Dòng Điện</div>
                                <div className="w-3/5">{detailSmart.electric} </div>
                        </div>
                        <hr />
                        <div className="flex text-gray-600 my-2">
                                <div className="w-2/5">Dòng Tải</div>
                                <div className="w-3/5">{detailSmart.loadCurrent} </div>
                        </div>
                        <hr />
                </>
        );
}

export default DetailSmartHome;
