import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const BankTransfer = () => {
  const { curUser, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [btnLoading, setBtnloading] = useState(false);
  const phoneNumber = 9057016669;


  return (
    <div className="w-full  bg-gradient-to-br from-gray-800 to-gray-900 h-screen flex flex-col relative">
       <AiOutlineArrowLeft  onClick={() => navigate(-1)} className="absolute text-gray-100 left-5 top-5" />

<h1 className="text-gray-100 mt-[70px]  pl-[30px] text-[30px] my-[30px]">
  Enter Transactions  <br /> Details{" "}
</h1>

<form className="w-[90%] flex flex-col gap-4 mx-auto" action="">
        <div className=" flex flex-col p-1 gap-2">
          <label className="text-gray-300" htmlFor="card "> Enter Account Number</label>
          <div className="w-full bg-gray-900 rounded-md">
            <input
              className=" outline-none w-full p-3 text-gray-400"
              type="number"
              name=""
              id=""
              onChange={ (e) =>  setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full gap-2">
         { amount>0 ? 
          <button type="submit" className="bg-blue-400 py-2 rounded-[15px] flex-1  w-fit  text-white">
           {
            btnLoading ? 'Loading' : 'Pay Now'
           }
          </button> : <div className="bg-blue-300  flex justify-center items-center py-2 rounded-[15px] flex-1  w-fit  text-white">Enter Amount</div> }
        </div>
    
      </form>
      <button onClick={() => navigate(-1)} className="w-[90%] mx-auto mt-4 py-2 text-black rounded-[15px] bg-gray-200">
            Cancel Payment
          </button>
    </div>
  );
};
