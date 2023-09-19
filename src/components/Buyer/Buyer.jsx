import React from 'react';
import Nfc from 'nfc-react-web';

const mockPaymentData = {
  amount: 50,
  currency: 'USD',
  transactionId: '12345',
};

function Buyer() {
  const handleNfcWrite = (error) => {
    if (error) {
      console.log('An error occurred while writing to tag: ', error);
    } else {
      console.log('Payment data written to NFC tag! :)');
    }
  };

  const writePaymentDataToNfcTag = () => {
    const nfc = new Nfc({ onWrite: handleNfcWrite });
    nfc.write(mockPaymentData);
  };

  return (
    <div>
      <h2>Buyer</h2>
      <button onClick={writePaymentDataToNfcTag}>Buy</button>
    </div>
  );
}

export default Buyer;
