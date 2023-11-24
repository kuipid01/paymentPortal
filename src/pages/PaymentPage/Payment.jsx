import React, { useContext, useEffect, useState } from "react";
import "./payment.scss";
import Loading from "../../components/Loading/Loading";
import QrReader from "react-qr-reader";
import { Transition } from "@headlessui/react";
import styles from "./Qrscan.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AppContext } from "../../contexts/AppContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import ThreeDotsWave from "../../components/DotsLoading";
import { db } from "../../../firebase";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scCompletPaymentBtn, setCompletPaymentBtn] = useState(false);
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

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = async (result) => {
    if (result) {
      // setLoading(true); // Set loading state to true
      setCompletPaymentBtn(true);
      setResult(result);
    }
  };
  const confirmPayment = async (result) => {
    try {
      // Fetch user data again to get the most up-to-date totalBalance
      const userRef = doc(db, "users", curUser.id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const {
          data: { amount },
        } = result; // Destructure the amount from the result object
        const totalBalance = userDoc.data().totalBalance;

        // Update totalBalance
        await updateDoc(userRef, {
          totalBalance: totalBalance - parseInt(amount),
        });

        // Create transaction reference in the database
        const newTransaction = {
          curUser,
          amount,
        };
        await addDoc(transactionCollectionRef, newTransaction);

        setLoading(true); // Set loading state to false
        navigate("/confirmPage"); // Redirect to success page
      } else {
        console.error("User not found");
        setLoading(false); // Set loading state to false
        // Handle error, show a message, or redirect to an error page
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setLoading(false); // Set loading state to false
      // Handle error, show a message, or redirect to an error page
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
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="text-white absolute top-3 left-3 text-4xl"
      />
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-semibold mb-6">QR Code Scanner</h2>

        <button
          className="text-blue-500 border-blue-500 border rounded-lg shadow-md cursor-pointer"
          onClick={startScanning}>
          Start Scanning
        </button>

        <Transition
          show={scanning}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100">
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
      {scCompletPaymentBtn && result && (
        <button
          onClick={confirmPayment}
          className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
          Complete Payment
        </button>
      )}
      {scanning && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default Payment;
