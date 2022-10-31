// import pdf from './bao-gia-nhanh.pdf';
import image from './bao-gia-nhanh.jpg';
function Info() {
  return (
    <div className="w-full">
      <div className="w-fit mx-auto mt-8 mb-4">
        {/* <a href={pdf} title="5abmt" target="_blank" rel="noopener noreferrer">
          Download Pdf
        </a> */}
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Info;
