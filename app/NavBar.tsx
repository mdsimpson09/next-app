
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiGamepad } from "react-icons/gi";
import classnames from 'classnames'
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
        <Link href='/'> Home </Link>
        <Link href='/profile'> Profile </Link>
        <Link href='/meet'> Find Players </Link>
        <Link href='/about'> About </Link>
        <Link href='/faqs'> FAQs </Link>
        <Link href='/matches'> Your Matches </Link>
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
{/* 
async function NavBar() {
    const session = await getServerSession(authOptions);
    const currentPath = usePathname();
    console.log(currentPath);
    const links= [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        // { label: 'Profile', href: '/' },
        // { label: 'Meet', href: '/' },
        // { label: 'Matches', href: '/' },
        // { label: 'Chat', href: '/' },
        { label: 'Signup', href: '/sign-up' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Login', href: '/login' },
    ]
  return (
    <div className= 'container'>
      <nav className='flex space-x-6 border-b mb-5 px-10 h-14 items-center'>

        <Link className= 'text-teal-600 hover:text-blue-600' href="/"><GiGamepad /></Link>

        <ul className='flex space-x-6'>
            {links.map(link => 
            <Link 
            key={link.href}
            className= {classnames({
                'text-zinc-900': currentPath === link.href,
                'text-zinc-500' : currentPath !== link.href,
                'hover-text-blue-500 transition-colors': true
            })}
            href={link.href}>{link.label}</Link>)}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar */}