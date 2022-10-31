import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../productItem/ProductItem';
import Loading from '../../admin/utils/loading/Loading';

// import LoadMore from '../../admin/products/LoadMore';
import { Link } from 'react-router-dom';


function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="w-4/5 mx-auto mt-8 mb-4">
        <div className="w-full mx-auto mt-8 mb-4">
          {/* navbar */}
          <div className="w-full uppercase text-2xl text-gray-600">
            <Link to="/">trang chủ</Link>
            <span className="px-2">/</span>
            <span className="font-bold">danh sách sản phẩm</span>
          </div>
          <div className="w-full py-4 flex">
            {/* left */}
            <div className="w-1/4 py-6">
              {/* Danh muc sp title*/}
              <div className="text-gray-600 font-medium text-xl text-center inline-flex items-center w-4/5">
                Danh mục
                <svg
                  className="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <hr className="w-4/5 mt-2 border-gray-400" />
              {/* LIST DANH MUC */}
              <ul className="w-4/5 font-medium text-gray-900">
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="list-radio-category"
                      type="radio"
                      value=""
                      key={category._id}
                      onChange={handleCategory}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 border-gray-300 "
                    ></input>
                    <label

                      for="list-radio-category"
                      className="py-2 ml-2 w-full text-lg"
                    >
                      Tất cả danh mục
                    </label>
                  </div>
                </li>
                {categories.map((category) => (
                  <li className="w-full">
                    <div className="flex items-center">
                      <input
                        id={category._id}
                        type="radio"
                        value={'category=' + category._id}
                        key={category._id}
                        onChange={handleCategory}
                        name="list-radio"
                        className="w-4 h-4 text-blue-600 border-gray-300 "
                      ></input>
                      <label
                        for={category._id}
                        className="py-2 ml-2 w-full text-lg"
                      >
                        {category.name}
                      </label>
                    </div>
                  </li>
                ))}

                {/* **** */}
              </ul>
              {/* thuong hieu sp title */}
              <div className="text-gray-600 font-medium text-xl text-center inline-flex items-center w-4/5 mt-4">
                Thương hiệu
                <svg
                  className="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <hr className="w-4/5 mt-2 border-gray-400" />
              {/* LIST THUONG HIEU */}
            </div>
            {/* right */}
            <div className="w-3/4">
              <div className="py-4">
                <span>Sắp xếp theo: </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="p-2 border"
                >
                  <option value="">Mới nhất</option>
                  <option value="sort=oldest">Cũ nhất</option>
                  <option value="sort=-sold">Bán chạy nhất</option>
                  <option value="sort=-price">Giá: Cao-Thấp</option>
                  <option value="sort=price">Giá: Thấp-cao</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {products.map((product) => {
                  return (
                    <ProductItem
                      key={product._id}
                      product={product}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* <LoadMore /> */}
          {products.length === 0 && <Loading />}
        </div>
      </div>
    </>
  );
}

export default Products;
