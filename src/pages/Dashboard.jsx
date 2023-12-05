import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { ActionsContext } from "../contexts/context";
import { AppContext } from "../contexts/AppContext";
import { db } from "../../firebase";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { useCallback } from "react";
import Scanner from "../components/Scanner";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const { actions, setActions } = useContext(ActionsContext);
  const [nfcError, setNfcError] = useState("Scanning");
  const transactionsCollectionRef = collection(db, "transactions");
  const [scanPage, setScanPage] = useState(false);
  const navigate = useNavigate();
  const { curUser, user } = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const transactionsData = await getDocs(transactionsCollectionRef);
      setTransactions(
        transactionsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const filteredTransactions = transactions?.filter(
    (transaction) => transaction.curUser.id === curUser?.id
  );

  const handleNFCScan = async () => {
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();

      console.log("Scan started successfully.");
      ndef.onreadingerror = () => {
        console.log("Cannot read data from the NFC tag. Try another one?");
      };

      ndef.onreading = (event) => {
        console.log("NDEF message read.");
        onReading(event);
        setActions({
          scan: "scanned",
          write: null,
        });
      };
    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    }
  };

  const scan = useCallback(async () => {
    if ("NDEFReader" in window) {
      handleNFCScan();
    } else {
      setNfcError("NFC reader not available on this device");
    }
  }, [setActions]);

  const onReading = ({ message, serialNumber }) => {
    setSerialNumber(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          setMessage(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  const setScanning = () => {
    setScanPage(true);
    scan();
    setActions({ ...actions, scan: "scanning" });
  };

  useEffect(() => {
    scan();
  }, [scan]);

  return (
    <div className="w-full overflow-hidden flex flex-col    relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
      {scanPage && (
        <>
          <div className="w-full z-[999] h-screen fixed blur-[2px] bg-white  top-0 left-0"></div>
          <AiOutlineClose
            onClick={() => setScanPage(false)}
            className="text-3xl cursor-pointer z-[99999] top-[30px] left-[20px] font-bold text-red-600 absolute"
          />
          <div className="w-[70%]  flex flex-col justify-center items-center z-[9999] h-[40%] absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              className="w-full h-[50%] object-cover"
              src="/spinner.gif"
              alt=""
            />
            <h1 className="font-bold text-xl text-center w-full">
              Place Phone Near <b> NFC TAG</b>{" "}
            </h1>
            <p className="text-md capitalize">{nfcError}</p>
          </div>
          {actions.scan === "scanned" ? (
            <div>
              <p>Serial Number: {serialNumber}</p>
              <p>Message: {message}</p>
            </div>
          ) : (
            <Scanner status={actions.scan}></Scanner>
          )}
        </>
      )}

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
          # {user?.totalBalance || "Empty"}
        </h1>
        <hr className="w-full h-[1px] text-gray-600 mt-6 opacity-30 rounded-full" />
        <div className="flex justify-between items-center">
          <p className="text-gray-400 mt-4 text-2xl">
            {" "}
            {curUser?.name} {curUser?.surname}{" "}
          </p>
          <p className="text-gray-600 mt-4 text-sm">Current Account</p>
        </div>
      </div>
      <div className="mt-5  z-0 flex-1 justify-between overflow-hidden  p-5 flex flex-col w-full gap-4 rounded-tl-[40px] rounded-tr-[40px] bg-[#264653]">
        <div className="w-full flex gap-5 px-5">
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/make"
          >
            <div className="rounded-2xl transform hover:scale-[0.97] flex-1   cursor-pointer font-extrabold transition-all bg-blue-500/100  focus:outline-none focus:ring focus:border-blue-300  text-lg text-white flex justify-center items-center h-[80px]  shadow relative">
              Pay
            </div>
          </Link>
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/collect"
          >
            <div className="rounded-2xl transform hover:scale-[0.97] flex-1 cursor-pointer font-extrabold transition-all bg-blue-500/100  focus:outline-none focus:ring focus:border-blue-300 text-lg text-white flex justify-center items-center h-[80px]  shadow relative">
              Receive
            </div>
          </Link>
        </div>
        <div className="w-full flex gap-5 px-5">
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/transfer"
          >
            <div className="rounded-2xl transform hover:scale-[0.97] flex-1   cursor-pointer font-extrabold transition-all bg-blue-500/100  focus:outline-none focus:ring focus:border-blue-300  text-lg text-white flex justify-center items-center h-[80px]  shadow relative">
              Bank Transfer
            </div>
          </Link>
          <Link
            className="flex-1 flex justify-center items-center text-white   mt-2"
            to="/flutter"
          >
            <div className="rounded-2xl transform hover:scale-[0.97] flex-1   cursor-pointer font-extrabold transition-all bg-blue-500/100  focus:outline-none focus:ring focus:border-blue-300  text-lg text-white flex justify-center items-center h-[80px]  shadow relative">
             USSD
            </div>
          </Link>
        </div>

        <div
          onClick={setScanning}
          className="flex relative mx-auto hover:scale-95 transition-all cursor-pointer w-[95%] h-[200px] overflow-hidden rounded-[20px]"
        >
          <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#264653c4] ">
            <h1 className="text-2xl font-bold  text-white">Air Tag</h1>
          </div>
          <img src="/nfc1.jpg" className="w-full h-full object-cover " alt="" />
        </div>
        <Link to='/otherPayment' className="w-full p-3 flex items-center justify-center rounded-[20px] bg-blue-500/100 text-white font-bold">
          Other Payment Options
        </Link>
        <hr className="bg-gray-400 opacity-50 " />
        <h1 className="font-bold text-xl text-white">Transactions</h1>
        {filteredTransactions?.map((item) => (
          <div key={item.id} className="flex w-full flex-col gap-3">
            <div className="text-gray-500 rounded-[20px] px-[30px] py-3 bg-white">
              <h1 className="text-lg font-bold">
                {JSON.parse(item.result).data?.recipient || "empty"}
              </h1>
              <p className="text-blue-500 font-bold">
                #{JSON.parse(item.result).data?.amount || "empty"}
              </p>
            </div>
          </div>
        ))}

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
