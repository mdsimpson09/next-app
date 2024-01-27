'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

import HateIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import TinderCard from'react-tinder-card'


interface DislikeButtonProps {
    playerIdToDislike: number | null;
  }

  const DislikeButton: React.FC<DislikeButtonProps> = ({ playerIdToDislike}) => {

   

    const handleDislike = async () => {

      if (!playerIdToDislike) {
        console.error('No player selected to dislike');
        return;
      }
  
      try {
        // Send the dislike request with the player ID to dislike
        const response = await fetch('/api/disliked', 
        {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            disliked_player_id: playerIdToDislike
          }),
        });

        const data = await response.json();
        // console.log(data.message);

     // Handle response
        if (response.ok) {
          // Handle success (e.g., update UI or perform other actions)
          console.log('the button is working dislike-button.tsx');

         
        } else {
            const errorData = await response.json();
          console.error('Dislike request failed', errorData.message);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
      }
    };
 
    return (
      <div >
      
          <IconButton  
            onClick={handleDislike} >
            <HateIcon className= 'text-stone-50 flex justify-center' />
          </IconButton>
       
      </div>
    );
  };
  
  export default DislikeButton;
