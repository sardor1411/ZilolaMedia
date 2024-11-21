import { Routes, Route, Link, useNavigate, NavLink, Navigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import SignUp from './page/SignIn-Up/SignUp';
import SignIn from './page/SignIn-Up/SignIn';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ProtectRouteAdmin } from './protectedRoutes/ProtectRoutAdmin';
import { ProtectRouteUser } from './protectedRoutes/ProtectRoutUser';
import Search from 'antd/es/transfer/search';
import Home from './page/MenuPages/Home';
import Blog from './page/MenuPages/Blog';
import Bekzod from './page/MenuPages/Bekzod';
import Dashboard from './page/Dashboard/Dashboard';
import BossAnaliz from './page/Dashboard/BossAnaliz';
import Workers from './page/MenuPages/Workers';
import Jadval from './page/MenuPages/Jadval';
import CreateData from './page/Data create_edit/CreateData';
import '../src/index.css'
import {
  Collapse,
  Dropdown,
  initTWE,
} from "tw-elements";
import { ImageProvider } from './protectedRoutes/ImageContext';
import IditData from './page/Data create_edit/EditData';

function App() {
  let user = localStorage.getItem('users');
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    initTWE({ Collapse, Dropdown });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('users');
    navigate('/signin');
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };






  return (
    <>
      <div className="fixed w-full top-0 z-[100] h-[90px] backdrop-blur-[50px]">
        <nav
          className=" relative top-2 left-1/2 transform -translate-x-1/2  flex-no-wrap items-center py-2 shadow-dark-mild  lg:flex-wrap lg:justify-start lg:py-4 rounded-[20px] bg-[#cccaca] flex w-[90%]">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <button
              className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button"
              data-twe-collapse-init
              data-twe-target="#navbarSupportedContent12"
              aria-controls="navbarSupportedContent12"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span
                className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
              </span>
            </button>

            <div
              className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
              id="navbarSupportedContent12"
              data-twe-collapse-item>
              <a
                className="mb-4 me-5 ms-2 mt-3 flex items-center lg:mb-0 lg:mt-0"
                href="#">
                <h1 className='grey-qo-regular'>Zilola Media</h1>
              </a>
              <ul
                className="list-style-none me-auto flex flex-col ps-0 lg:flex-row "
                data-twe-navbar-nav-ref>
                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <NavLink
                    to="/home"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Home</NavLink>
                </li>
                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <NavLink
                    to="/blog"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Blog</NavLink>
                </li>

                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <NavLink
                    to="/dashboard"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Dashboard</NavLink>
                </li>
                {/* <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <NavLink
                    to="/bekzod"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Bekzod</NavLink>
                </li> */}
                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center " data-twe-nav-item-ref>
                  <NavLink
                    to="/workers"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Workers</NavLink>
                </li>
                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <NavLink
                    to="/signin"
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Sign In</NavLink>
                </li>
                <li className="mb-4 lg:mb-0 lg:pe-2 flex justify-center" data-twe-nav-item-ref>
                  <Link
                    to='/signin'
                    onClick={handleSignOut}
                    className="text-black/60 transition duration-200 hover:text-white active:bg-red-500 hover:rounded-[20px] hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="#"
                    data-twe-nav-link-ref
                  >Sign Out</Link>
                </li>
              </ul>
            </div>

            <div className="relative flex items-center">


              <div
                className="relative"
                data-twe-dropdown-ref
                data-twe-dropdown-alignment="end">
                <a
                  className="me-4 flex text-secondary-500 transition duration-200 hover:text-secondary-600/70 hover:ease-in-out focus:text-secondary-600/70 active:text-secondary-600/70 motion-reduce:transition-none dark:text-secondary-500 dark:hover:text-secondary-500/80 dark:focus:text-secondary-500/80 dark:active:text-secondary-500/80"
                  href="#"
                  id="dropdownMenuButton1"
                  role="button"
                  data-twe-dropdown-toggle-ref
                  aria-expanded="false">
                  <span className="[&>svg]:w-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
                      <path
                        fillRule="evenodd"
                        d="M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                        clipRule="evenodd" />
                    </svg>
                  </span>
                  <span
                    className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                  ></span>
                </a>
                <ul
                  className="absolute z-[1000] float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark [&[data-twe-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton1"
                  data-twe-dropdown-menu-ref>
                  <li>
                    <a
                      onClick={handleNavigate}
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:bg-gray-100 hover:rounded-lg"
                      href="dashboard">Boshqaruv</a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:bg-gray-100 hover:rounded-lg"
                      href="settings">Sozlamlar</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

      </div>

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/jadval" element={<Jadval />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/editdata" element={<IditData />} />

        <Route path="/createdata" element={<CreateData />} />
        <Route path="/bossanaliz" element={<BossAnaliz />} />
        {/* <Route path='/dashboardtwo' element={<DashboardTwo />} /> */}
        <Route path="/bekzod" element={<Bekzod />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectRouteAdmin><ImageProvider><Dashboard /></ImageProvider></ProtectRouteAdmin>} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;