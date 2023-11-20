import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Dashboard = () => {
  return (
    <div className='w-full flex flex-col h-screen overflow-y-scroll relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700'>
      <div className='w-full p-5'>
        <div className=' flex items-center justify-between w-full'>
          <AiOutlineArrowLeft className='text-white text-4xl' />
          <img src="/master.png" className='w-[60px] h-[60px] object-cover' alt="master" />
        </div>
        <p className='text-gray-400 mt-4 text-2xl'>Balance</p>
        <h1 className='text-white text-4xl mt-3 leading-6 tracking-wider'>#40000</h1>
        <hr className='w-full h-[1px] text-gray-600 mt-6 opacity-30 rounded-full' />
        <div className="flex justify-between items-center">

          <p className='text-gray-400 mt-4 text-2xl'>Adegoke Stephen</p>
          <p className='text-gray-600 mt-4 text-sm'>Current Account</p>
        </div>
      </div>
      <div className="mt-5 h-full p-5 grid grid-cols-2 gap-4 rounded-tl-[40px] rounded-tr-[40px] bg-gray-400">

        <div className='rounded-2xl cursor-pointer font-extrabold text-lg text-black flex justify-center items-center h-[100px] bg-white shadow relative'>
          Pay
        </div>

        <div className='rounded-2xl cursor-pointer font-extrabold text-lg text-black flex justify-center items-center h-[100px] bg-white shadow relative'>
          Receive
        </div>
   


      </div>
      <p>Offers</p>
<div className='flex gap-3 p-3 bg-gray-500'>
<img className='w-[60px] h-[60px] object-cover' src="https://e7.pngegg.com/pngimages/18/942/png-clipart-spotify-computer-icons-music-transparency-logo-spotify-logo-grass.png" alt="" />
<div>
  <h1>Spotify</h1>
  <p>1 Month Subscribtion</p>
</div>
</div>
    </div>
  )
}

export default Dashboard
