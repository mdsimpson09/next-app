'use client';
import React, { useEffect, useState } from 'react';
import DislikeButton from './dislike-button';
import LikeButton from './like-button';
import Link from 'next/link';
import { useSession } from 'next-auth/react'

import HeartIcon from '@mui/icons-material/FavoriteOutlined';
import HateIcon from '@mui/icons-material/CloseOutlined';
import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import RedoIcon from '@mui/icons-material/ReplayOutlined';
import { Icon, IconButton } from '@mui/material';

interface MeetProps {
  player: {
    player_id: number | null;
    first_name: string | null;
    username: string | null;
    bio: string | null;
    looking_for: string | null;
    image: string | null;
  } | null;
  toggleRefresh: () => void;
}

const Meet: React.FC<MeetProps> = ({ player, toggleRefresh }) => {

  if (!player) {
    return null;
  }

  return (
    
    <div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl min-w-7 w-[475px] h-[650px]'>
      <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8 w-[500px] h-[550px] overflow-y-auto hide-scrollbar'>
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
      <br></br>
    </div>
  );
};

export default Meet;