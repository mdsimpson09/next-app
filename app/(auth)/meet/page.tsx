import React from 'react'
import Meet from '@/app/components/profile/Meet';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../../../lib/auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import Footer from "@/app/components/ui/footer";


async function MeetPage() {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (session?.user) {
  return (
    <div >
  
      <Meet />
      <Footer />
      
    </div>
  )}
  return (
    <h2>Please 
        <Link className='text-blue-500 hover:underline' href= '/login'> login </Link> 
        to see other players!  </h2>
  )
}

export default MeetPage; 