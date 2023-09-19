/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./payment.scss";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import { Link } from "react-router-dom";
const Payment = () => {
  const [radiValue, setRadiValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Handle the camera stream, e.g., display it in a video element
      const videoElement = document.getElementById('camera-view');
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  useEffect(() => {
    // Use setTimeout to change isLoading to false after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
if (isLoading) {
  return  <Loading/>
}
else {
  return (
   <div className="paymentPageContainer">
      <div className="nav">
        <Link to='/'>
          <BiArrowBack className="backArrow" />
        </Link>


        <span className="tit">Payment</span>

        <AiOutlineClose className="backArrow" />
      </div>
      <div className="payCard flexCenter">
        <MdOutlinePayment className="cardIcon" />
        <span className="cc">Credit Card</span>
        <div className="radio" onClick={() => setRadiValue(!radiValue)}>
          {radiValue && <div className="check"></div>}
        </div>
      </div>
      <div className="cardInfo">
        <p>Card information</p>
        <div className="details">
          <div className="top">
            <input className='topText' type="text" />
            <span>VISA</span>
          </div>
          <hr />
          <div className="btm">
            <span className="mm">
              {" "}
              <input type="text" placeholder="MM" /> /{" "}
              <input type="text" placeholder="YY" />{" "}
            </span>{" "}
            <div className="line"></div>
            <span className="cvc">
              {" "}
              <input type="text" placeholder="CVC" /> {" "}
              <RiSecurePaymentFill />
            </span>
          </div>
        </div>
      </div>
      <div className="flutter flexCenter">
        <img src="flutterwave.png" alt="" />
        <span className="cc">Flutterwave</span>
        <div className="radio" onClick={() => setRadiValue(!radiValue)}>
          {radiValue && <div className="check"></div>}
        </div>
      </div>

      <button onClick={handleOpenCamera} className="contact">Contactless Payment</button>
    </div>
    )
}
 
};

export default Payment;
