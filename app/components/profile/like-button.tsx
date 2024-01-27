//app/components/profile/like-button.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import HateIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import TinderCard from'react-tinder-card'
import { HeartIcon } from 'lucide-react';



interface LikeButtonProps {
    playerIdTolike: number | null;
  }
const LikeButton: React.FC<LikeButtonProps> = ({ playerIdTolike }) => {
  const router = useRouter();

  const handleLike = async () => {

    if (!playerIdTolike) {
      console.error('No player selected to like');
      return;
    }

    try {
      // Send the dislike request with the player ID to dislike
      const response = await fetch('/api/liked',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          liked_player_id: playerIdTolike
        }),
      });
      const data = await response.json();
      console.log('Like successful:', data.message);

      const matchResponse = await fetch('/api/findmatches', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
  
      });
      if (!matchResponse.ok) {
        throw new Error(`HTTP error! status: ${matchResponse.status}`);
      }
      console.log('Match check complete');
      router.push('/meet');
    } catch (error) {
      console.error('Error processing like:', error);
    }
  };

  
    return (
      <div>
      
      <IconButton  onClick={handleLike} >
          <HeartIcon className= 'text-stone-50 flex justify-center' />
        </IconButton>
       
      </div>
    );
  };
  
  export default LikeButton;