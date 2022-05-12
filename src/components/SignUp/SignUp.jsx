import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center h-screen box-border">
      <div className="border-4 rounded-lg border-indigo-500/75 h-2/4 w-5/12">
        <div className="text-center pt-5">CREATE AN ACCOUNT</div>
        <form
          className="p-5 flex flex-col items-center justify-center w-full"
          // onSubmit={(event) => authenticate(event)}
        >
          <input
            className="my-4 py-2 border-2"
            type="text"
            name="username"
            placeholder="User name"
            defaultValue=""
          />
          <input
            className="my-4 py-2 border-2"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue=""
          />
          <input
            className="my-4 py-2 border-2"
            type="password"
            name="password"
            placeholder="Password"
            defaultValue=""
          />
          <span>
            By clicking
            {' '}
            <b>Register</b>
            , you agree to our Terms, Data Policy and Cookie
            Policy. You may receive SMS notifications from us and/or our
            partners. Text
            {' '}
            STOP
            {' '}
            to stop.
          </span>
          <NavLink className=" flex py-2 w-1/6 bg-teal-200 outline-cyan-500 mt-4 text-center" type="submit" to="/sign_up">SIGN UP</NavLink>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
