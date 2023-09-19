/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.scss';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Payment from './pages/PaymentPage/Payment';
import Collect from './pages/CollectPayment/Collect';
import ConfirmationPage from './pages/ConfirmPayment/ConfirmationPage';
import Buyer from './components/Buyer/Buyer';
import Seller from './components/Seller/Seller';
import ProximityPaymentApp from './proximityApp/Proximity';

function App() {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .8, // Adjust the duration as needed
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const Layout = () => {
    return (
      <div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={window.location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/paymentPage',
          element:  (
            <AnimatePresence mode='wait'>
              <motion.div
                key="payment"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Payment />
              </motion.div>
            </AnimatePresence>
          ),
        },
        {
          path: '/paytag',
          element:  (
            <AnimatePresence mode='wait'>
              <motion.div
                key="paytag"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ProximityPaymentApp />
              </motion.div>   
            </AnimatePresence>
          ),
        },
        {
          path: '/collectPay',
          element: (
            <AnimatePresence mode='wait'>
              <motion.div
                key="Collect"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Collect />
              </motion.div>
            </AnimatePresence>
          ),
        },
        {
          path: '/confirm-payment/:token',
          element: (
            <AnimatePresence mode='wait'>
              <motion.div
                key="ConfirmationPage"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ConfirmationPage />
              </motion.div>
            </AnimatePresence>
          ),
        },
        {
          path:'/buyer',
          element:<Buyer/>,
        },
        {
          path:'/seller',
          element:<Seller/>,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
