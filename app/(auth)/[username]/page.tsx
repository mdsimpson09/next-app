// //app/(auth)/[username]/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { FC } from'react'


interface ProfileProps {
    params: {
      username: string,
      first_name: string | null;
      bio: string | null;
      looking_for: string | null;
      image: string | null;
      player_id: number;
    
    };
}

const Username: React.FC<ProfileProps> = ({ params }) => {
  console.log(params)
  const [profileData, setProfileData] =
  useState<ProfileProps["params"]>(params);
  useEffect(() => {
    const apiUrl = `/api/${params.username}`;

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
          src={params.image || ""}
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 capitalize">
          {params.first_name || ""}
        </h1>
        <p className="text-gray-500 mb-4">{params.username}</p>
        <p className="text-gray-700 font-bold capitalize"> about me: </p>
        <p> {params.bio || ""}</p>
        <br></br>
        <p className="text-gray-700 font-bold capitalize"> I'm looking for:</p>
        <p className="text-gray-700">{params.looking_for || ""}</p>
      </div>
      </div>

  )}
export default Username;