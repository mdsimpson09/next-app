// 'use server'

import Link from "next/link";
import { Button } from '../../components/ui/button'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Main() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
  return (
    
    <main>
      <img  className ='flex flex-col justify-left items-left h-25 w-25' src= "/logo.png" alt="logo"  /> 
      <br></br>
    
      <h1 className='flex flex-col justify-center items-center text-4xl'>Hello! Welcome to Gamer Date {session.user.username}!</h1>
      <div className='flex flex-col justify-center items-center'>
<br></br>
<br></br>
      <Button ><Link href="/profile">View Profile</Link></Button>
      </div>
    </main>
  )
} 

return (
    <main>
    <img  className ='flex flex-col justify-left items-left h-25 w-25' src= "/logo.png" alt="logo"  /> 
    <br></br>
  
    <h1 className='flex flex-col justify-center items-center text-4xl'>Hello! Welcome to Gamer Date!</h1>
    <div className='flex flex-col justify-center items-center'>
<br></br>
<br></br>
    <Button ><Link href="/profile">Login</Link></Button>
    </div>
  </main>
    )
}