import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreditCard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  text-gray-200 bg-gradient-to-br from-gray-800 to-gray-900 h-screen flex flex-col relative">
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="absolute text-gray-100 left-5 top-5"
      />

      <h1 className="text-gray-100 mt-[70px]  pl-[30px] text-[30px] my-[30px]">
        Debit / <br /> Credit Card{" "}
      </h1>
      <form className="w-[90%] flex flex-col gap-4 mx-auto" action="">
        <div className=" flex flex-col p-1 gap-2">
          <label htmlFor="card "> Card Number</label>
          <div className="w-full bg-gray-900 rounded-md">
            <input
              className=" outline-none w-full p-3 text-gray-400"
              type="number"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex-1">
            <label htmlFor="Expirt Date">Expiry Date</label>
            <div>
              <select className="bg-gray-900 py-2 px-2" name="month" id="month">
                <option value="jan">Jan</option>
                <option value="feb">Feb</option>
                <option value="mar">Mar</option>
                <option value="apr">Apr</option>
                <option value="may">May</option>
                <option value="jun">Jun</option>
                <option value="jul">Jul</option>
                <option value="aug">Aug</option>
                <option value="sep">Sep</option>
                <option value="oct">Oct</option>
                <option value="nov">Nov</option>
                <option value="dec">Dec</option>
              </select>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="CVV">CVV</label>
            <input
              className=" bg-gray-900 w-fit py-2 px-2 outline-none   text-gray-400"
              type="password"
              name="cvv"
              id="cvv"
              placeholder="***"
            />
          </div>
        </div>
    <div className="w-full  flex flex-col gap-2">
        <label htmlFor="userName">Username:</label>
        <input className="bg-gray-900 rounded-[5px] w-full py-3  px-2" type="text" placeholder="Dayop Owolabi" />
    </div>
        <div className="flex w-full gap-2">
          <button className="flex-1 py-2 text-black rounded-[15px] bg-gray-200">
            Cancel Payment
          </button>
          <button className="bg-blue-400 py-2 rounded-[15px] flex-1  w-fit  text-white">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCard;
