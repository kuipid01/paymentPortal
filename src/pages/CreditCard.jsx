import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CreditCard = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full  text-gray-200 bg-gradient-to-br from-gray-800 to-gray-900 h-screen flex flex-col relative'>
             <AiOutlineArrowLeft  onClick={() => navigate(-1)} className="absolute text-gray-100 left-5 top-5" />

           <h1 className="text-gray-100 mt-[70px]  pl-[30px] text-[30px] my-[30px]">
        Debit / <br /> Credit Card{" "}
      </h1>
<form className='w-[90%] flex flex-col gap-4 mx-auto' action="">

     <div className=' flex flex-col p-1 gap-2'>
        <label htmlFor="card "> Card Number</label>
        <div className='w-full bg-gray-900 rounded-md'>
        <input className=' outline-none w-full p-3 text-gray-400' type="number" name="" id="" />
        </div>
    
     </div>
     <div className='flex w-full justify-between'>
        <div>
        <label htmlFor="Expirt Date">
            Expiry Date
        </label>
        <div>
            <select name="month" id="month">
                <option value="jan">Jan</option>
                <option value="jan">Feb</option>
                <option value="jan">Mar</option>
                <option value="jan">Apr</option>
                <option value="jan">May</option>
                <option value="jan">Jun</option>
                <option value="jan">Jul</option>
                <option value="jan">Aug</option>
                <option value="jan">Sep</option>
                <option value="jan">Oct</option>
                <option value="jan">Nov</option>
                <option value="jan">Dec</option>
            </select>
        </div>
        </div>
   <div>
    <label htmlFor="CVV">CVV</label>
    <input className=' outline-none w-full p-3 text-gray-400' type="password" name="cvv" id="cvv" />
   </div>
     </div>

     <div className='flex w-full gap-2'>
        <button className='flex-1 py-2 text-black rounded-[15px] bg-gray-200'>Cancel Payment</button>
        <button className='bg-blue-400 py-2 rounded-[15px] flex-1  w-fit  text-white'>Pay Now</button>
     </div>
</form>

    </div>
  )
}

export default CreditCard