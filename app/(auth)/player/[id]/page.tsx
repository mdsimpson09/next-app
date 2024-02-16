'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { FaXTwitter } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SlGameController } from 'react-icons/sl';
import { BsTwitch } from "react-icons/bs"

interface UserProfileProps {
  player_id: string;
  first_name: string | null;
  username: string | null;
  bio: string | null;
  favorite_games: string | null;
  favorite_device: string | null;
  looking_for: string | null;
  image: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  twitch: string | null;
  discord: string | null;
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const pathname = usePathname();
  
  
  useEffect(() => {
    // Extract player ID from pathname
    const player_id = pathname.split('/')[2]; // Adjust according to your URL structure

    if (player_id) {
      fetch(`/api/player-profile/${player_id}`)
        .then(response => response.json())
        .then(data => setUserProfile(data))
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [pathname]);

  if (!userProfile) {
    return  <div className="flex justify-center items-center h-screen">
    <SlGameController className="text-indigo-400 text-9xl animate-spin-slow" />
  </div>;
  }

  return (
<div className='flex justify-center items-center bg-indigo-200 p-10 rounded-xl min-w-7 w-[475px] h-[700px]'>
      <div className='max-w-3xl py-6 px-6 bg-white shadow-md rounded-md my-8 w-[500px] h-[600px] overflow-y-auto hide-scrollbar'>
        <div className="flex justify-center items-center ">
          <img
            src={userProfile.image || "/profile-image.jpg"}
            alt="Profile"
            className="w-full h-64 object-cover rounded-md mb-4" // Adjusted classes for image to match second page
          />
        </div>
        <h1 className="text-2xl font-semibold mb-2 capitalize">
          {userProfile.first_name || ""}
        </h1>
        <p className="text-gray-500 mb-4">{userProfile.username || ""}</p>
        <p className="text-gray-700 font-bold capitalize"> about me: </p>
        <p> {userProfile.bio || ""}</p>
        <br />
        <p className="text-gray-700 font-bold capitalize"> I&apos;m looking for:</p>
        <p className="text-gray-700">{userProfile.looking_for || ""}</p>
        <br />

        <p className="text-gray-700 font-bold capitalize"> Favorite Games: </p>
        <p> {userProfile.favorite_games || ""}</p>
        <br />
        <p className="text-gray-700 font-bold capitalize"> How I Play: </p>
        <p> {userProfile.favorite_device || ""}</p>
        <br />
        
        <br></br>
        <h1 className="text-xl font-bold mb-4 capitalize">Connect with {userProfile.username}</h1>
        <ul className="flex list-none p-0 justify-between">
  {userProfile.twitch && (
    <li className="mr-4">
      <Link href={userProfile.twitch}>
        <div className="flex items-center justify-center bg-purple-700 rounded-lg cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <FaTwitch className='text-white text-2xl'/>
        </div>
      </Link>
    </li>
  )}
  {userProfile.discord && (
    <li className="mr-4">
      <Link href={userProfile.discord}>
        <div className="flex items-center justify-center bg-indigo-400 rounded-lg cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <FaDiscord className="text-white text-2xl" />
        </div>
      </Link>
    </li>
  )}
  {userProfile.instagram && (
    <li className="mr-4">
      <Link href={userProfile.instagram}>
        <div className="flex items-center justify-center bg-white rounded-lg cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <img src='/instagram.png' alt="Instagram" className="text-white text-2xl" />
        </div>
      </Link>
    </li>
  )}
  {userProfile.twitter && (
    <li className="mr-4">
      <Link href={userProfile.twitter}>
        <div className="flex items-center justify-center bg-black rounded-lg cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <FaXTwitter className="text-white text-2xl" />
        </div>
      </Link>
    </li>
  )}
  {userProfile.facebook && (
    <li>
      <Link href={userProfile.facebook}>
        <div className="flex items-center justify-center bg-blue-600 rounded-full cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <FaFacebook className="text-white text-2xl" />
        </div>
      </Link>
    </li>
  )}
</ul>
      </div>
    </div>
  );

  
};

export default UserProfilePage;

