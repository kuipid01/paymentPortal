import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDoc } from "firebase/firestore";
const Dashboard = () => {
    const transactionsCollectionRef  = collection(db, "transactions");
     const [hasUpdatedBalance, setHasUpdatedBalance] = useState(false);
       const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { curUser, filteredCards} = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const transactionsData = await getDocs(transactionsCollectionRef);
    setTransactions(transactionsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const filteredTransactions = transactions?.filter(
    (transaction) => transaction.curUser.id === curUser?.id
  );
  const getUserData = async () => {
    const userRef = doc(db, "users", curUser?.id); // Replace "yourUserId" with the actual user ID
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      console.log('here')
      setUser({ ...userDoc.data(), id: userDoc.id }); // Extract user data from the document and set it to the state
    } else {
      console.error("User not found"); // Handle user not found scenario
    }
  };

  useEffect(() => {
    getUserData(); // Fetch user data on component mount
  }, []);
  console.log(user)
  //  const getTotalAmountSpend = async () => {
  //   const userRef = doc(db, 'users', curUser.id);

  //   if (!hasUpdatedBalance) {
  //     const totalTransactionBalance = filteredTransactions.reduce((accumulator, currentTransaction) => {
  //       const transactionData = JSON.parse(currentTransaction.result).data;
  //       return accumulator + parseInt(transactionData?.amount || 0);
  //     }, 0);

  //     const newBalance = user?.totalBalance - totalTransactionBalance;

  //     // Update Firestore document
  //     await updateDoc(userRef, { totalBalance: newBalance });

  //     // Update curUser in session storage
  //     const updatedCurUser = { ...curUser, totalBalance: newBalance };
  //     sessionStorage.setItem('curUser', JSON.stringify(updatedCurUser));

  //     // Mark that the balance has been updated
  //     setHasUpdatedBalance(true);
  //   }
  // };

  useEffect(() => {
    getTransactions();
  }, []);

  // useEffect(() => {
  //   // Reset hasUpdatedBalance when filteredTransactions changes
  //   setHasUpdatedBalance(false);
  // }, [filteredTransactions]);

  // useEffect(() => {
  //   getTotalAmountSpend();
  // }, [filteredTransactions, curUser]);
  return (
    <div className="w-full overflow-hidden flex flex-col    relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
      <div className="w-full p-5">
        <div className=" flex items-center justify-between w-full">
          <AiOutlineArrowLeft
            onClick={() => navigate(-1)}
            className="text-white text-4xl"
          />
          <img
            src="/master.png"
            className="w-[60px] h-[60px] object-cover"
            alt="master"
          />
        </div>
        <p className="text-gray-400 mt-4 text-2xl">Balance</p>
        <h1 className="text-white text-4xl mt-3 leading-6 tracking-wider">
        # {user?.totalBalance || 'Empty'}
        </h1>
        <hr className="w-full h-[1px] text-gray-600 mt-6 opacity-30 rounded-full" />
        <div className="flex justify-between items-center">
          <p className="text-gray-400 mt-4 text-2xl"> {curUser?.name  } {curUser?.surname} </p>
          <p className="text-gray-600 mt-4 text-sm">Current Account</p>
        </div>
      </div>
      <div className="mt-5  flex-1 justify-between overflow-hidden  p-5 flex flex-col w-full gap-4 rounded-tl-[40px] rounded-tr-[40px] bg-gray-400">
        <div className="w-full flex gap-5 px-5">
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/make">
            <div className="rounded-2xl flex-1  cursor-pointer font-extrabold transition-all hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300  text-lg text-black flex justify-center items-center h-[80px] bg-[#ffff] shadow relative">
              Pay
            </div>
          </Link>
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/collect">
            <div className="rounded-2xl flex-1 cursor-pointer font-extrabold transition-all  hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 text-lg text-black flex justify-center items-center h-[80px] bg-[#ffff] shadow relative">
              Receive
            </div>
          </Link>
        </div>
        <div className="w-full flex gap-5 px-5">
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/make">
            <div className="rounded-2xl flex-1  cursor-pointer font-extrabold transition-all hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300  text-lg text-black flex justify-center items-center h-[80px] bg-[#ffff] shadow relative">
             Buy Airtime
            </div>
          </Link>
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/collect">
            <div className="rounded-2xl flex-1 cursor-pointer font-extrabold transition-all  hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 text-lg text-black flex justify-center items-center h-[80px] bg-[#ffff] shadow relative">
              Buy Data
            </div>
          </Link>
        </div>
        <hr className="bg-gray-400 opacity-50 " />
        <h1 className="font-bold text-xl text-white">Transactions</h1>
        {
          filteredTransactions?.map(item =>  <div key={item.id} className="flex w-full flex-col gap-3">
          <div className="text-gray-500 rounded-[20px] px-[30px] py-3 bg-white">
            <h1 className="text-lg font-bold">{JSON.parse(item.result).data?.recipient}</h1>
            <p className="text-blue-500 font-bold">#{JSON.parse(item.result).data?.amount}</p>
          </div>
        </div> )
        }
       
        <div className="flex items-center gap-3 mt-[60px] rounded-[20px] p-3 bg-gray-500">
          <img
            className="w-[60px] h-[60px] object-cover"
            src="https://e7.pngegg.com/pngimages/18/942/png-clipart-spotify-computer-icons-music-transparency-logo-spotify-logo-grass.png"
            alt=""
          />
          <div>
            <h1>Spotify</h1>
            <p>1 Month Subscribtion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
