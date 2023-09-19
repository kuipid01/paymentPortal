/* eslint-disable no-unused-vars */
import React from 'react'
import './home.scss'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='homeContainer flexCenter'>

        <h1 className="text">Welcome</h1>
        <Link to='/paymentPage'>
        <Button darkBtn={true} text='Make Payment'/>
        </Link>
        
        <Link to='/collectPay'>
        <Button darkBtn={false} text='Collect Payment'/>
        </Link>
       
    </div>
  )
}

export default Home