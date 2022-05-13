import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/Auth/auth';

const SignUp = () => {
  const dispatch = useDispatch();

  const authenticate = (e) => {
    e.preventDefault();
    const UserData = {
      name: e.target.name.value,
      admin: false,
      profile_picture: '',
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(signUp(UserData));
  };

  return (
    <div className="flex items-center justify-center h-screen box-border">
      <div className="border-4 rounded-lg border-indigo-500/75 h-2/4 w-5/12">
        <div className="text-center pt-5">CREATE AN ACCOUNT</div>
        <form
          className="p-5 flex flex-col items-center justify-center w-full"
          onSubmit={(event) => authenticate(event)}
          id="signup-form"
        >
          <input
            className="my-4 py-2 border-2"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            className="my-4 py-2 border-2"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="my-4 py-2 border-2"
            type="password"
            name="password"
            placeholder="Password"
          />
          <span className="text-xs">
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
          <button type="submit">
            SIGN UP
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
