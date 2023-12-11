import React from 'react'
import { Button } from './button'
import { FC, ReactNode } from 'react'


interface GoogleSignInButtonProps{
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps>= ({ children }) => {
  const logInWithGoogle = () => console.log('Logging in with Google')
  return (
  <Button onClick= {logInWithGoogle} className= "w-full mt-2 pb-1.5 bg-blue-500 hover:bg-blue-600 text-white">
    {children}
  </Button>
  )
}

export default GoogleSignInButton
