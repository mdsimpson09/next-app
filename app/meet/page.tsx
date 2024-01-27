import React from 'react'
import Meet from '@/app/components/profile/Meet';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';


async function MeetPage() {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (session?.user) {
  return (
    <div >
      <div >
      <Meet />
      </div>
    <div>
      
    </div>

    </div>
  )}
  return (
    <h2>Please 
        <Link className='text-blue-500 hover:underline' href= '/login'> login </Link> 
        to see other players!  </h2>
  )
}

export default MeetPage; 