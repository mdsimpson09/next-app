// //app/components/profile/matching.tsx

// 'use client'
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Match {
//   username: string;
//   player_id: number;
// }

// interface MatchesProps {
//   player_id: number;
// }

// const Matches: React.FC<MatchesProps> = ({ player_id }) => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const apiUrl = "/api/matches";

//     const fetchMatches = async () => {
//       const response = await fetch(apiUrl);

//       if(response.ok) {
//         const data = await response.json();
       
//         setMatches(data.matches); 
//       } else {
//         console.error('Failed to fetch matches');  
//       }
//       setLoading(false);
//     };
    
//     fetchMatches();
//   }, [player_id]);

//   if(loading) {
//     return <div>Loading...</div>;
//   }
//   console.log(matches);
//   return (
//     <div>
//       <h1 className="text-gray-700 font-bold capitalize">Matches for {player_id}</h1>

//       <ul>
//         {matches && matches.length > 0 ? (
        
//           matches.map((username, player_id) => (
            
//             <Link href={`/player/${player_id}`}> 
//             <li key={player_id}> code for usernames </li> 
//             </Link>
//             // <Link href={`player/${username}`}> 
//             // <li key={index}>{username}</li> 
//             // </Link>
//           ))
//         ) : (
//           <li>No matches found</li>
          

//         )}
//       </ul>
//     </div>
//   );
// }

// export default Matches;


'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Match {
  player_id: number;
  username: string | null;  // Assuming username might not always be available
}

interface MatchesProps {
  player_id: number;
}

const Matches: React.FC<MatchesProps> = ({ player_id }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "/api/matches";

    const fetchMatches = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const playerIds = await response.json();

          // Here we fetch the usernames for each player ID
          const matchesWithUsernames = await Promise.all(playerIds.matches.map(async (id: number) => {
            // Replace '/api/username' with the actual API endpoint to fetch username by player_id
            const usernameResponse = await fetch(`/api/username/${id}`);
            const usernameData = await usernameResponse.json();
            return { player_id: id, username: usernameData.username };
          }));

          setMatches(matchesWithUsernames);
        } else {
          console.error('Failed to fetch matches');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
      setLoading(false);
    };

    fetchMatches();
  }, [player_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-gray-700 font-bold capitalize">Matches for {player_id}</h1>
      <ul>
        {matches.length > 0 ? (
          matches.map((match) => (
            <Link href={`/player/${match.player_id}`} key={match.player_id}> 
              <li>{match.username ?? 'Unknown User'}</li> 
            </Link>
          ))
        ) : (
          <li>No matches found</li>
        )}
      </ul>
    </div>
  );
};

export default Matches;