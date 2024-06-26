import React, { useEffect, useState } from 'react'
import WaitingRoom from '../WaitingPage/WaitingRoom'
import { socket } from '../../Socket/Socket';
import { useLocation } from 'react-router-dom';
import GamePageComponent from './GamePageComponent';

export default function GamePage() {
const [userJoined,setUserJoined] = useState(false);
const { state } = useLocation();
  const { hasUserJoined,roomId } = state;

  useEffect(() => {
    socket.on('start-game', (friendSocketId, mySocketId) => {
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


  return (
    <div>
      {userJoined && <GamePageComponent roomId={roomId}/>}
      {!userJoined && <WaitingRoom roomId={roomId}/>}
    </div>
  )
}
