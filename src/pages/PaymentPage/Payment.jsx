/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./payment.scss";
// import QRScanner from '../../components/QrScanComponent/QrScanner';
import Loading from '../../components/Loading/Loading'
import { QrReader } from 'react-qr-reader';
import { Transition } from '@headlessui/react';
import styles from './Qrscan.module.css';
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {  useNavigate } from "react-router-dom";
const Payment = () => {
  const [radiValue, setRadiValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
const navigate = useNavigate()
  useEffect(() => {
    // Simulate loading for 1 second
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 1 second
    }, 500);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [scanning, setScanning] = useState(false);

  const startScanning = () => {
    setScanning(true);
    // Additional logic to start the QR code scanner
  };



  const [result, setResult] = useState('Result Scan');

  const handleError = (err) => {
    console.err(err)
  }

  const handleScan = (result) => {
    if (result) {
      setResult(result)
      navigate(`/paymentConfirmed?result=${result}`);
    }
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }
  // const config = {
  //   public_key: "FLWPUBK_TEST-cf4564e4f7931f5cc9f23aa36942617c-X",
  //   tx_ref: Date.now(),
  //   amount: 10000 ,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: 'adeyemi@gmail.com',
  //     phone_number:  '+2349157016669',
  //     name: 'Adeyemi Adeniyi',
  //   },
  //   customizations: {
  //     title: "Flutter Product Payment Page",
  //     description: "Payment for items ",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };

  //  const handleFlutterPayment =   useFlutterwave(config);
  // const handleCheckOut = () => {
  //   setRadiValue(!radiValue)
  //    setIsLoading(true)
  //    setTimeout(() => {
  //      setIsLoading(false)
  //    }, 2000);
  //   handleFlutterPayment({
  //     callback: (response) => {
  //       console.log(response);
  //       closePaymentModal();
  //     },
  //     onClose: () => {},
  //   },
  //   )

  // }


  if (isLoading) {
    return <Loading />
  }


  else {
    return (
      <div className="flex flex-col items-center justify-center relative  min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-3xl font-semibold mb-6">QR Code Scanner</h2>

          <button className="text-blue-500 border-blue-500 border rounded-lg shadow-md cursor-pointer" onClick={startScanning}>
            Start Scanning
          </button>

          <Transition show={scanning} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100">
            {(ref) => (
              <div ref={ref} className="mt-4">
                {/* Render your QR scanner component here */}
                <QrReader delay={500}
                  style={previewStyle}
                  onError={handleError}
                  onScan={handleScan} />
              </div>
            )}
          </Transition>
        </div>

        {
          scanning && <div className={styles.result} >{result}</div>
        }

      </div>
    )
  }

};

export default Payment;
