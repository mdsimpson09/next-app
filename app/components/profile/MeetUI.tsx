'use client';
import React, { useEffect, useState } from 'react';
import DislikeButton from './dislike-button';


interface MeetProps {
  player: {
    player_id: number | null;
    first_name: string | null;
    username: string | null;
    bio: string | null;
    looking_for: string | null;
    image: string | null;
  } | null;
}

const Meet: React.FC<MeetProps> = ({ player }) => {
  if (!player) {
    return null;
  }

  return (
    
    <div>
      <div className="max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8">
        <img
          src={player.image || "/profile-image.jpg"}
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 capitalize">
          {player.first_name || ""}
        </h1>
        <p className="text-gray-500 mb-4">{player.username || ""}</p>
        <p className="text-gray-700 font-bold capitalize"> about me: </p>
        <p>{player.bio || ""}</p>
        <br />
        <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
        <p className="text-gray-700">{player.looking_for || ""}</p>
      </div>
    </div>
  );
};

export default Meet;