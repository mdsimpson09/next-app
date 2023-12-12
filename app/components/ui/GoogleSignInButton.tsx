import React from 'react'
import { Button } from './button'
import { FC, ReactNode } from 'react'


interface GoogleSignInButtonProps{
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps>= ({ children }) => {
  const logInWithGoogle = () => console.log('Logging in with Google')
  return (
  <Button onClick= {logInWithGoogle} className= "w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
    {children}
  </Button>
  )
}

export default GoogleSignInButton
