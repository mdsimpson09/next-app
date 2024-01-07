'use client';
import React, { useEffect, useState } from 'react';

// Define the type for an individual match
type MatchType = {
  player_id_1: number;
  player_id_2: number;
  // Add other match details you might need
};

const MatchingPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    // Fetch matches for users
    fetch(`/api/match`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched matches data:", data); // Debugging log
        setMatches(data.matches);
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
        setMatches([]);
      });
  }, []);

  if (!matches || matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No matches found, or something went wrong.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Matches</h1>
      {matches.map((match, index) => (
        <div key={index}>
          {/* Replace this div with your match card component */}
          Match between Player {match.player_id_1} and Player {match.player_id_2}
        </div>
      ))}
      {/* Add any match controls or additional components here */}
    </div>
  );
};

export default MatchingPage;