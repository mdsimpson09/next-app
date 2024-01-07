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
        console.log(data.message);

     // Handle response
        if (response.ok) {
          // Handle success (e.g., update UI or perform other actions)
          console.log('the like button is working like-button.tsx');
          router.push('/meet')
       

            
          
        } else {
            const errorData = await response.json();
          console.error('like request failed', errorData.message);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
      }
    };
  
    return (
      <div>
      
      <IconButton className="font-bold text-3xl rounded-full bg-green-500 w-24 h-24 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg" onClick={handleLike} >
          <HeartIcon className="text-5xl" />
        </IconButton>
       
      </div>
    );
  };
  
  export default LikeButton;