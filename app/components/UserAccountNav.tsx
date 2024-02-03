'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'

function UserAccountNav() {
  
  return (
    <Button className='outline' onClick= {()=> signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
        
        
     })} variant= 'destructive'>Log Out</Button>
  )
}

export default UserAccountNav
