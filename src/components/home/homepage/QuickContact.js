import zaloicon from '../image/zalo-icon.png';

function QuickContact() {
  return (
    <div className="right-3 bottom-4 fixed">
      {/* <div className="w-16 h-16 bg-blue-500 rounded-full mb-2 ml-auto"></div> */}
      <a
        href="https://zalo.me/0859299299"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-16 h-16 rounded-full mb-2 ml-auto">
          <img src={zaloicon} alt="" />
        </div>
      </a>

      <div className="text-white bg-red-600 rounded-full py-2 px-4">
        <p className="uppercase text-lg">
          <span>hotline:</span>
          <span className="font-bold ml-2">1800.9999</span>
        </p>
      </div>
    </div>
  );
}

export default QuickContact;
