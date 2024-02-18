import React from 'react'
import Profile from '@/app/components/profile/Profile';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

interface ProfileProps {
  player: {
    first_name?: string | null;
    username?: string | null;
    bio?: string | null;
    looking_for?: string | null;
    favorite_games?: string | null;
    favorite_device?: string | null;
    image?: string | null;
    player_id?: number;
    instagram?: string | null;
    twitter?: string | null;
    discord?: string | null;
    twitch?: string | null;
    facebook?: string | null;
  };
}


async function ProfilePage() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (session?.user) {
  return (
    <div>
    <Profile player={{
        first_name: '',
        username: '',
        bio: '',
        looking_for: '',
        favorite_games: '',
        favorite_device: '',
        image: '',
        player_id: 0,
        instagram: '',
        twitter: '',
        discord: '',
        twitch: '',
        facebook: ''
      }} />
    <br></br>
    {/* Wrap the button in a div with Flexbox styling */}
    <div className='flex justify-center'>
        <Button > 
            <Link href="/edit">Edit Profile</Link>
        </Button>
    </div>
</div>
  )}
  return (
    <h2>Please 
        <Link className='text-blue-500 hover:underline' href= '/login'> login </Link> 
        to see and edit your profile page </h2>
  )
}

export default ProfilePage; 