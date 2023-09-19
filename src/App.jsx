/* eslint-disable no-unused-vars */
import { useState } from 'react'

import './App.scss'


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from "react-router-dom"
import Home from './pages/Home/Home';
import Payment from './pages/PaymentPage/Payment';
function App() {
  const Layout = () => {
    return (
      <div >
      
 
           
            <Outlet />
      

      </div>
    );
  };
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/paymentPage",
          element: <Payment />,
        },
       
      ],
    },
   
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;

