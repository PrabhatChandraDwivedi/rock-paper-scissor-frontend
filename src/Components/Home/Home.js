import React, { useState } from "react";
import { Button, Input, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket/Socket";
import "./Home.css";

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
        navigate("/game-room", { state: { hasUserJoined: false, roomId: roomName } });
      } else {
        alert("Failed to create Room");
      }
    });
  };

  const joinRoom = () => {
    let roomName = inputBoxValue;
    socket.emit("join-room", roomName, (success) => {
      if (success) {
        navigate("/game-room", { state: { hasUserJoined: true, roomId: roomName } });
      } else {
        alert("Failed to join the room");
      }
    });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center w-full bg-gradient-to-br from-purple-900 to-blue-900 text-white text-center relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      <div className="floating-shape shape-4"></div>

      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, textAlign: "center", maxWidth: 500, width: "80%" }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 4, fontSize: "2.5rem", color: "#868686" }}>
          Battle of Elements: Rock, Paper, Scissors
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button
            variant="contained"
            onClick={createRoom}
            sx={{
              backgroundColor: "#6B46C1",
              color: "#FFFFFF",
              fontWeight: "bold",
              padding: "10px 24px",
              fontSize: "1.2rem",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#7C3AED" },
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Create
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ color: "#B0B0B0" }}>
          Join a Room
        </Typography>
        <Input
          value={inputBoxValue}
          onChange={handleInputBoxChange}
          placeholder="Enter Room Name"
          sx={{
            width: "80%",
            maxWidth: "300px",
            mb: 3,
            backgroundColor: "#333366",
            color: "#FFFFFF",
            padding: "8px 12px",
            borderRadius: "8px",
            input: { color: "#FFFFFF" },
            "&::placeholder": { color: "#AAA" },
          }}
        />
        <Button
          variant="contained"
          onClick={joinRoom}
          sx={{
            backgroundColor: "#6B46C1",
            color: "#FFFFFF",
            fontWeight: "bold",
            padding: "8px 24px",
            fontSize: "1.1rem",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#7C3AED" },
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease"
          }}
          style={{marginLeft:"20px"}}
        >
          Join
        </Button>
      </Paper>
    </div>
  );
}
