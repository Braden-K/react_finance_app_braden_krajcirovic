import { useState } from "react";

export const Search = (props) => {
  const [ticker, setTicker] = useState("");

  return (
    <div className="d-flex justify-content-center">
      <form>
        <div className="input-group m-2">
          <input
            type="text"
            className="form-control"
            onChange={(event) => setTicker(event.target.value)}
            placeholder="Ticker Symbol"
          />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => props.addStockToWatchList(ticker)}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
