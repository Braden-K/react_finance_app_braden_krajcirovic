import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import { StockChart } from "../components/stockChart";

export const StockInfo = () => {
  const location = useLocation();
  const stock = location.state.stock;
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    function getStockInfo() {
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock.symbol}&apikey=6C6RIK0G4YRIAOB9`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStockData(data);
        });
    }
    getStockInfo();
    console.log(stock.symbol);
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
                  {stockData.Name}
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
                  {stockData.Description?.substring(0, 450) + "..."}
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
                        <td>{stockData.PERatio}</td>
                      </tr>
                      <tr>
                        <th scope="row">Trailing PE</th>
                        <td>{stockData.TrailingPE}</td>
                      </tr>
                      <tr>
                        <th scope="row">Forward PE</th>
                        <td>{stockData.ForwardPE}</td>
                      </tr>
                      <tr>
                        <th scope="row">EPS</th>
                        <td>{stockData.EPS}</td>
                      </tr>
                      <tr>
                        <th scope="row">Dividend Yield</th>
                        <td>
                          {Math.round(stockData.DividendYield * 10000) / 100}%
                        </td>
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
