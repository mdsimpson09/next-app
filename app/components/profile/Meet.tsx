'use client';
import React, { useEffect, useState } from 'react';
import MeetUI from './MeetUI';
import MeetControls from './MeetControls';


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
  const [profileData, setProfileData] = useState<MeetProps['player']>(player);

  useEffect(() => {
    const apiUrl = "/api/meet"; 
    
    // Make the API request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched player data:", data); // Debugging log
        setProfileData(data.player);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setProfileData(null);
      });
  }, []); 

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Whoops! Something went wrong.</p>
      </div>
    );
  }

  return (
    <div>
        
      <MeetUI player={profileData} />
      <MeetControls player={profileData} />
    </div>
  );
};

export default Meet;