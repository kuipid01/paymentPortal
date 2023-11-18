import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import CardItem from './CardItem';

const AllCards = () => {
  const { curUser, cards } = useContext(AppContext);

  return curUser ? (
    <div className="d-flex flex-column align-items-center">
      {cards.length > 0 ? (
        <>
          <h1>Card List</h1>
          {cards.map(card => {
            return (
              <CardItem card={card} hide={true} hideAll={true} className="mt-4" key={card.id} />
            );
          })}
        </>
      ) : (
        <h1>No cards</h1>
      )}
    </div>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default AllCards;
