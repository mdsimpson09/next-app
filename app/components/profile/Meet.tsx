'use client';
import React, { useEffect, useState } from 'react';


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
      
      <div className=" max-3 py-6 p-6 bg-white shadow-md rounded-md my-8">
        <img
          src={profileData.image || '/profile-image.jpg'} // Use the profile image from API if available, fallback to a default image
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 capitalize">{profileData.first_name || ''}</h1>
        <p className="text-gray-500 mb-4">{profileData.username || ''}</p>
        <p className="text-gray-700 font-bold capitalize"> about me: </p>
        <p>  {profileData.bio || ''}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
        <p className="text-gray-700">{profileData.looking_for || ''}</p>
      
      </div>
    </div>
  );
};

export default Meet;