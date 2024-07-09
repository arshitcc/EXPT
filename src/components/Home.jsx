import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const authStatus = useSelector((state) =>  state.auth.authStatus);

  return authStatus ? (<div className='text-center text-8xl'>Welcome User</div>) : (<div className='text-center text-8xl'>Please Login</div>)
}

export default Home