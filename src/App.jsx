import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from './features/authSlice';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try { 
        const user = await authService.getCurrentSession();
        if (user) dispatch(userLogin(user));
        else dispatch(userLogout());
      } catch (error) {
        console.error('Error fetching user session:', error);
        dispatch(userLogout());
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  


  return !loading ? (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  ) : null
}

export default App