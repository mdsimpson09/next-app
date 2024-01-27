import React from 'react'
import Profile from '@/app/components/profile/Profile';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { Button } from '@radix-ui/themes';




async function ProfilePage() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (session?.user) {
  return (
    <div>
    <Profile />
    <br></br>
    {/* Wrap the button in a div with Flexbox styling */}
    <div className='flex justify-center'>
        <Button className= 'bg-red-300'> 
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