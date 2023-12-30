'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import HateIcon from '@mui/icons-material/CloseOutlined';
import { Icon, IconButton } from '@mui/material';
import TinderCard from'react-tinder-card'


const DislikeButton = ({ playerIdToDislike }) => {
    const router = useRouter();
  
    // Handle the dislike action
    const handleDislike = async () => {
      if (!playerIdToDislike) {
        // No player to dislike selected
        console.error('No player selected to dislike');
        return;
      }
  
      try {
        // Send the dislike request with the player ID to dislike
        const response = await fetch('/api/disliked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            player_id: null, // Remove authentication check
            disliked_player_id: playerIdToDislike, // Player to dislike
          }),
        });
  
        if (response.ok) {
          // Handle success (e.g., update UI or perform other actions)
          console.log('Disliked successfully');
  
          // Load a new random player by navigating to the same page
          router.refresh(); // This will trigger a re-render and fetch a new random player
        } else {
          // Handle errors (e.g., show error message to the user)
          console.error('Dislike request failed');
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
      }
    };
  
    return (
      <div>
        <TinderCard className="container flex items-center justify-between space-x-4">
          <IconButton
            onClick={handleDislike}
            className="w-24 h-24 bg-red-500 rounded-full text-white font-bold hover:bg-red-600 focus:outline-none focus:ring focus:ring-green-400 shadow-md"
          >
            <HateIcon className="text-6xl" />
          </IconButton>
        </TinderCard>
      </div>
    );
  };
  
  export default DislikeButton;
// const DislikeButton = ({ playerIdToDislike }) => {
//   const router = useRouter();

//   // Handle the dislike action
//   const handleDislike = async () => {
//     // Send the dislike request
//     const dislikeClick = async () => {
//       const response = await fetch("/api/disliked", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           disliked_player_id: null,
//         }),
//       });

//       if (response.ok) {
//         // Handle success
//         console.log("Disliked successfully");

//         // Load a new random player by navigating to the same page
//         router.refresh();
//       } else {
//         // Handle errors
//         console.error("Dislike request failed");
//       }
//     };
//   };

//   return (
//     <div>
//       <TinderCard className="container flex items-center justify-between space-x-4">
//         <IconButton
//           onClick={handleDislike}
//           className="w-24 h-24 bg-red-500 rounded-full text-white font-bold hover:bg-red-600 focus:outline-none focus:ring focus:ring-green-400 shadow-md"
//         >
//           <HateIcon className="text-6xl" />
//         </IconButton>
//       </TinderCard>
//     </div>
//   );
// };

// export default DislikeButton;

