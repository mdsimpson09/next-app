// //app/components/profile/matching.tsx

// 'use client'
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Match {
//   username: string;
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
        
//           matches.map((username, index) => (
            
//             <Link href={`/player/${username}`}> 
//             <li key={index}>{username}</li> 
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
//app/components/profile/matching.tsx

'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Match {
  username: string;
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
      const response = await fetch(apiUrl);

      if(response.ok) {
        const data = await response.json();
       
        setMatches(data.matches); 
      } else {
        console.error('Failed to fetch matches');  
      }
      setLoading(false);
    };
    
    fetchMatches();
  }, [player_id]);

  if(loading) {
    return <div>Loading...</div>;
  }
  console.log(matches);
  return (
    <div>
      <h1 className="text-gray-700 font-bold capitalize">Matches for {player_id}</h1>

      <ul>
        {matches && matches.length > 0 ? (
        
          matches.map((username, player_id) => (
            
            <Link href={`/player/${username}`}> 
            <li key={player_id}>{username}</li> 
            </Link>
            // <Link href={`player/${username}`}> 
            // <li key={index}>{username}</li> 
            // </Link>
          ))
        ) : (
          <li>No matches found</li>
          

        )}
      </ul>
    </div>
  );
}

export default Matches;