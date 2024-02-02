'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import UserAccountNav from './components/UserAccountNav';
import { useRouter } from 'next/navigation';
import { Button } from './components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/login`
    });
    router.push(data.url);
  };
  
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
            <Button className='outline' onClick={handleLogout} variant='destructive'>Log Out</Button>
          ) : (
            <Link href='/login'><span className='btn block text-right mt-2 md:mt-0 cursor-pointer'>Login</span></Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;

// 'use client'
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import UserAccountNav from './components/UserAccountNav';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { data: session } = useSession();

//   return (
//     <div className='bg-indigo-400 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg overflow-visible'>
//     <div className='flex items-center justify-between px-4'>
//       <Link href='/'>
//         {/* Adjust the width and height as needed */}
//         <img src="/logo.png" alt="logo" className='h-[120px] w-[120px] cursor-pointer -mt-4 -mb-4' />
//       </Link>

//       {/* Menu button (visible only on small screens) */}
//       <button 
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="block md:hidden"
//       >
//         Menu
//       </button>

//         {/* Navigation Links */}
//         <div className={`flex-1 md:flex md:items-center md:justify-between absolute md:relative right-0 top-16 md:top-0 w-full md:w-auto bg-indigo-400 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'} ml-12`}>
//           <Link href='/about'><span className="block text-right mt-2 md:mt-0 cursor-pointer">About</span></Link>
//           <Link href='/profile'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Profile</span></Link>
//           <Link href='/meet'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Find Players</span></Link>
//           <Link href='/matches'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Your Matches</span></Link>
//           <Link href='/faqs'><span className="block text-right mt-2 md:mt-0 cursor-pointer">FAQs</span></Link>
//           <Link href='/sign-up'><span className="block text-right mt-2 md:mt-0 cursor-pointer">Sign Up</span></Link>
          
//           {session?.user ? (
//             <UserAccountNav />
//           ) : (
//             <Link href='/login'><span className='btn block text-right mt-2 md:mt-0 cursor-pointer'>Login</span></Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Navbar;