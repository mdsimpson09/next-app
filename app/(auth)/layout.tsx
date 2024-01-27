import React, { FC, ReactNode } from 'react'



interface LayoutProps { 
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className= 'bg-indigo-200 p-20 rounded-xl min-w-7'>
     {children}
    </div>
    
  )
}

export default Layout
