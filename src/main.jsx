import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home, Login, Signup, Contact, TransactionsList, NewPayment} from './components'
import { Provider } from 'react-redux'
import { myStore } from './app/walletStore.js'

const myRouter = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/add',
        element : <NewPayment/>
      },
      {
        path : '/transactions',
        element : <TransactionsList/>
      },
      {
        path : '/signup',
        element : <Signup/>
      }, 
      {
        path : '/contact',
        element : <Contact/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={myStore}>
    <RouterProvider router={myRouter}/>
  </Provider>
)
