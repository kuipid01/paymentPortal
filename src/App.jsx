
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
// import Login from './pages/Login';
import CardDetail from './components/CardDetail';
import Create from './components/Create';
import Update from './components/Update';
import NotFound from './components/NotFound';
import { AppContext } from './contexts/AppContext';
import Register from './components/Register';
import Footer from './components/Footer';

 import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Users from './components/Users';
import AllCards from './components/AllCards';
import Account from './components/Account';
import Login from './pages/Login/Login';

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
        <Header />
     
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
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
           
        <Footer />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
