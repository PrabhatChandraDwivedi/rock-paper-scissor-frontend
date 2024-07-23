import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./Components/GameRoom/GamePage/GamePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/game-room" exact element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;