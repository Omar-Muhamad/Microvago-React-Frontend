import { NavLink } from 'react-router-dom';

const Header = () => (
  <>
    <header className="header py-4 px-24 shadow-xl flex items-center justify-between">
      <NavLink to="/">
        <h1 className="text-2xl font-bold">Microvago</h1>
      </NavLink>
      <nav className="nav">
        <ul className="navLinks flex gap-12 text-[gray] text-xl font-medium">
          <li className="navLink hover:text-black">
            <NavLink to="/">Hotels</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/addReservation">Add a resrvation</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/reservaions">My reservations</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/addHotel">Add a Hotel</NavLink>
          </li>
          <li className="navLink hover:text-black">
            <NavLink to="/delHotel">Delete a hotel</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </>
);

export default Header;
