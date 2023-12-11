"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiGamepad } from "react-icons/gi";
import classnames from 'classnames'



const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);
    const links= [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        // { label: 'Profile', href: '/' },
        // { label: 'Meet', href: '/' },
        // { label: 'Matches', href: '/' },
        // { label: 'Chat', href: '/' },
        { label: 'Login', href: '/login' },
        { label: 'Signup', href: '/sign-up' },
        { label: 'FAQs', href: '/faqs' },
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

export default NavBar

// const NavBar = () => {
//   return (
//     <div className='bg-zinc-100 py-2 border-b border-s-zinc 200 fixed w-full z-16 top-0'>
//         <div className='container flex items-center justify-between bottom-2'>
//             <Link href='/'><GiGamepad /></Link>
//             <Link className= {buttonVariants()} href='/'>Home</Link>
//             <Link href='/about'>About</Link>
//             <Link href='/about'>Profile</Link>
//             <Link href='/about'>Meet</Link>
//             <Link href='/about'>Matches</Link>
//             <Link href='/about'>Chat</Link>
//             <Link href='/about'>Login</Link>
//             <Link href='/about'>Signup</Link>
//             <Link href='/faqs'>FAQs</Link>


        
//     </div>
//     </div>
    
//     );
// };

// export default NavBar; 