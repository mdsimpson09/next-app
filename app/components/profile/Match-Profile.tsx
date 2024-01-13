//app/components/profile/profile.tsx
'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { Button } from '@radix-ui/themes';

interface ProfileProps {
  player: {
    first_name: string | null;
    username: string | null;
    bio: string | null;
    looking_for: string | null;
    image: string | null;
    player_id: number;
  };
}

const MatchProfile: React.FC<ProfileProps> = ({ player }) => {
  const [profileData, setProfileData] =
    useState<ProfileProps["player"]>(player);

  useEffect(() => {
    const apiUrl = "/api/match-profile";

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
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Whoops! Something went wrong.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="min-w-6 max-3 py-6 p-6 bg-white shadow-md rounded-md my-8">
        <img
          src={profileData.image || "/profile-image.jpg"}
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 capitalize">
          {profileData.first_name || ""}
        </h1>
        <p className="text-gray-500 mb-4">{profileData.username || ""}</p>
        <p className="text-gray-700 font-bold capitalize"> about me: </p>
        <p> {profileData.bio || ""}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
        <p className="text-gray-700">{profileData.looking_for || ""}</p>
      </div>
      <Button><Link href="/edit">Edit Profile</Link></Button>
    </div>
  );
};

export default MatchProfile;

