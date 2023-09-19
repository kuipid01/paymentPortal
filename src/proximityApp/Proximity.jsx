import React, { useState, useEffect } from 'react';

function ProximityPaymentApp() {
  const [buyerName, setBuyerName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [nfcReader, setNfcReader] = useState(null);
  
  // Mocked card data for the buyer
  const buyerCard = {
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expirationDate: '12/25',
  };

  // Simulate NFC reading (for demonstration purposes)
  useEffect(() => {
    const simulateNFCRead = () => {
      const data = 'NFC Data'; // Mock NFC data
      handlePayment(data);
    };

    // Check for NFC support
    if ('NDEFReader' in window) {
      const reader = new NDEFReader();

      reader.onerror = (error) => {
        console.error('NFC Error:', error);
      };

      reader.onreading = () => {
        simulateNFCRead();
      };

      setNfcReader(reader);
    } else {
      setPaymentStatus('NFC not supported in this browser.');
    }
  }, []);

  const handlePayment = (data) => {
    // Simulate payment logic
    const numericPaymentAmount = parseFloat(paymentAmount);
    if (isNaN(numericPaymentAmount) || numericPaymentAmount <= 0) {
      setPaymentStatus('Invalid payment amount.');
    } else if (numericPaymentAmount > 1000) {
      setPaymentStatus('Payment amount exceeds the limit.');
    } else {
      // Deduct payment from buyer's "account"
      // In this mock, we'll simply subtract the payment amount
      // You can replace this with actual payment processing logic
      const remainingBalance = 10000 - numericPaymentAmount;
      setPaymentStatus(`Payment successful! Remaining balance: $${remainingBalance.toFixed(2)}`);
    }
  };

  const startNfcListener = () => {
    if (nfcReader) {
      nfcReader.scan();
      setPaymentStatus('NFC reader started. Move your phone near an NFC tag.');
    }
  };

  return (
    <div>
      <h2>Proximity Payment App</h2>
      <div>
        <label>
          Buyer's Name:
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Seller's Name:
          <input
            type="text"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Payment Amount:
          <input
            type="text"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </label>
      </div>
      <button onClick={startNfcListener}>Start NFC Payment</button>
      <div>{paymentStatus}</div>
      <div>
        <h3>Buyer's Card Information</h3>
        <p>Card Number: {buyerCard.cardNumber}</p>
        <p>Card Holder: {buyerCard.cardHolder}</p>
        <p>Expiration Date: {buyerCard.expirationDate}</p>
      </div>
    </div>
  );
}

export default ProximityPaymentApp;
