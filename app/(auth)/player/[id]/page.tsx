// import React, { FC } from "react";

// interface ArticlePageProps {
//   params: { username: string
//             player_id: string 
//             first_name: string
//   };
// }

// const ArticlePage: FC<ArticlePageProps> = ({ params }) => {
//   return (
//     <main>
//       <h1 className="text-black text-4xl font-bold">{`Article id:${params.username}`}</h1>
//       <h1 className="text-black text-4xl font-bold">{`Article id:${params.first_name}`}</h1>
//     </main>
//   );
// };

// export default ArticlePage;


// 'use client'
// import React, { useEffect, useState } from 'react';

// interface PlayerProfile {
//   player_id: number;
//   first_name: string | null;
//   last_name: string | null;
//   username: string;
//   email: string;
//   bio: string | null;
//   looking_for: string | null;
//   image: string | null;
// }

// const UserPage: React.FC = () => {
//   const [profile, setProfile] = useState<PlayerProfile | null>(null);

//   useEffect(() => {
//     const playerId = "20"; // Replace with dynamic player_id if needed
//     fetch(`/api/player-profile/${playerId}`)
//       .then((response) => response.json())
//       .then((data) => setProfile(data))
//       .catch((error) => console.error("Error fetching profile data:", error));
//   }, []);

//   if (!profile) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <div>
//       <h1>Profile of {profile.username}</h1>
//       <p>Name: {profile.first_name} {profile.last_name}</p>
//       <p>Username: {profile.username}</p>
//       <p>Email: {profile.email}</p>
//       <p>Bio: {profile.bio || "Not provided"}</p>
//       <p>Looking For: {profile.looking_for || "Not provided"}</p>
//       {/* Display image if it exists */}
//       {profile.image && <img src={profile.image} alt="Profile" />}
//     </div>
//   );
// };

// export default UserPage;
'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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
  </div>
  );
};

export default UserProfilePage;

