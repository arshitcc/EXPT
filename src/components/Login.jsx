import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import { userLogin } from '../features/authSlice';
import Loader from './Loader';

function Login() {

  const [loading,setLoading] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {

    e.preventDefault();
    setError('');
    if(userEmail.trim() === "" || userPassword.trim() === ""){
      setError('Please Enter Valid Details');
      return;
    }

    try {
      setLoading(true);
      const userSession = await authService.userLogin({userEmail, userPassword});
      if(userSession){
        const user = await authService.getCurrentSession();
        if(user) dispatch(userLogin(user));
        setLoading(false)
        navigate('/');
      } 
      setLoading(false);
    } 
    catch (error) {
      setError(error.message);
    }
  }

  return loading ? 
  <Loader/> : 
  (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                  <form 
                  onSubmit={handleLogin}
                  className="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input 
                          onChange={(e) => setUserEmail(e.target.value)}
                          type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input 
                          onChange={(e) => setPassword(e.target.value)}
                          type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? 
                          <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Login