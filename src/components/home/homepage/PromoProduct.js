// import img1 from '../image/sampleImg.jpg';
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../productItem/ProductItem';

function PromoProduct() {
  const state = useContext(GlobalState);
  const [promo] = state.productsPromoAPI.promo;
  // Sản phẩm nổi bật
  return (
    <div className="w-4/5 mx-auto mt-8 mb-4">
      {/* Title */}
      <div className="w-full mb-4">
        <div className="w-full h-5 border-b-2 border-neutral-400 text-center">
          <span className="text-neutral-800 font-bold text-2xl bg-white px-4 uppercase">
            Sản phẩm nổi bật
          </span>
        </div>
      </div>
      {/* LIST PRODUCT */}
      <div className="w-full mt-8 mb-4">
        <div className="w-full grid grid-cols-4 gap-6 py-4">
          {/* productItem */}
          {promo.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full text-center">
        <button className="bg-neutral-800 text-white text-lg py-2 px-4 rounded-full hover:bg-neutral-500 ">
          Xem tất cả
        </button>
      </div>
    </div>
  );
}

export default PromoProduct;
