import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { signIn, logout, user } = UserAuth();
  const navigate = useNavigate();

  const signInAndDirect = () => {
    signIn();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Stock Tracker
        </Link>
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <Link className="nav-link" onClick={() => logout()}>
                Log Out
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" onClick={() => signInAndDirect()}>
                Sign In
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
