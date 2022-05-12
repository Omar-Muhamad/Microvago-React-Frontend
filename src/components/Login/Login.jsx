import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.auth);

  const authenticate = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, [isAuthorized]);

  return (
    <div className="flex items-center justify-center h-screen box-border">
      <div className="border-4 rounded-lg border-indigo-500/75 h-2/5 w-5/12">
        <div className="text-center pt-5">SIGN IN</div>
        <form className="p-5 flex flex-col items-center justify-center w-full" onSubmit={(event) => authenticate(event)}>
          <input className="my-4 py-2 border-2" type="email" name="email" placeholder="Email" defaultValue="" />
          <input className="my-4 py-2 border-2" type="password" name="password" placeholder="Password" defaultValue="" />
          <button className=" flex py-2 w-1/6 bg-teal-200 outline-cyan-500" type="submit">LOG IN</button>
          <NavLink className="text-center " to="/sign_up">SIGN UP</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
