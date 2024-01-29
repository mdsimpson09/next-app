
import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { Button } from './components/ui/button'
import { authOptions } from '@/lib/auth';
import { signOut } from 'next-auth/react';
import UserAccountNav from './components/UserAccountNav';

const Navbar = async () =>{
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-indigo-400 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <img src= "/logo.png" alt="logo" className='h-20 w-20' />
        </Link>
        {/* <Link href='/'> Home </Link> */}
        <Link href='/about'> About </Link>
        <Link href='/profile'> Profile </Link>
        <Link href='/meet'> Find Players </Link>
        <Link href='/matches'> Your Matches </Link>
        <Link href='/faqs'> FAQs </Link>
        <Link href='/sign-up'> Sign Up </Link>
       
    {session?.user ? ( <UserAccountNav /> ) : 
      (
         <Button> <Link  href='/login'> Login </Link> </Button>
    )}
      </div>
      </div>
  );
};

export default Navbar;
