import React from "react";
import Menu from "./Pages/Menu";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Main from "./Components/main/Main";
import Login from "./Pages/Login";
import SignupForm from "./Components/signupForm/SignupForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

// <div>
//   <p>gg</p>
//   <Menu />
// </div>
export default App;
