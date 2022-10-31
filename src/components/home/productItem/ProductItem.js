import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

function ProductItem({ product }) {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  // gắn id = id  của category trong product
  const id = product.category;
  var result = categories.filter((obj) => {
    return obj._id === id;
  });
  var cate = result[0];
  // TẠO HÀM FOMAT HIỂN THỊ SỐ TIỀN
  var formatter = new Intl.NumberFormat({
    style: 'currency',
    currency: 'VND',
  });
  var price = `${product.price}`;
  return (
    <Link to={`/detail/${product._id}`}>
      <div className="h-fit">
        <div className="w-full h-fit bg-gray-600 overflow-hidden relative">
          <div className="mt-[100%]"></div>
          <div className="absolute inset-0">
            <img src={product.images.url} alt="" className="w-full" />
          </div>
        </div>
        <p className="text-gray-600 text-sm">{cate.name}</p>
        <p className="text-lg text-clip-2" title={product.name}>
          {product.name}
        </p>
        <p className="font-bold">
          <span className="font-bold text-lg">{formatter.format(price)}.đ</span>
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
