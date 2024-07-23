import React, { useState, useEffect } from 'react';
import cat from "../../../Assets/Images/smart-cat.jpg";
import fox from "../../../Assets/Images/smart-fox.jpeg";
import { socket } from "../../Socket/Socket";

export default function GamePageComponent({ roomId }) {
  // State variables to track player wins, notifications, chat visibility, current message, and chat messages
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Function to handle player's choice and emit it to the server
  const handlePlayerChoice = (choice) => {
    socket.emit('player-choice', { roomName: roomId, choice });
  };

  // Function to toggle chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Function to send a chat message
  const sendMessage = () => {
    const newMessage = { sender: 'You', text: message };
    setChatMessages([...chatMessages, newMessage]);
    socket.emit('room-chat', { roomName: roomId, message: newMessage });
    setMessage('');
  };

  // useEffect hook to listen for game results and chat messages from the server
  useEffect(() => {
    socket.on("game-result", (result) => {
      if (result === "Player 1 wins!") {
        setPlayer1Wins((prevCount) => prevCount + 1);
        setNotification("Player 1 wins!");
      } else if (result === "Player 2 wins!") {
        setPlayer2Wins((prevCount) => prevCount + 1);
        setNotification("Player 2 wins!");
      } else if (result === "It's a tie!") {
        setPlayer1Wins((prevCount) => prevCount + 0.5);
        setPlayer2Wins((prevCount) => prevCount + 0.5);
        setNotification("It's a tie!");
      }

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    });

    socket.on("room-chat", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("game-result");
      socket.off("room-chat");
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Rock, Paper, Scissors Battle</h1>
        <div className="flex flex-col lg:flex-row justify-around w-full lg:w-4/5 mb-16 lg:h-[40vh] h-full">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-900 p-4 text-center w-full lg:w-48 mb-8 lg:mb-0 text-xl">
              Points: {player1Wins}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 shadow-md text-center w-full lg:w-48 lg:h-80 mb-8 lg:mb-0" style={{ boxShadow: '0px 5px 15px rgba(255,255,255, 0.35)' }}>
              <h2 className="text-xl font-bold mb-4">Player 1</h2>
              <div className="bg-gray-700 rounded-full h-32 w-32 mx-auto">
                <img src={fox} alt="Smart Fox" className='rounded-full pointer-events-none' />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-900 p-4 text-center w-full lg:w-48 mb-8 lg:mb-0 text-xl">
              Points: {player2Wins}
            </div>
            <div className="bg-gray-800 rounded-lg p-8 shadow-md text-center w-full lg:h-80 lg:w-48 mb-8 lg:mb-0" style={{ boxShadow: '0px 5px 15px rgba(255,255,255, 0.35)' }}>
              <h2 className="text-xl font-bold mb-4">Player 2</h2>
              <div className="bg-gray-700 rounded-full h-32 w-32 mx-auto">
                <img src={cat} alt="Smart Cat" className='rounded-full pointer-events-none' />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-1" onClick={() => handlePlayerChoice('rock')} aria-label="Rock">Rock</button>
          <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg mx-1" onClick={() => handlePlayerChoice('paper')} aria-label="Paper">Paper</button>
          <button className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg mx-1" onClick={() => handlePlayerChoice('scissors')} aria-label="Scissors">Scissors</button>
        </div>
      </div>
      {notification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-center transition-opacity duration-500">
          {notification}
        </div>
      )}
      {showChat && (
        <div className="absolute bottom-12 right-0 m-4 bg-gray-800 text-white p-4 rounded-lg shadow-md">
          <div className="flex justify-end">
            <button className="text-white bg-orange-700 p-1 rounded-md" onClick={toggleChat}>Close</button>
          </div>
          <div className="flex flex-col mt-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>{msg.sender}: {msg.text}</div>
            ))}
          </div>
          <div className="flex mt-4">
            <input type="text" className="bg-gray-700 text-white p-2 rounded-l-md flex-1 focus:outline-none" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="bg-blue-700 text-white px-4 rounded-r-md" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="fixed bottom-0 right-0 m-4 bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={toggleChat}>Chat</button>
    </div>
  );
}
