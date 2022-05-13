import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { signUp } from '../../redux/Auth/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [isAuthenticated]);

  const authenticate = (e) => {
    e.preventDefault();
    const form = document.getElementById('signup-form');
    const formData = new FormData(form);

    console.log('forma date is ', formData);
    // dispatch(signUp({ form: e.target }));
  };

  // const handleSumit = (e) => {
  //   console.log('handle sumit e is ', e.target.value);
  // };

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
