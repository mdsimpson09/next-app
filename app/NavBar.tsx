// 'use client'
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import UserAccountNav from './components/UserAccountNav';
// import { usePathname } from 'next/navigation';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { data: session } = useSession();
//   const pathname = usePathname(); 

//   const isActive = (path: string) => pathname === path ? 'bg-indigo-500 text-white p-2 rounded-full' : 'hover:bg-indigo-500 hover:text-white p-2 rounded-full ';
//   const linkStyle = (href: string) => `block text-right mt-2 md:mt-0 cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 ${pathname === href ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-500 hover:text-white'}`;

//   return (
//     <div className='bg-indigo-400 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg overflow-visible'>
//     <div className='flex items-center justify-between px-4'>
//       <Link href='/'>
//         {/* Adjust the width and height as needed */}
//         <img src="/logo.png" alt="logo" className=' w-36 h-36 cursor-pointer -mt-3 -mb-10' />
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
//           <Link href='/about'><span className={`${isActive('/about')}  hover:outline p-3 rounded-full shadow-outline`}>About</span></Link>
//           <Link href='/profile'><span className={`${isActive('/profile')}  hover:outline p-3 rounded-full shadow-outline`}>Profile</span></Link>
//           <Link href='/meet'><span className={`${isActive('/meet')}hover:outline p-3 rounded-full shadow-outline`}>Find Players</span></Link>
//           <Link href='/matches'><span className={`${isActive('/matches')}hover:outline p-3 rounded-full shadow-outline`}>Your Matches</span></Link>
//           <Link href='/faqs'><span className={`${isActive('/faqs')}hover:outline p-3 rounded-full shadow-outline`}>FAQs</span></Link>
//           <Link href='/sign-up'><span className={`${isActive('/sign-up')}hover:outline p-3 rounded-full shadow-outline`}>Sign Up</span></Link>
          
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

'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserAccountNav from './components/UserAccountNav';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname(); 

  const isActive = (path: string) => {
    // Check if the current path matches the link's path
    const active = pathname === path;
    return `block text-right mt-2 md:mt-0 cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 ${active ? 'bg-indigo-500 text-white ring-2 ring-white' : 'hover:bg-indigo-500 hover:text-white'} hover:ring-2 hover:ring-white`;
  };

  const linkStyle = (path: string) => {
    const baseStyles = "block text-right mt-2 md:mt-0 cursor-pointer px-4 py-2 rounded-full transition-colors duration-200";
    const activeStyles = "bg-indigo-500 text-white ring-2 ring-white"; // Add ring styles for active link
    const inactiveStyles = "hover:bg-indigo-500 hover:text-white";
    return `${baseStyles} ${pathname === path ? activeStyles : inactiveStyles}`;
  };

  return (
    <div className='bg-indigo-400 border-b border-s-zinc-200 fixed w-full z-10 top-0 text-white text-lg overflow-visible'>
    <div className='flex items-center justify-between px-4'>
      <Link href='/'>
        {/* Adjust the width and height as needed */}
        <img src="/logo.png" alt="logo" className=' w-36 h-36 cursor-pointer -mt-3 -mb-10' />
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
          
        <Link href='/about'><span className={isActive('/about')}>About</span></Link>
          <Link href='/profile'><span className={isActive('/profile')}>Profile</span></Link>
          <Link href='/meet'><span className={isActive('/meet')}>Find Players</span></Link>
          {/* Add the rest of your links here, applying linkStyle for each */}
          <Link href='/matches'><span className={isActive('/matches')}>Your Matches</span></Link>
          <Link href='/faqs'><span className={isActive('/faqs')}>FAQS</span></Link>
          <Link href='/sign-up'><span className={isActive('/sign-up')}>Sign up</span></Link>
          
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