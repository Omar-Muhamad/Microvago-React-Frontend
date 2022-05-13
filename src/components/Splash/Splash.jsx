import { NavLink } from 'react-router-dom';

const Splash = () => (
  <div className="splashBG h-screen w-full flex flex-col  items-center justify-center bg-[#6D22FB]">
    <div className="grow-[4] w-full flex items-center justify-center">
      <h1 className="font-['Comfortaa'] text-white text-5xl font-bold">
        Microvago
      </h1>
    </div>
    <div className="AuthenticationBtns grow flex flex-col gap-4 text-xl font-medium text-center w-full">
      <NavLink
        to="/login"
        className="w-[70%] lg:w-1/4 mx-auto py-4 rounded-full mx-auto bg-white text-[#6D22FB] text-white cursor-pointer"
      >
        Login
      </NavLink>
      <NavLink to="/signup" className="w-[70%] lg:w-1/4 mx-auto py-4 border-2 border-white text-white rounded-full cursor-pointer">
        Sign up
      </NavLink>
    </div>
  </div>
);

export default Splash;
