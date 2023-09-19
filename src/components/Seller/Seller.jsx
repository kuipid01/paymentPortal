import React, { useState, useEffect } from 'react';
import Nfc from 'nfc-react-web';

function Seller() {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handleNfcRead = (data) => {
      console.log(`Payment data read from tag: ${JSON.stringify(data)}`);
      setPaymentData(data);
    };

    const nfc = new Nfc({ onRead: handleNfcRead });
    nfc.start();

    return () => {
      nfc.stop();
    };
  }, []);

  return (
    <div>
      <h2>Seller</h2>
      {paymentData ? (
        <div>
          <p>Received Payment Data:</p>
          <pre>{JSON.stringify(paymentData, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for payment data from the Buyer...</p>
      )}
    </div>
  );
}

export default Seller;
