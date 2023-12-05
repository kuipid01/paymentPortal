import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
const OtherPayment = () => {
  const { curUser, user } = useContext(AppContext);
    const navigate = useNavigate();
 
  const linksDetails = [
    {
      id: 1,
      name: "Debit/Credit Card",
      imgUrl: "https://i.pinimg.com/564x/d6/24/46/d6244636a907eb2d654a42cef2fd792c.jpg",
      link:'/credit'
    },
    {
      id: 2,
      name: "FlutterWave",
      imgUrl: 
      "https://asset.brandfetch.io/iddYbQIdlK/idN21BaY-U.jpeg",
      link:'/flutter'
    },
    {
      id: 3,
      name: "Pay",
      imgUrl: "https://lh3.googleusercontent.com/sLOqRZU_8S8C9xMIyc7kD74pyIuJWUi5zBsopj95PZ6C78PFRxwaLN0mMfDbQhKM0F9VEsM-L_0wt-q-HAJwDr3phCjzNjASyjSL",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0K7UR8kQj5FiKOQmorJ_8D7IXXNe12UeDpPAUHHFfUzC5COqaifJZA47ILgiawNZUOTQ&usqp=CAU",
    },
  ];


  return (
    <div className="w-full  bg-gradient-to-br from-gray-800 to-gray-900 h-screen flex flex-col relative">
      <AiOutlineArrowLeft  onClick={() => navigate(-1)} className="absolute text-gray-100 left-5 top-5" />

      <h1 className="text-gray-100 mt-[70px]  pl-[30px] text-[30px] my-[30px]">
        Choose Payment <br /> option{" "}
      </h1>
      <div className="flex w-full mx-auto gap-5 flex-col">
        {linksDetails.map((item) => (
          <Link to={item.link} key={item.id} className="w-[90%] shadow-md mx-auto px-3 h-[60px] py-3  rounded-[5px] bg-gray-100 cursor-pointer items-center flex justify-between ">
           
           <div className=" flex h-full items-center gap-3">
           {item.logo ? (
              <img
                className="w-[30px] object-cover h-[30px]"
                src={item.logo || ""}
                alt=""
              />
            ) : (
              ""
            )}

            <span>{item.name}</span>
            </div>
            <img
              className="w-[30px] h-[30px] object-cover"
              src={item.imgUrl}
              alt=""
            />
          </Link>
        ))}
        <button className="w-[90%] mt-[40px] gap-3 mx-auto px-3 h-[60px] py-3  rounded-[10px]  items-center bg-gray-300/100 shadow-md flex "><AiOutlinePlus/> Add another option</button>
      </div>
    </div>
  );
};

export default OtherPayment;
