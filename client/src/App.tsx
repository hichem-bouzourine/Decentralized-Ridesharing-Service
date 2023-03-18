import React from "react";
import Menu from "./Pages/Menu";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Main from "./Components/main/Main";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Menu />} />
      </Routes>
    </div>
  );
}

// <div>
//   <p>gg</p>
//   <Menu />
// </div>
export default App;
