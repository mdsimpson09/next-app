'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdGames } from "react-icons/md";
import { SlGameController } from 'react-icons/sl';

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
    return <div className="flex justify-center items-center h-screen">
    <SlGameController className="text-indigo-400 text-9xl animate-spin-slow" />
  </div>;
  }

  return (
    <div>
      <h1 className="text-gray-700 font-bold capitalize">Matches for {player_id}</h1>
      <br></br>
      <div className= 'bg-slate-50 p-5 rounded-sm min-w-7 flex flex-col justify-center items-center capitalize'>
      <ul className='list-none p-0'>
    {matches.length > 0 ? (
      matches.map((match) => (
        <Link href={`/player/${match.player_id}`} key={match.player_id}>
          <li className='flex items-center justify-between mb-2'>
            <MdGames className='flex-shrink-0' />
            <span className='mx-2'>{match.username ?? 'Unknown User'}</span>
            <MdGames className='flex-shrink-0' />
          </li>
        </Link>
      ))
    ) : (
      <li>No matches found</li>
    )}
  </ul>
      </div>
    </div>
  );
};

export default Matches;