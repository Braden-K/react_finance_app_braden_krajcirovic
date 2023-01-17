import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import { StockChart } from "../components/stockChart";
import {
  getDocs,
  where,
  collection,
  getDoc,
  doc,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const StockInfo = () => {
  const location = useLocation();
  const stock = location.state.stock;
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    async function getStockInfo() {
      const querySnapshot = query(
        collection(db, "stockInfo"),
        where("symbol", "==", stock.symbol)
      );
      console.log(querySnapshot);

      const stockInfoArray = await getDocs(querySnapshot);
      console.log(stockInfoArray);
      const stockInfoId = stockInfoArray.docs[0].id;
      const stockInfoData = await getDoc(doc(db, "stockInfo", stockInfoId));
      const stockInfo = stockInfoData?.data();
      setStockData(stockInfo);
      console.log(stockInfo);
    }
    getStockInfo();
  }, [stock.symbol]);

  return (
    stockData && (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="card stock-card-main">
              <div className="card-body">
                <h5 className="card-title">{stock.symbol}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {stockData.name}
                </h6>
                <div className="card-text card-price">{stock.price}</div>
                <div className="card-text price-change">
                  {stock.percentChange}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="card stock-card-main">
              <div className="card-body">
                <div className="card-text card-description">
                  {stockData.description?.substring(0, 450) + "..."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="card stock-card-main">
              <div className="card-body">
                <div className="card-text">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">PE Ratio</th>
                        <td>{stockData.pe}</td>
                      </tr>
                      <tr>
                        <th scope="row">Trailing PE</th>
                        <td>{stockData.tpe}</td>
                      </tr>
                      <tr>
                        <th scope="row">Forward PE</th>
                        <td>{stockData.fpe}</td>
                      </tr>
                      <tr>
                        <th scope="row">EPS</th>
                        <td>{stockData.eps}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dividend Yield</th>
                        <td>{Math.round(stockData.dy * 10000) / 100}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <StockChart symbol={stock.symbol} />
          </div>
        </div>
      </div>
    )
  );
};
