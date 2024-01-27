'use client';
import React, { useEffect, useState } from 'react';
import MeetUI from './MeetUI';
import MeetControls from './MeetControls';

import { SlGameController } from 'react-icons/sl';


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
  const [refresh, setRefresh] = useState(1);
 const handleToggleRefresh = () => {setRefresh(refresh + 1)};
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
        // console.log("Fetched player data:", data); // Debugging log
        setProfileData(data.player);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setProfileData(null);
      });
  }, [refresh]); 

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
      <SlGameController className="text-indigo-400 text-9xl animate-spin-slow" />
    </div>
    );
  }

  return (
    <div>
    <div >
      <MeetUI player={profileData} />
      </div>
      <br></br>
      <div>
      <MeetControls player={profileData} toggleRefresh={handleToggleRefresh}/>
    </div>
    </div>
  );
};

export default Meet;