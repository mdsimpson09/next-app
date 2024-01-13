//app/(auth)/match-profile/page.tsx
import React from 'react'
import MatchProfile from '@/app/components/profile/MatchProfile';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';

import DislikeButton from '@/app/components/profile/dislike-button';

async function MatchPage() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (session?.user) {
  return (
    <div >

      <MatchProfile />
  
    </div>
  )}
  return (
    <h2>Please 
        <Link className='text-blue-500 hover:underline' href= '/login'> login </Link> 
        to see and edit your profile page </h2>
  )
}

export default MatchPage; 