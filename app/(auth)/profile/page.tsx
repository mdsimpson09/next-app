import React from 'react'
import Profile from '@/app/components/profile/Profile';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';

import Header from "@/app/components/ui/Header";
import DislikeButton from '@/app/components/profile/dislike-button';

async function ProfilePage() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (session?.user) {
  return (
    <div >

      <Profile />
  
    </div>
  )}
  return (
    <h2>Please 
        <Link className='text-blue-500 hover:underline' href= '/login'> login </Link> 
        to see and edit your profile page </h2>
  )
}

export default ProfilePage; 