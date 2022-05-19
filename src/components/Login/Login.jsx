import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Auth/auth';
import { startLoading, stopLoading } from '../../redux/UI/ui';
import Spinner from '../Spinner/Spinner';

const Login = () => {
  const loginStore = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    const UserData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    dispatch(startLoading());
    const res = await dispatch(login(UserData));
    dispatch(stopLoading());

    if (!res.payload.error) {
      navigate('/');
    }
  };

  return (
    <div className="splashBG bg-[#6D22FB] h-screen w-full flex items-center justify-center text-white text-center">
      <div className="w-[90%] lg:w-[40%] px-8 lg:px-14 py-12 lg:pt-20 rounded-2xl bg-black/[0.5] backdrop-blur-[3px]">
        <h1 className="font-['Comfortaa'] text-white text-3xl font-bold">
          LOGIN
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-6 w-full text-lg w-full"
          onSubmit={(event) => authenticate(event)}
        >
          <input
            className="w-full p-3 mt-6 bg-transparent border-2 rounded-full font-medium text-center"
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
          <button
            className="w-1/2 rounded-full py-3 bg-white text-[#6D22FB] font-medium hover:bg-transparent border-2 border-transparent hover:border-white hover:text-white"
            type="submit"
          >
            { isLoading ? (<Spinner classes="bg-white" />) : 'Login' }
          </button>
          { loginStore && (
            <p>{loginStore}</p>
          )}
          <div className="w-full mt-8 lg:mt-12 flex items-center justify-center gap-3">
            <p>Not a member?</p>
            <NavLink
              className="py-2 text-fuchsia-400 text-lg font-medium"
              to="/signup"
            >
              Signup
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
