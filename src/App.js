import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./main";
import { Navbar } from "./components/navbar";
import { StockInfo } from "./pages/stockinfo";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/stockinfo" element={<StockInfo />} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
