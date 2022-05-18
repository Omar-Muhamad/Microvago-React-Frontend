import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Auth/auth';

const Header = () => {
  const isAdmin = useSelector((state) => state.auth.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/', replace: true });
  };
  return (
    <header className="max-h-screen py-6 shadow-xl text-center flex flex-col justify-between text-gray-500">
      <NavLink to="/" className="text-3xl font-bold text-gray-600">
        Microvago
      </NavLink>
      <nav className="nav row-span-3 mt-[-80px]">
        <ul className="row-span-3 flex flex-col gap-4 text-left text-xl font-medium">
          <li className="ml-3 pl-3 py-2 navLink hover:text-black text-white bg-[#6D22FB]">
            <NavLink to="/reservations/add">Add reservation</NavLink>
          </li>
          <li className="ml-3 pl-3 py-2 navLink hover:text-black">
            <NavLink to="/myreservations">My reservations</NavLink>
          </li>
          {
            isAdmin && (
              <>
                <li className="ml-3 pl-3 py-2 navLink hover:text-black">
                  <NavLink to="/hotels/add">Add Hotel</NavLink>
                </li>
                <li className="ml-3 pl-3 py-2 navLink hover:text-black">
                  <NavLink to="/hotels/remove">Delete Hotel</NavLink>
                </li>
              </>
            )
          }
        </ul>
      </nav>
      <div className="headerBottom">
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
    </header>
  );
};
export default Header;
