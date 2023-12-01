import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden relative  flex justify-center  h-screen bg-[#1E1E1E]">
      <div className="flex w-fit h-fit flex-col justify-center items-center">
        <div
          style={{
            background:
              "linear-gradient(90deg, #FA06FF 0%, rgba(219, 255, 0, 0.87) 90.1%)",
          }}
          className="rounded-[20px]  w-[70px] mt-[47px] h-[44px]"
        ></div>
        <div
          style={{
            background:
              "linear-gradient(90deg, #FA06FF 0%, rgba(219, 255, 0, 0.87) 90.1%)",
          }}
          className="rounded-[20px] w-[70px] mt-[47px] h-[44px]"
        ></div>
        <h1 className="font-bold text-2xl text-white uppercase absolute top-[12vh] left-1/2 -translate-x-1/2">
          DayoPay
        </h1>
      </div>
      <img
        src="/bgImg.jpg"
        className=" absolute top-[20%] -left-[35%] w-[199px] h-[351px] rounded-[121px]"
        alt=""
      />
      <img
        src="/bgImg.jpg"
        className=" absolute top-[50%] -right-[35%] w-[199px] h-[351px] rounded-[121px]"
        alt=""
      />
      <img
        src="/bgImg.jpg"
        className=" absolute -top-[30%] -right-[30%] w-[199px] h-[351px] rounded-[121px]"
        alt=""
      />
      <Link
        style={{ background: "rgba(255, 55, 47, 0.67)" }}
        to="/register"
        className="px-[30px] absolute bottom-[15vh] left-1/2 -translate-x-1/2  rounded-[53px] text-white py-[15px]"
      >
        Get Started
      </Link>
      <Link
        to="/login"
        className="px-[50px] absolute bottom-[5vh] left-1/2 bg-black -translate-x-1/2  rounded-[53px] text-white py-[15px]"
      >
        Login
      </Link>
    </div>
  );
};

export default Homepage;
