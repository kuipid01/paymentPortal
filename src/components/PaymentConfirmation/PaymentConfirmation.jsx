
import { FaCheckCircle } from 'react-icons/fa';
import './PaymentConfirmation.scss'; // You can create this CSS file to style the page.

const PaymentConfirmation = () => {
  return (
    <div className="payment-confirmation-container">
      <div className="payment-confirmation-content">
        <FaCheckCircle className="check-icon" />
        <h2>Payment Confirmed</h2>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
