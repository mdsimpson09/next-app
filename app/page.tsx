// 'use server'
import Link from "next/link";
import Signup from "./components/Signup";
import { Button } from './components/ui/button'
import User from "./User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className= 'h-screen flex flex-col justify-center items-center'> 
      <h1 className= 'text-4xl'>Hello</h1>
      <div>
      <Button><Link href="/admin">View Profile</Link></Button>

      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}


      </div>

    
    
    </main>
  )
}
