import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import CardItem from './CardItem';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Home = () => {
  const { curUser, cards } = useContext(AppContext);
  const navigate = useNavigate();

  let cardsFiltered = '';

  if (curUser) {
    cardsFiltered = cards.filter(c => c.cardHolderId === curUser.id);
  }

  return curUser ? (
    <div className="flex mt-5 relative flex-col items-center ">
      <AiOutlineArrowLeft onClick={() => navigate(-1)} className='text-3xl absolute text-gray-600 top-3 left-3'/>
    
    {cardsFiltered.length > 0 ? (
      <>
        <h1 className="text-2xl font-bold mb-4">My Cards</h1>
        {cardsFiltered.map((card) => (
          <a
            href={`/card/${card.id}`}
            key={card.id}
            className="card-list block w-full mb-4 p-4 border border-gray-300 rounded-md hover:border-blue-500"
          >
            {/* Assuming CardItem is a component to display card details */}
            <CardItem card={card} hide={true} />
          </a>
        ))}
      </>
    ) : (
      <h1 className="text-2xl font-bold">Add a card!</h1>
    )}

    <button
      onClick={() => navigate('/create')}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-4"
    >
      + Add
    </button>
    <div className="flex w-full px-5 gap-3 justify-center items-center">
    <Link className='bg-blue-500 w-1/2 flex justify-center items-center text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-4' to='/makePayment'>Make Payment</Link>
    <Link className='bg-blue-500 w-1/2 flex justify-center items-center text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-4' to='/collect'>Collect Payment</Link>
   
   
    </div>
    
   
  </div>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default Home;
