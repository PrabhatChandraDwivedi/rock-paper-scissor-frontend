import React from "react";

export default function WaitingRoom({ roomId }) {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white items-center justify-center">
      <h1 className="text-3xl font-bold mb-28">Room ID: {roomId}</h1>
      <div className="bg-gray-600 rounded-full h-96 w-96 mx-auto z-10 flex items-center justify-center p-8 text-center relative">
        <div className="bg-gray-700 rounded-full h-80 w-80 mx-auto z-10 flex items-center justify-center p-8 text-center text-2xl">
          <h2>Waiting For Someone To Join...</h2>
        </div>
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="10"
            stroke="#fff"
            strokeDasharray="251.2"
            strokeDashoffset="125.6" 
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50" 
              to="0 50 50" 
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
