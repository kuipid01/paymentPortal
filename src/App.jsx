import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import { AppContext } from "./contexts/AppContext";

import { db } from "../firebase";
import { collection, doc, getDocs,getDoc, updateDoc,where } from "firebase/firestore";
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
import ProtectedRoute from "./components/ProtectedRoutes";
import { Navigate } from "react-router-dom";
function App() {
  const usersCollectionRef = collection(db, "users");
  const cardsCollectionRef = collection(db, "cards");
  const [curUser, setCurUser] = useState(JSON.parse(sessionStorage.getItem("curUser")))
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const usersData = await getDocs(usersCollectionRef);
    setUsers(usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getCards = async () => {
    const cardsData = await getDocs(cardsCollectionRef);
    setCards(cardsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const userCards = async () => {
    const filteredCards = await cards.filter(
      (card) => card.cardHolderId === curUser?.id
    );
    setFilteredCards(filteredCards);
  };

  const getUserData = async () => {
    try {
      const userRef = doc(db, "users", curUser?.id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log({ ...userDoc.data(), id: userDoc.id });
        setUser({ ...userDoc.data(), id: userDoc.id });
        // updateUser(); // Call updateUser here to ensure it uses the correct totalBalance
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const updateUser = async () => {
  //   try {
  //     const userRef = doc(db, 'users', curUser.id);
      
  //     // Fetch user cards directly from the database
  //     const userCardsData = await getDocs(collection(db, "cards", where("cardHolderId", "==", curUser.id)));
      
  //     // Calculate totalBalance based on the fetched user cards
  //     const totalBalance = userCardsData.docs.reduce((accumulator, currentCard) => {
  //       return accumulator + parseInt(currentCard.data().balance);
  //     }, 0);
  
  //     await updateDoc(userRef, { totalBalance });
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };
  

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      await getCards();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (curUser && curUser.id) {
      userCards();
    }
  }, [cards]);

  useEffect(() => {
    if (curUser && curUser.id) {
      getUserData();
    }
  }, [curUser]);

  // useEffect(() => {
  //   if (curUser && curUser.id) {
  //     updateUser();
  //   }
  // }, [filteredCards]);

  console.log(user);

  return (
    <Router>
      <AppContext.Provider
        value={{
          filteredCards,
          curUser,
          setCurUser,
          user,
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
               <Route path="/"   element={!!curUser ? <Dashboard /> : <Navigate to="/login" />}></Route> 
               <Route path="/make"   element={!!curUser ? <Payment /> : <Navigate to="/login" />}></Route> 
               <Route path="/collect"   element={!!curUser ? <Collect /> : <Navigate to="/login" />}></Route> 
               <Route path="/update/:id"   element={!!curUser ? <Update /> : <Navigate to="/login" />}></Route> 
              
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/card/:id" element={<CardDetail />}></Route>
              <Route path="/create" element={<Create />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/cards" element={<AllCards />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/confirmPage" element={<PaymentConfirmation />}></Route>
            </Routes>
          </>
        )}
      </AppContext.Provider>
    </Router>
  );
}

export default App;
