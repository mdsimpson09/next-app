//app/components/profile/profile.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { SlGameController } from 'react-icons/sl';

import Link from 'next/link';
import { Button } from '@radix-ui/themes';

interface ProfileProps {
  player: {
    first_name: string | null;
    username: string | null;
    bio: string | null;
    looking_for: string | null;
    favorite_games: string | null;
    favorite_device: string | null;
    image: string | null;
    player_id: number;
  };
}

const Profile: React.FC<ProfileProps> = ({ player }) => {
  const [profileData, setProfileData] =
    useState<ProfileProps["player"]>(player);

  useEffect(() => {
    const apiUrl = "/api/profile/";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.player) {
          setProfileData(data.player);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
      <SlGameController className="text-indigo-400 text-9xl animate-spin-slow" />
    </div>
    );
  }

  return (

    <div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl min-w-7 w-[475px] h-[650px]'>
        <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8 w-[375px] h-[500px] overflow-y-auto hide-scrollbar'>
        <img
          src={profileData.image || "/profile-image.jpg"}
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 capitalize">
          {profileData.first_name || ""}
        </h1>
        <p className="text-gray-500 mb-4">{profileData.username || ""}</p>
        <p className="text-gray-700 font-bold capitalize"> About Me: </p>
        <p> {profileData.bio || ""}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> My Favorite Games: </p>
        <p> {profileData.favorite_games || ""}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> Preferred Devices </p>
        <p> {profileData.favorite_device || ""}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
        <p className="text-gray-700">{profileData.looking_for || ""}</p>
      </div>
      
    </div>
  );
};

export default Profile;









