/* eslint-disable */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Header from './Header';

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const HeaderContainer = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleCloseNavbar = (e) => {
    if (e.target.classList.contains('close-navbar')) {
      setNavOpen(false);
    }
  };
  return (
    <>
      <header className="h-screen hidden sm:flex shadow-xl text-center bg-white flex-col justify-between text-gray-500">
        <Header />
      </header>

      <header
        id="mobileNav"
        className={`flex sm:hidden flex-col fixed bg-white top-0 right-0 left-0 z-50 transition-all ${
          navOpen ? 'h-screen' : 'h-16 shadow-xl'
        }`}
        onClick={handleCloseNavbar}
      >
        <div className="flex justify-between w-full h-16 items-center px-5">
          <NavLink
            to="/"
            className="close-navbar text-xl font-bold text-gray-600"
          >
            Microvago
          </NavLink>
          <button onClick={() => {setNavOpen(!navOpen)}} type="button">
            <div>{navOpen? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}</div>
          </button>
        </div>
        <Transition in={navOpen} timeout={200}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className={` h-full w-full flex sm:hidden text-center flex bg-white flex-col justify-between text-gray-500 ${
                navOpen ? '' : 'hidden'
              }`}
            >
              <Header />
            </div>
          )}
        </Transition>
      </header>
    </>
  );
};
export default HeaderContainer;
