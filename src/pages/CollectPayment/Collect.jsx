import React, { useState } from 'react'
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { generateUniqueToken } from '../../generateToken';
import './collectPay.scss'
import { AiOutlineClose } from 'react-icons/ai';
const Collect = () => {
  const [paymentData, setPaymentData] = useState('');
  const [formData, setFormData] = useState({
    recipient: '',
    amount: 0,
    // Add other payment data fields here
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine payment data fields into a single string or JSON object
    const combinedData = JSON.stringify(formData);

    // Generate a unique confirmation token
    const confirmationToken = generateUniqueToken(12);

    // Set the payment data in state
    setPaymentData({ data: combinedData, token: confirmationToken });
  };

  return (
    <div className='payContainer'>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Recipent Name"
          onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter Price to Be paid"
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {/* Add other input fields for payment data */}
        <button type="submit">Generate QR Code</button>
      </form>

      {paymentData.data && (
        <div className="container">
          <div className="close" onClick={() => setPaymentData('')}> <AiOutlineClose /></div>
 <div className='qrContainer'>
          
          </div>
          <div className="qr">
          <QRCode value={JSON.stringify(paymentData)} />
          </div>
       
        </div>
       
      )}
    </div>
  );
}

export default Collect