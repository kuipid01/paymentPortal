/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./payment.scss";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
const Payment = () => {
  const [radiValue, setRadiValue] = useState(true);
  return (
    <div className="paymentPageContainer">
      <div className="nav">
        <BiArrowBack className="backArrow" />

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
              <RiSecurePaymentFill/>
            </span>
          </div>
        </div>
      </div>
      <div className="payCard flexCenter">
        <img src="flutterwave.png" alt="" />
        <span className="cc">Flutterwave</span>
        <div className="radio" onClick={() => setRadiValue(!radiValue)}>
          {radiValue && <div className="check"></div>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
