import { Route, Routes } from 'react-router-dom';
import HomeMain from './homepage/HomeMain';
import Product from './product/Product';
import Info from './info/info';
import News from './news/news';
import Contact from './contact/contact';

// import Products from '../mainpages/products/Products';

function HomeRoutes() {
  return (
    <>
      <Route path="/" element={<HomeMain />} />
      <Route path="/product" element={<Product />} />
      <Route path="/info" element={<Info />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
    </>
  );
}

export default HomeRoutes;
