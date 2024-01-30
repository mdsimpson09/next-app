
// import React from 'react'
// import Link from 'next/link'
// import { getServerSession } from 'next-auth';
// import { Button } from './components/ui/button'
// import { authOptions } from '@/lib/auth';
// import { signOut } from 'next-auth/react';
// import UserAccountNav from './components/UserAccountNav';

// const Navbar = async () =>{
  
//   const session = await getServerSession(authOptions);
//   return (
//     <div className='bg-indigo-400 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg'>
//       <div className='container flex items-center justify-between'>
//         <Link href='/'>
//           <img src= "/logo.png" alt="logo" className='h-20 w-20' />
//         </Link>
//         {/* <Link href='/'> Home </Link> */}
//         <Link href='/about'> About </Link>
//         <Link href='/profile'> Profile </Link>
//         <Link href='/meet'> Find Players </Link>
//         <Link href='/matches'> Your Matches </Link>
//         <Link href='/faqs'> FAQs </Link>
//         <Link href='/sign-up'> Sign Up </Link>
       
//     {session?.user ? ( <UserAccountNav /> ) : 
//       (
//          <Button> <Link  href='/login'> Login </Link> </Button>
//     )}
//       </div>
//       </div>
//   );
// };

// export default Navbar;

'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserAccountNav from './components/UserAccountNav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='bg-indigo-400 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg overflow-visible'>
    <div className='flex items-center justify-between px-4'>
      <Link href='/'>
        {/* Adjust the width and height as needed */}
        <img src="/logo.png" alt="logo" className='h-[120px] w-[120px] cursor-pointer -mt-4 -mb-4' />
      </Link>

      {/* Menu button (visible only on small screens) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block md:hidden"
      >
        Menu
      </button>

        {/* Navigation Links */}
        <div className={`flex-1 md:flex md:items-center md:justify-between absolute md:relative right-0 top-16 md:top-0 w-full md:w-auto bg-indigo-400 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'} ml-12`}>
          <Link href='/about'><span className="block text-right mt-2 md:mt-0 cursor-pointer">About</span></Link>
          <Link href='/profile'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Profile</span></Link>
          <Link href='/meet'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Find Players</span></Link>
          <Link href='/matches'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Your Matches</span></Link>
          <Link href='/faqs'><span className="block text-right mt-2 md:mt-0 cursor-pointer">FAQs</span></Link>
          <Link href='/sign-up'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Sign Up</span></Link>
          {session?.user ? (
            <UserAccountNav />
          ) : (
            <Link href='/login'><span className='btn block text-right mt-2 md:mt-0 cursor-pointer'>Login</span></Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;