
import React from 'react'
import { Button } from './button'
import { FC, ReactNode } from 'react'
import { signIn } from 'next-auth/react';


interface GoogleSignInButtonProps{
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps>= ({ children }) => {
  const logInWithGoogle = () => signIn('google',{callbackUrl: 'http://localhost:3000/admin'});
  return (
    
  <Button onClick= {logInWithGoogle} className= "w-full">
    {children}
  </Button>

  )
  
}

export default GoogleSignInButton
