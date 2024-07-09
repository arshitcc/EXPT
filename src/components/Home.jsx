import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const authStatus = useSelector((state) =>  state.auth.authStatus);

  return authStatus ? (<div>Welcome User</div>) : (<div>Please Login</div>)
}

export default Home