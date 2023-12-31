/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./proximity.scss";
import Loading from "../components/Loading/Loading";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/Button/Button";
import { FaCheckCircle } from "react-icons/fa"; // Import Font Awesome checkmark icon
import './proximity.scss'; // Add CSS for PaymentConfirmationPage

function ProximityPaymentApp() {
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [nfcReader, setNfcReader] = useState(null);
  const [testPage, settestPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(false);
  const [isNfcReading, setIsNfcReading] = useState(false); // New state for NFC reading
  const [nfcData, setNfcData] = useState(null); // New state for NFC data

  // Mocked card data for the buyer
  const buyerCard = {
    cardNumber: "**** **** **** 1234",
    cardHolder: "John Doe",
    expirationDate: "12/25",
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8, // Adjust the duration as needed
      },
    },
    exit: {
      opacity: 0,
    },
  };

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

  // Simulate NFC reading (for demonstration purposes)
  useEffect(() => {
    const simulateNFCRead = (data) => {
      setIsNfcReading(false); // NFC reading completed
      setNfcData(data); // Set NFC data in state
      handlePayment(data);
    };

    // Check for NFC support
    if ("NDEFReader" in window) {
      const reader = new NDEFReader();

      reader.onerror = (error) => {
        console.error("NFC Error:", error);
      };

      reader.onreading = () => {
        simulateNFCRead("NFC Data"); // Mock NFC data for demonstration
      };

      setNfcReader(reader);
    } else {
      setPage(true);
      setPaymentStatus("NFC communication not supported on this device. ");
    }
  }, []);

  const handlePayment = (data) => {
    // Simulate payment logic
    const numericPaymentAmount = parseFloat(paymentAmount);
    if (isNaN(numericPaymentAmount) || numericPaymentAmount <= 0) {
      setPaymentStatus("Invalid payment amount.");
    } else if (numericPaymentAmount > 1000) {
      setPaymentStatus("Payment amount exceeds the limit.");
    } else {
      // Deduct payment from buyer's "account"
      // In this mock, we'll simply subtract the payment amount
      // You can replace this with actual payment processing logic
      const remainingBalance = 10000 - numericPaymentAmount;
      setPaymentStatus(
        `Payment successful! Remaining balance: $${remainingBalance.toFixed(2)}`
      );
    }
  };

  const startNfcListener = () => {
    if (nfcReader) {
      setIsNfcReading(true); // Start NFC reading animation
      nfcReader.scan();
      setPaymentStatus("NFC reader started. Move your phone near an NFC tag.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (Page) {
    return (
      <div className="error flexCenter">
        <Link className="abs" to="/paymentPage">
          <BiArrowBack className="backArrow" /> <span>Go Home</span>
        </Link>
        <img
          src="https://i.pinimg.com/originals/00/9f/65/009f6528de23c73d978e437bf1ee2274.gif"
          alt=""
          className="error"
        />
        <div className="textError">{paymentStatus}</div>
        <Link to="/paymentPage">
          <Button darkBtn={false} text="Go Home" />
        </Link>
      </div>
    );
  } else {
    return (
      <div className="proximity">
        <h2>Proximity Payment App</h2>

        <input
          type="text"
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Seller Name"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Payment Amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />

        <button className="btnNfc" onClick={startNfcListener}>
          Initiate Payment
        </button>

        {paymentStatus === "NFC reader started. Move your phone near an NFC tag." && (
          <AnimatePresence>
            <motion.div
              key="Proximity"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="ContainerNfc"
            >
              <img
                src="https://i.pinimg.com/originals/00/9f/65/009f6528de23c73d978e437bf1ee2274.gif"
                alt=""
                className="phone"
              />
              <p className="Animatetext">"Move Device Across Sellers Nfc Tag "</p>
            </motion.div>
          </AnimatePresence>
        )}

        <div className="paymentDets">
          <h3>Buyer's Card Information</h3>
        
          <p>Card Number: {buyerCard.cardNumber}</p>
          <p>Card Holder: {buyerCard.cardHolder}</p>
          <p>Expiration Date: {buyerCard.expirationDate}</p>
        </div>

        {/* Display NFC Data */}
        {nfcData && (
          <div className="nfc-data">
            <h3>NFC Data Read:</h3>
            <p>{nfcData}</p>
          </div>
        )}

        {/* Display Payment Status */}
        <div className="payment-status">
          <h3>Payment Status:</h3>
          <p>{paymentStatus}</p>
        </div>
      </div>
    );
  }
}

export default ProximityPaymentApp;
