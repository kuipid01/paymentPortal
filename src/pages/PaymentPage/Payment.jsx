/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./payment.scss";
// import QRScanner from '../../components/QrScanComponent/QrScanner';
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import { Link } from "react-router-dom";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'; 
import { BrowserMultiFormatReader } from '@zxing/library'; 
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
const Payment = () => {
  const [radiValue, setRadiValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

 
  const config = {
    public_key: "FLWPUBK_TEST-cf4564e4f7931f5cc9f23aa36942617c-X",
    tx_ref: Date.now(),
    amount: 10000 ,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: 'adeyemi@gmail.com',
      phone_number:  '+2349157016669',
      name: 'Adeyemi Adeniyi',
    },
    customizations: {
      title: "Flutter Product Payment Page",
      description: "Payment for items ",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
 
  // const handleFlutterPayment =   useFlutterwave(config);
  const handleCheckOut = () => {
    setRadiValue(!radiValue)
     setIsLoading(true)
     setTimeout(() => {
       setIsLoading(false)
     }, 1000);
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal();
      },
      onClose: () => {},
    },
    )
    
  }


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
          {radiValue ? <div className="check"></div> : ''}
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
      <div onClick={handleCheckOut} className="flutter flexCenter">
        <img src="flutterwave.png" alt="" />
        <span className="cc">Flutterwave</span>
        <div className="radio" >
          {!radiValue ? <div className="check"></div>: ''}
        </div>
      </div>
   <Link className="btnProblem" to='/paytag'>
   <button className="contact">Pay ContactLesslly</button>
  
   </Link>
       </div>
    )
}
 
};

export default Payment;
