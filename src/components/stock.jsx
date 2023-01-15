import { Link } from "react-router-dom";

export const Stock = (props) => {
  return (
    <tr>
      <th scope="row">
        <Link to="/stockinfo" state={{ stock: props.stock }}>
          {props.stock.symbol}
        </Link>
      </th>
      <td>{props.stock.percentChange}</td>
      <td>{Math.round(props.stock.price * 100) / 100}</td>
      <td>{props.stock.volume}</td>
      <td>
        <button
          className="btn btn-light btn-sm"
          onClick={() => props.deleteStock(props.stock.symbol)}
        >
          X
        </button>
      </td>
    </tr>
  );
};
