import React, { useContext, useState } from "react";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { generateUniqueToken } from "../../generateToken";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../../contexts/AppContext";
import { addDoc } from "firebase/firestore";

const Collect = () => {
  const { curUser, cards, cardsCollectionRef, getCards } = useContext(AppContext);
  const [paymentData, setPaymentData] = useState("");
  const [formData, setFormData] = useState({
    recipient: "",
    amount: 0,
    link: "https://testpaymentkuipid.netlify.app/confirmPage",

    // Add other payment data fields here
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine payment data fields into a single object
    const combinedData = { ...formData };

    // Generate a unique confirmation token
    const confirmationToken = generateUniqueToken(12);

    // Set the payment data in state
    setPaymentData({ data: combinedData, token: confirmationToken });
    if (paymentData) {
      const { userId } = curUser;
      const newTransaction = {
        userId,
        ...paymentDate,
      };
      await addDoc(transactionRef, newTransaction);
    }
    // Navigate to the success page
    // navigate('/success');
  };

  const isFormValid = formData.recipient && formData.amount > 0;

  return (
    <div className="flex items-center justify-center relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="text-3xl absolute text-white top-3 left-3"
      />
      <div className="max-w-md w-[90%] bg-white bg-opacity-90 p-4 md:p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Recipient Name"
            onChange={(e) =>
              setFormData({ ...formData, recipient: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Enter Price to Be Paid"
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
          {/* Add other input fields for payment data */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${
              isFormValid
                ? "hover:bg-blue-700"
                : "opacity-50 cursor-not-allowed"
            } focus:outline-none focus:ring focus:border-blue-300 mt-4`}
            disabled={!isFormValid}>
            Generate QR Code
          </button>
        </form>

        {paymentData.data && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="cursor-pointer text-gray-300 hover:text-gray-200">
                <AiOutlineClose
                  onClick={() => setPaymentData("")}
                  className="text-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-8">
                {/* Add any additional styling for the container */}
              </div>

              <div className="bg-white p-4 rounded-md">
                <QRCode value={JSON.stringify(paymentData)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collect;
