// import React, { FC } from "react";

// interface ArticlePageProps {
//   params: { username: string };
// }

// const ArticlePage: FC<ArticlePageProps> = ({ params }) => {
//   return (
//     <main>
//       <h1 className="text-black text-4xl font-bold">{`Article id:${params.username}`}</h1>
//     </main>
//   );
// };

// export default ArticlePage;



'use client'
import React, { FC,  useEffect, useState } from "react";

interface ProfilePageProps {
  params: { 
    first_name: string | null;
    username: string | null;
    bio: string | null;
    looking_for: string | null;
    image: string | null;
    player_id: number;
  
  };
}

const UserPage: FC<ProfilePageProps> = ({ params }) => {
  const [profileData, setProfileData] =
    useState<ProfilePageProps["params"]>(params);
    useEffect(() => {
      const { username } = params;
      const apiUrl = `/api/players/${username}`;
  
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
  

  return (
    <main>
      <h1 className="text-black text-4xl font-bold">{`Article id:${params.username}`}</h1>
      <h1 className="text-black text-4xl font-bold">{`Article id:${params.first_name}`}</h1>
    </main>
  );
};

export default UserPage;

