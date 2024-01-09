'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Match = {
  username: string | null;
  player_id: number;
};

const MatchingPage: React.FC = () => {

  const [matches, setMatches] = useState<Match[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const { user } = session;

      const apiUrl = `/api/matches/${user.id}`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          setMatches(data.matches); 
        })
        .catch(error => {
          console.error("Error fetching matches:", error);
        });
    }
  }, [session]);

  if (!matches) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No mutual matches found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Matches</h1>
      {matches.map((match) => (
        <div key={match.player_id}>
          <p>Matched with: {match.username}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchingPage;
//   'use client';
// import React, { useEffect, useState } from 'react';

// type MatchType = {
//     player_id_1: number;
//     player_id_2: number;
//     // Add other match details you might need
//   };
  
//   // Define the type for the response from your API
//   type MatchesApiResponse = {
//     matches: MatchType[];
//   };
  
//   const MatchingPage: React.FC = () => {
//     const [matches, setMatches] = useState<MatchType[]>([]);
    
//     useEffect(() => {
//       // Fetch matches for the logged-in user
//       const apiUrl = "/api/findmatches";
//       fetch(apiUrl)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data: MatchesApiResponse) => {
//           setMatches(data.matches);
//         })
//         .catch(error => {
//           console.error('Error fetching matches:', error);
//         });
//     }, []);
  
//     if (!matches || matches.length === 0) {
//       return (
//         <div className="flex flex-col items-center justify-center h-screen">
//           <p>No matches found, or something went wrong.</p>
//         </div>
//       );
//     }
  
//     return (
//       <div>
//         <h1>Your Matches</h1>
//         {matches.map((match, index) => (
//           <div key={index}>
//             {/* Replace this div with your match card component */}
//             Match between Player {match.player_id_1} and Player {match.player_id_2}
//           </div>
//         ))}
//         {/* Add any match controls or additional components here */}
//       </div>
//     );
//   };
  
//   export default MatchingPage;