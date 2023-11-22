import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import { AppContext } from "./contexts/AppContext";

import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Home from "./components/Home";
import Login from "./pages/Login/Login";
import CardDetail from "./components/CardDetail";
import Update from "./components/Update";
import Users from "./components/Users";
import Account from "./components/Account";
import Header from "./components/Header";
import Register from "./components/Register";
import Create from "./components/Create";
import AllCards from "./components/AllCards";
import Collect from "./pages/CollectPayment/Collect";
import Payment from "./pages/PaymentPage/Payment";
import Dashboard from "./pages/Dashboard";
import ThreeDotsWave from "./components/DotsLoading";
import PaymentConfirmation from "./components/PaymentConfirmation/PaymentConfirmation";

function App() {
  const usersCollectionRef = collection(db, "users");
  const cardsCollectionRef = collection(db, "cards");
  const [curUser, setCurUser] = useState(
    JSON.parse(sessionStorage.getItem("curUser"))
  );
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const getUsers = async () => {
    const usersData = await getDocs(usersCollectionRef);
    setUsers(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getCards = async () => {
    const cardsData = await getDocs(cardsCollectionRef);
    // const filteredCards =  cardsData.filter((card) => card.cardHolderId === curUser?.id);
    setCards(cardsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const userCards = async () => {
    const filteredCards = await cards.filter(
      (card) => card.cardHolderId === curUser?.id
    );
    setFilteredCards(filteredCards);
  };

  const updateUser = async () => {
    const userRef = doc(db, 'users', curUser.id);
       const totalBalance = filteredCards.reduce((accumulator, currentCard) => {
      return accumulator + parseInt(currentCard.balance);
    }, 0);
    await updateDoc(userRef, {totalBalance});
  };
  

  useEffect(() => {
    getUsers();
    getCards();

    setLoading(false);
  }, []);

  useEffect(() => {
    userCards();
  }, [cards]);
  useEffect(() => {
    updateUser();
  }, [filteredCards]);
  console.log(curUser, cards, filteredCards);

  return (
    <Router>
      <AppContext.Provider
        value={{
          filteredCards,
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
        }}>
        {/* Added loading state conditional rendering */}
        {loading ? (
          <ThreeDotsWave />
        ) : (
          <>
            {/* <Header /> */}

            <Routes>
              <Route path="/cards" element={<Home />}></Route>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/card/:id" element={<CardDetail />}></Route>
              <Route path="/create" element={<Create />}></Route>
              <Route path="/update/:id" element={<Update />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/cards" element={<AllCards />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/collect" element={<Collect />}></Route>
              <Route path="/make" element={<Payment />}></Route>
              <Route path="/confirmPage" element={<PaymentConfirmation />}></Route>
            </Routes>
          </>
        )}
      </AppContext.Provider>
    </Router>
  );
}

export default App;
