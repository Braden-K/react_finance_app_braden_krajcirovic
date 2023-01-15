import { useEffect, useState } from "react";
import "./App.css";
import { Stock } from "./components/stock";
import { Search } from "./components/search";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
  getDocsFromServer,
} from "firebase/firestore";
import { db } from "./config/firebase";
import { useCallback } from "react";
import { UserAuth } from "./context/AuthContext";

export const Main = () => {
  const [stockList, setStockList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = UserAuth();

  const getStocks = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "stocks"));
    var userStocks = [];

    querySnapshot.forEach((doc) => {
      if (user && doc.data().userId === user.uid) {
        userStocks = [...userStocks, doc.data()];
      }
    });

    console.log(userStocks);
    setStockList(userStocks);
  }, [user]);

  useEffect(() => {
    getStocks();
  }, [getStocks]);

  const addStockToWatchList = async (ticker) => {
    if (stockList.find((stock) => stock.symbol === ticker) === undefined) {
      const API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=6C6RIK0G4YRIAOB9`;
      fetch(API_Call)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);

          if (JSON.stringify(data["Global Quote"]) !== "{}") {
            await addDoc(collection(db, "stocks"), {
              symbol: data["Global Quote"]["01. symbol"],
              price: data["Global Quote"]["08. previous close"],
              percentChange: data["Global Quote"]["10. change percent"],
              volume: data["Global Quote"]["06. volume"],
              userId: user?.uid,
            });
          } else {
            alert("Invalid Ticker");
          }
        });
      getStocks();
      setShowSearch(false);
    } else {
      alert("Stock already on watchlist");
    }
  };

  const deleteStock = async (ticker) => {
    setStockList(
      stockList.filter((stock) => {
        return stock.symbol !== ticker;
      })
    );

    const stockToDelteQuery = query(
      collection(db, "stocks"),
      where("symbol", "==", ticker),
      where("userId", "==", user.uid)
    );

    const stockToDeleteData = await getDocsFromServer(stockToDelteQuery);
    const stockId = stockToDeleteData.docs[0].id;
    const stockToDelete = doc(db, "stocks", stockId);
    await deleteDoc(stockToDelete);
  };

  return user ? (
    <div className="container">
      {showSearch ? (
        <Search
          setShowSearch={setShowSearch}
          addStockToWatchList={addStockToWatchList}
        />
      ) : (
        <button
          className="btn btn-outline-dark btn-sm border-light"
          onClick={() => setShowSearch(true)}
        >
          Add To Watchlist +
        </button>
      )}
      <div className="container shadow p-3 mb-5 bg-white rounded">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Ticker</th>
              <th scope="col">Today's Change</th>
              <th scope="col">Price</th>
              <th scope="col">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((stock, key) => {
              return (
                <Stock stock={stock} deleteStock={deleteStock} key={key} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div class="container pt-5">
      <div class="row d-flex align-items-center">
        <div class="col-12 text-center">
          <h1 class="display-4 text-dark">Stock Tracker</h1>
        </div>
      </div>
      <div class="row d-flex align-items-center">
        <div class="col-12 text-center">
          <p class="lead text-secondary">
            Sign in to add stocks to your watchlist
          </p>
        </div>
      </div>
      <div class="row d-flex justify-content-center"></div>
    </div>
  );
};

export default Main;
