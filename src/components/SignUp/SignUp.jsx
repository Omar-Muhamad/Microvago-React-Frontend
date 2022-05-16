import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/Auth/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const UserData = {
      name: e.target.name.value,
      admin: false,
      profile_picture: '',
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(signUp(UserData));
    navigate('/login');
  };

  return (
    <div className="splashBG bg-[#6D22FB] h-screen w-full flex items-center justify-center text-white text-center">
      <div className="w-[90%] lg:w-[40%] px-8 lg:px-14 py-12 lg:pt-20 rounded-2xl bg-black/[0.5] backdrop-blur-[3px]">
        <h1 className="font-['Comfortaa'] text-white text-3xl font-bold">
          SIGN UP
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-6 w-full text-lg w-full"
          onSubmit={(event) => handleSubmit(event)}
          id="signup-form"
        >
          <input
            className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className="w-full p-3 bg-transparent border-2 rounded-full font-medium text-center"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="w-full p-3 bg-transparent border-2 rounded-full font-medium text-center"
            type="password"
            name="password"
            placeholder="Password"
          />
          <div className="flex items-center gap-2">
            <input
              className="w-[16px] h-[16px] cursor-pointer"
              type="radio"
              name="radio"
            />
            <span className="text-sm">I read and agree to</span>
            <span className="group text-sm lg:text-base text-fuchsia-400 cursor-pointer relative">
              Terms & conditions
              <div className="absolute bg-white hidden group-hover:block">terms here</div>
            </span>
          </div>
          <button
            type="submit"
            className="w-[70%] lg:w-3/5 rounded-full py-3 bg-white text-[#6D22FB] font-medium hover:bg-transparent border-2 border-transparent hover:border-white hover:text-white"
          >
            CREATE ACCOUNT
          </button>
          <div className="w-full mt-2 flex items-center justify-center gap-3">
            <p className="text-base">Already have account?</p>
            <NavLink
              className="py-2 text-fuchsia-400 text-lg font-medium"
              to="/login"
            >
              Signin
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
