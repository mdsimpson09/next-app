'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { FaXTwitter } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


interface UserProfileProps {
  player_id: string;
  first_name: string | null;
  username: string | null;
  bio: string | null;
  looking_for: string | null;
  image: string | null;
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
    return <div>Loading...</div>;
  }


  return (
    <div>
    <div className="min-w-6 max-3 py-6 p-6 bg-white shadow-md rounded-md my-8">
      <img
        src={userProfile.image || "/profile-image.jpg"}
        alt="Profile"
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-semibold mb-2 capitalize">
        {userProfile.first_name || ""}
      </h1>
      <p className="text-gray-500 mb-4">{userProfile.username || ""}</p>
      <p className="text-gray-700 font-bold capitalize"> about me: </p>
      <p> {userProfile.bio || ""}</p>
      <br></br>
      <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
      <p className="text-gray-700">{userProfile.looking_for || ""}</p>
    </div>
    <div className= 'bg-slate-50 p-10 rounded-sm min-w-7'>
      <h1 className="text-xl font-bold mb-4">Connect with {userProfile.username}</h1>
      <ul className="flex list-none p-0">
        <li className="mr-4">
          <Link href={`https://twitch.com/${userProfile.username}`} passHref>
            <FaTwitch />
          </Link>
        </li>
        <li className="mr-4">
          <Link href={`https://discord.com/${userProfile.username}`} passHref>
            <FaDiscord />
          </Link>
        </li>
        <li className="mr-4">
          <Link href={`https://instagram.com/${userProfile.username}`} passHref>
            <FaInstagram />
          </Link>
        </li>
        <li className="mr-4">
          <Link href={`https://twitter.com/${userProfile.username}`} passHref>
            <FaXTwitter />
          </Link>
        </li>
        <li>
          <Link href={`https://facebook.com/${userProfile.username}`} passHref>
            <FaFacebook />
          </Link>
        </li>
      </ul>
    </div>
  </div>
  );

  
};

export default UserProfilePage;

