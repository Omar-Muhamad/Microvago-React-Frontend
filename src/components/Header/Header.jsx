import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Auth/auth';

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/', replace: true });
  };
  return (
    <div className="py-6 shadow-xl text-center sm:relative flex bg-white flex-col justify-between sm:gap-40 text-gray-500 h-full">
      <NavLink
        to="/"
        className="text-3xl hidden sm:flex justify-center font-bold text-gray-600"
      >
        Microvago
      </NavLink>
      <nav className="nav">
        <ul className="row-span-3 flex flex-col gap-4 text-left text-xl font-medium">
          <li className="close-navbar ml-3 pl-3 py-2 navLink hover:text-black text-white bg-[#6D22FB]">
            <NavLink className="close-navbar" to="/addReservation">
              Add reservation
            </NavLink>
          </li>
          <li className="close-navbar ml-3 pl-3 py-2 navLink hover:text-black">
            <NavLink className="close-navbar" to="/reservaions">
              My reservations
            </NavLink>
          </li>
          <li className="close-navbar ml-3 pl-3 py-2 navLink hover:text-black">
            <NavLink className="close-navbar" to="/hotels/add">
              Add Hotel
            </NavLink>
          </li>
          <li className="close-navbar ml-3 pl-3 py-2 navLink hover:text-black">
            <NavLink className="close-navbar" to="/delHotel">
              Delete Hotel
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="headerBottom mt-auto">
        <button
          className="logout px-6 py-2 bg-[#6D22FB] w-fit mx-auto rounded-full text-white flex items-center justify-center gap-3 hover:cursor-pointer"
          type="button"
          onClick={() => handleLogout()}
        >
          <h3 className="text-xl font-medium">Logout</h3>
          <i className="fa-solid fa-right-from-bracket fa-lg" />
        </button>
        <ul className="socialLinks flex items-center justify-center gap-3 mt-3">
          <li>
            <i className="fa-brands fa-twitter fa-lg" />
          </li>
          <li>
            <i className="fa-brands fa-facebook fa-lg" />
          </li>
          <li>
            <i className="fa-brands fa-instagram fa-lg" />
          </li>
          <li>
            <i className="fa-brands fa-pinterest fa-lg" />
          </li>
          <li>
            <i className="fa-brands fa-vimeo-v fa-lg" />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
