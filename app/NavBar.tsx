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
        // { label: 'Login', href: '/' },
        // { label: 'Signup', href: '/' },
        { label: 'FAQs', href: '/faqs' },
    ]
  return (
    <div>
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
