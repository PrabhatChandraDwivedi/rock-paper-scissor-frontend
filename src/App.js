import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import io from 'socket.io-client';
function App() {
  // const [roomName,setRoomName] = useState("");
  const socket = io('http://localhost:5000')
  const createRoom =()=>{
    let roomName = (btoa(Math.random()).toUpperCase().replace(/=/g, '').substring(10,19));
    // setRoomName(roomName);
    localStorage.setItem("roomName",roomName);
    console.log(roomName)
    socket.emit('create-room',roomName);
  }
  
  const joinRoom = ()=>{
    console.log("hello")
    let roomName = localStorage.getItem("roomName");
    socket.emit('join-room',roomName);
  }

//   useEffect(() => {
//     axios.get("http://localhost:5000/",{ mode: 'no-cors'}).then((response) => {
//       console.log(response)
//   })
// },[])
  
  return (
 <div>
  <button onClick={createRoom}>Create</button>
  <input></input>
  <button onClick={joinRoom}>Join</button>
 </div>
  );
}

export default App;