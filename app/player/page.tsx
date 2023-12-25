// import { prisma } from '@/lib/prisma'

// export default async function home() {
//     const player = await prisma.player.findFirst({
//         where: {
//             email: 'bob@prisma.io'
//         }
//     })
//     return <main> Hello {player?.first_name} </main>
// }

import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md">
        <img
          src="/profile-image.jpg" // Add your profile image path
          alt="Profile"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2">John Doe</h1>
        <p className="text-gray-500 mb-4">@johndoe</p>
        <p className="text-gray-700">
          A short bio about the user goes here. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex mt-4">
        <button className="flex-1 px-4 py-2 text-white bg-red-500 rounded-l-md">
          Swipe Left
        </button>
        <button className="flex-1 px-4 py-2 text-white bg-green-500 rounded-r-md">
          Swipe Right
        </button>
      </div>
    </div>
  );
};

export default Profile;