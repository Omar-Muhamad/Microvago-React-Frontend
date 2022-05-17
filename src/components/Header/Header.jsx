import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Auth/auth';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/', replace: true });
  };
  return (
    <header className="max-h-screen py-6 shadow-xl text-center flex flex-col justify-between">
      <NavLink to="/" className="text-2xl font-bold">
        Microvago
      </NavLink>
      <nav className="nav row-span-3">
        <ul className="row-span-3 navLinks flex flex-col gap-10 text-center text-[gray] text-xl font-medium">
          <li className="navLink hover:text-black">
            <NavLink to="/reservations/add">Add reservation</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/myreservations">My Reservations</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/hotels/add">Add Hotel</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/delHotel">Delete Hotel</NavLink>
          </li>
        </ul>
      </nav>
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
    </header>
  );
};
export default Header;
