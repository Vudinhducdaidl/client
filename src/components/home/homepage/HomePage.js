import Header from '../HomeHeader';
import Footer from '../HomeFooter';
// import HomeRoutes from '../HomeRoutes';
// import HomeMain from './HomeMain';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <div className="w-full flex min-h-screen flex-col">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
