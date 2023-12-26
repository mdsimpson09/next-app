import React, { FC, ReactNode } from 'react'



interface LayoutProps { 
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className= 'bg-slate-200 p-20 rounded-xl'>
     {children}
    </div>
  )
}

export default Layout