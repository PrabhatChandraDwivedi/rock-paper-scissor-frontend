import React, { useState } from "react";
import { Button, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket/Socket";

export default function Home() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [inputBoxValue, setInputBoxValue] = useState("");

  const handleInputBoxChange = (e) => {
    setInputBoxValue(e.target.value);
  };

  const createRoom = () => {
    let roomName = btoa(Math.random())
      .toUpperCase()
      .replace(/=/g, "")
      .substring(10, 19);
    setRoomName(roomName);
    socket.emit("create-room", roomName, (success) => {
      if (success) {
        navigate("/game-room", { state: { hasUserJoined: false, roomId:roomName } });
      } else {
        alert("Failed to create Room");
      }
    });
  };

  const joinRoom = () => {
    let roomName = inputBoxValue;
    socket.emit("join-room", roomName, (success) => {
      if (success) {
        navigate("/game-room", { state: { hasUserJoined: true, roomId:roomName } });
      } else {
        alert("Failed to join the room");
      }
    });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center w-full bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-center">
      <Typography variant="h3" gutterBottom sx={{ mb: 8 }}>
        Battle of Elements: Rock, Paper, Scissors
      </Typography>
      <div className="h-1/3 flex justify-center items-center w-full">
        <Button variant="contained" sx={{ backgroundColor: "#6B46C1", mr: 2 }} onClick={createRoom}>
          Create
        </Button>
      </div>
      <div className="h-1/3 flex flex-col justify-center items-center w-full">
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Join a Room
        </Typography>
        <Input
          value={inputBoxValue}
          onChange={handleInputBoxChange}
          placeholder="Enter Room Name"
          sx={{ width: "200px", mb: 2 }}
        />
        <Button variant="contained" sx={{ backgroundColor: "#6B46C1" }} onClick={joinRoom}>
          Join
        </Button>
      </div>
    </div>
  );
}