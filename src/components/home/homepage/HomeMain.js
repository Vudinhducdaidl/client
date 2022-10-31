import HomeSlide from './Slide';
import PromoProduct from './PromoProduct';
import BestSeller from './Bestseller';
import NewProduct from './NewProduct';
import QuickContact from './QuickContact';
import logo1 from '../image/5alogo.jpg';
import logo2 from '../image/bozologo.jpg';
import logo3 from '../image/riscalogo.jpg';

function HomeMain() {
  return (
    <main className="w-full relative">
      <HomeSlide />
      {/* Main */}
      <div className="w-full py-4 mt-4">
        {/* Brand Display */}
        <div className="w-4/5 mx-auto mb-8">
          <div className="w-full grid grid-cols-3 gap-6">
            <div className="h-fit p-4">
              <img
                src={logo1}
                alt=""
                className="w-full rounded-[3rem] shadow-2xl"
              />
            </div>
            <div className="h-fit p-4">
              <img
                src={logo2}
                alt=""
                className="w-full rounded-[3rem] shadow-2xl"
              />
            </div>
            <div className="h-fit p-4">
              <img
                src={logo3}
                alt=""
                className="w-full rounded-[3rem] shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* Show sản phẩm */}
        <PromoProduct />
        <BestSeller />
        <NewProduct />
        <QuickContact />
      </div>
    </main>
  );
}

export default HomeMain;
