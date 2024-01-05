'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import HeartIcon from '@mui/icons-material/FavoriteOutlined';
import HateIcon from '@mui/icons-material/CloseOutlined';
import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import RedoIcon from '@mui/icons-material/ReplayOutlined';
import { Icon, IconButton } from '@mui/material';
import TinderCard from'react-tinder-card'
import DislikeButton from './dislike-button';
import LikeButton from './like-button';

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
const Footer: React.FC<MeetProps> = ({ player }) => {
  if (!player) {
    return null;
  }
  return (
    <div>
      <TinderCard className=" flex items-center justify-between space-x-4">
        {/* <DislikeButton playerIdToDislike={player?.player_id} /> */}

        <DislikeButton playerIdToDislike={player ? player.player_id : null} />

        <IconButton className="font-bold text-3xl rounded-full bg-blue-400 w-16 h-16 text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg">
          <RedoIcon />
        </IconButton>

        <IconButton className="font-bold text-3xl rounded-full bg-blue-400 w-16 h-16 text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg">
          <ExitIcon />
        </IconButton>

     <LikeButton playerIdTolike={player ? player.player_id : null} />
      </TinderCard>
    </div>
  );
}



export default Footer;