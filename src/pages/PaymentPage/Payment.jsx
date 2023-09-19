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
const Payment = () => {
  const [radiValue, setRadiValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scannedData, setScannedData] = useState(null);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleTakePhoto = (dataUri) => {
    // Handle the captured photo (dataUri)
    console.log('Photo taken:', dataUri);

    // Close the camera after capturing the photo
    closeCamera();
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (isCameraOpen) {
      codeReader.decodeFromVideoDevice(undefined, 'video', (result, error) => {
        if (result) {
          // Handle the scanned QR code data
          console.log('Scanned QR Code:', result.getText());
          setScannedData(result.getText());
        } else if (error) {
          console.error('QR Code scan error:', error);
        }
      });
    }

    return () => {
      codeReader.reset();
    };
  }, [isCameraOpen]);
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
    
      {/* {isCameraOpen ? (
        <div>
          <Camera
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
          />
        </div>
      ) : (
        <button onClick={openCamera} className="contact">Contactless Payment</button>
   
      )} */}
    {isCameraOpen ? (
        <div>
          <Camera
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
            isFullscreen={true}
            id="video"
          />
          <button onClick={closeCamera}>Close Camera</button>
        </div>
      ) : scannedData ? (
        <div>
          <p>Scanned Data: {scannedData}</p>
        </div>
      ) : (
        <button onClick={openCamera}>Open Camera</button>
      )}
    </div>
    )
}
 
};

export default Payment;
