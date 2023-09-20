// src/BluetoothPayment.js
import  { useState } from 'react';

function BluetoothPayment() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const connectToDevice = async () => {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [0x1234] }],
          });
      const server = await device.gatt.connect();
      await simulatePaymentProcess();
      setPaymentConfirmed(true);
      server.disconnect();
    } catch (error) {
      console.error('Bluetooth connection error: ' + error);
    }
  };

  const simulatePaymentProcess = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };

  return (
    <div>
      <h1>Bluetooth Payment</h1>
      {paymentConfirmed ? (
        <p>Payment Confirmed</p>
      ) : (
        <button onClick={connectToDevice}>Connect and Pay</button>
      )}
    </div>
  );
}

export default BluetoothPayment;
