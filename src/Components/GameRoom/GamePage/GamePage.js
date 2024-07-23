import React, { useEffect, useState } from 'react'
import WaitingRoom from '../WaitingRoom/WaitingRoom.js'
import  io  from 'socket.io-client';
import { socket } from '../../Socket/Socket';
import { useLocation } from 'react-router-dom';
import GamePageComponent from './GamePageComponent';

export default function GamePage() {
const [userJoined,setUserJoined] = useState(false);
const { state } = useLocation();
  const { hasUserJoined,roomId } = state;

  useEffect(() => {
    console.log("ubchcb")
    socket.on('start-game', (friendSocketId, mySocketId) => {
      // Check if this event is for the current user
      console.log("Hello1234")
      console.log(mySocketId);
      console.log(socket.id);
      if (socket.id === mySocketId && !userJoined) {
        setUserJoined(true);
        console.log('Your friend has joined the room. You can start the game now.');
      }
    });
    if (hasUserJoined) {
      setUserJoined(true);
    }
    return () => {
      socket.disconnect();
    };
  }, []);
console.log(hasUserJoined);
  return (
    <div>
      {userJoined && <GamePageComponent roomId={roomId}/>}
      {!userJoined && <WaitingRoom roomId={roomId}/>}
    </div>
  )
}