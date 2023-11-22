
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './PaymentConfirmation.scss'; // You can create this CSS file to style the page.
import { Link } from 'react-router-dom';

const PaymentConfirmation = () => {
  return (
    <div className="flex flex-col items-center  justify-center relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
      <div className="flex items-center flex-col ">
        <FaCheckCircle className="check-icon" />
        <h2 className='text-3xl text-gray-300 mt-4'>Payment Has Been Made </h2>
        <Link to='/' className='text-lg text-white  border-[1px] border-gray-500/40 p-2 flex items-center gap-3 mt-4 font-bold'> Go Back Home <FaArrowRight/> </Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
