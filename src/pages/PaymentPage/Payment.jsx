import React, { useContext, useEffect, useState } from "react";
import "./payment.scss";
import Loading from "../../components/Loading/Loading";
import QrReader from "react-qr-reader";
import { Transition } from '@headlessui/react';
import styles from './Qrscan.module.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AppContext } from "../../contexts/AppContext";
import { addDoc, collection } from "firebase/firestore";
import ThreeDotsWave from "../../components/DotsLoading";
import { db } from "../../../firebase";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Added loading state
  const { curUser, filteredCards } = useContext(AppContext);
  const transactionCollectionRef = collection(db, "transactions");

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

  const [result, setResult] = useState("No result");

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = async (result) => {
    if (result) {
      setLoading(true); // Set loading state to true

      const newTransaction = {
        curUser,
        result,
      };

      await addDoc(transactionCollectionRef, newTransaction); // Create transaction reference in the database

      setLoading(false); // Set loading state to false
      navigate("/confirmPage"); // Redirect to success page
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const startScanning = () => {
    setScanning(true);
  };

  if (loading) return <ThreeDotsWave />;

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
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
