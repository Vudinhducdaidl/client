import { Link, Outlet } from "react-router-dom";
import Header from "./headers/Header";
import "./dashboard.css";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  return (
    <div className='w-full'>
      <div className='p-2 w-full uppercase bg-gray-800 text-white text-3xl text-center'>
        <Link to='/dashboard/detailProduct'>Admin Dashboard</Link>
      </div>
      <div className='w-full px-4'>
        <div className='flex my-2'>
          <Link to='/'>
            <div className='w-fit flex p-2 mt-2 items-center border border-gray-400 rounded-xl text-gray-600 hover:bg-gray-800 hover:text-white'>
              <FontAwesomeIcon icon={faArrowCircleLeft} />
              <p className='uppercase ml-2 '>quay về trang chủ</p>
            </div>
          </Link>
        </div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
