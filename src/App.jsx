
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AppContext } from './contexts/AppContext';


 import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Home from './components/Home';
import Login from './pages/Login/Login';
import CardDetail from './components/CardDetail';
import Update from './components/Update';
import Users from './components/Users';
import Account from './components/Account';
import Header from './components/Header';
import Register from './components/Register';
import Create from './components/Create';
import AllCards from './components/AllCards';
import Collect from './pages/CollectPayment/Collect';


function App() {
  const usersCollectionRef = collection(db, 'users');
  const cardsCollectionRef = collection(db, 'cards');
  const [curUser, setCurUser] = useState(JSON.parse(sessionStorage.getItem('curUser')));
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  const getUsers = async () => {
    const usersData = await getDocs(usersCollectionRef);
    setUsers(usersData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const getCards = async () => {
    const cardsData = await getDocs(cardsCollectionRef);
    setCards(cardsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
    getCards();
  }, []);

  return (
    <Router>
      <AppContext.Provider
        value={{
          curUser,
          setCurUser,
          users,
          setUsers,
          cards,
          setCards,
          usersCollectionRef,
          cardsCollectionRef,
          getUsers,
          getCards,
        }}
      >
        {/* <Header /> */}
     
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/card/:id" element={<CardDetail />}></Route>
                <Route path="/create" element={<Create />}></Route>
                <Route path="/update/:id" element={<Update />}></Route>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/cards" element={<AllCards />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/collect" element={<Collect />}></Route>
              
              </Routes>
           
    
      </AppContext.Provider>
    </Router>
  );
}

export default App;
