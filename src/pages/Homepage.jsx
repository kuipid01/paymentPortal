import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {


    return (
        <div className='w-full relative  flex justify-center  h-screen bg-[#1E1E1E]'>
            <div style={{ background: 'linear-gradient(90deg, #FA06FF 0%, rgba(219, 255, 0, 0.87) 90.1%)' }} className='rounded-[20px] absolute top-[2vh] left-1/2 -translate-x-1/2 w-[70px] mt-[47px] h-[44px]'></div>
            <div style={{ background: 'linear-gradient(90deg, #FA06FF 0%, rgba(219, 255, 0, 0.87) 90.1%)' }} className='rounded-[20px] absolute top-[2vh] left-1/2 -translate-x-[82%] w-[70px] mt-[47px] h-[44px]'></div>
    <h1 className='font-bold text-2xl text-white uppercase absolute top-[12vh] left-1/2 -translate-x-1/2'>DayoPay</h1>         
            <img src="/bgImg.jpg" className=' absolute top-[89px] -left-[30%] w-[199px] h-[351px] rounded-[121px]' alt="" />
            <img src="/bgImg.jpg" className=' absolute top-[40%] -right-[20%] w-[199px] h-[351px] rounded-[121px]' alt="" />
            <img src="/bgImg.jpg" className=' absolute -top-[30%] -right-[20%] w-[199px] h-[351px] rounded-[121px]' alt="" />
                <Link style={{ background: 'rgba(255, 55, 47, 0.67)' }} to='/register' className='px-[30px] absolute bottom-[10vh] left-1/2 -translate-x-1/2  rounded-[53px] text-white py-[15px]'>Get Started</Link>       
                <Link to='/dashboard' className='px-[50px] absolute bottom-[3vh] left-1/2 bg-black -translate-x-1/2  rounded-[53px] text-white py-[15px]'>Login</Link>       
        </div>

    )
}

export default Homepage