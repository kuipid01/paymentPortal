/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./payment.scss";
import Loading from '../../components/Loading/Loading';
import QrReader from "react-qr-reader";
import { Transition } from '@headlessui/react';
import styles from './Qrscan.module.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for 1 second
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 1 second
    }, 1000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [result, setResult] = useState('No result');

  const handleError = (err) => {
    console.error(err);
  }

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  const startScanning = () => {
    setScanning(true);
  };

  return (
    <div className="flex flex-col items-center  justify-center relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
        <AiOutlineArrowLeft onClick={() => navigate(-1)} className="text-white absolute top-3 left-3 text-4xl" />
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-semibold mb-6">QR Code Scanner</h2>

        <button className="text-blue-500 border-blue-500 border rounded-lg shadow-md cursor-pointer" onClick={startScanning}>
          Start Scanning
        </button>

        <Transition show={scanning} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100">
          {(ref) => (
            <div ref={ref} className="mt-4">
              {/* Render your QR scanner component here */}
              <QrReader
                delay={500}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                facingMode="environment" // Set the default camera to back camera
              />
              <p>{data}</p>
            </div>
          )}
        </Transition>
      </div>

      {scanning && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default Payment;
