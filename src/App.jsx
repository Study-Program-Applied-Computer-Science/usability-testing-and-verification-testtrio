import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Calender from "./components/Calender/Calender.jsx";
import UserLogin from "./components/UserLogin/UserLogin.jsx";

const App = () => {
  return (
    <div data-testid="App" className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/Calender" element={<Calender />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        {/* Wildcard route */}
        <Route path="*" element={<h4 className="error">Route Not Found</h4>} />
      </Routes>
    </div>
  );
};

export default App;
