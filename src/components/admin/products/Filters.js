import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch('');
  };

  // const handleBrand = e => {
  //     setBrand(e.target.value)
  //     setSearch('')
  // }

  return (
    <div className="flex mb-4">
      <div className="py-4">
        <span>Lọc theo : </span>
        <select
          name="category"
          value={category}
          onChange={handleCategory}
          className="p-2 border"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option value={'category=' + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="row">
                <span>Filters: </span>
                <select name="brand" value={brand} onChange={handleBrand} >
                    <option value=''>All BRAND</option>
                    {
                        brands.map(brand => (
                            <option value={"brand=" + brand._id} key={brand._id}>
                                {brand.name}
                            </option>
                        ))
                    }
                </select>
            </div> */}
      <div className="py-4 mx-4">
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
      {/* search bar */}
      <form className="w-1/3 ml-auto my-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            className="block p-2 pl-10 w-full text-lg rounded-lg border-2 border-gray-400 focus:border-transparent focus:ring-0"
            placeholder="Tìm kiếm tên sản phẩm"
            required=""
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Filters;
