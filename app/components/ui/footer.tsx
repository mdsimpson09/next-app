'use client'
import React from 'react'
import HeartIcon from '@mui/icons-material/FavoriteOutlined';
import HateIcon from '@mui/icons-material/CloseOutlined';
import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import RedoIcon from '@mui/icons-material/ReplayOutlined';
import { Icon, IconButton } from '@mui/material';
import TinderCard from'react-tinder-card'




const Footer = () => {
  return (
    <div>
{/* footer-btn-left */}
<TinderCard className= "container flex items-center justify-between space-x-4">

    <IconButton className="w-24 h-24 bg-red-500 rounded-full text-white  font-bold hover:bg-red-600 focus:outline-none focus:ring focus:ring-green-400 shadow-md">
          <HateIcon className= 'text-6xl'/>
        </IconButton>

        <IconButton className= 'font-bold text-3xl rounded-full bg-blue-400 w-16 h-16 text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg'>
       <RedoIcon />
      </IconButton>


    <IconButton className="font-bold text-3xl rounded-full bg-blue-400 w-16 h-16 text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg">
      <ExitIcon />
    </IconButton>

        <IconButton className="font-bold text-3xl rounded-full bg-green-500 w-24 h-24 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400 focus:ring-opacity-50 shadow-lg">
          <HeartIcon className= 'text-5xl'/>
        </IconButton>
</TinderCard>
    </div>
  )
}

export default Footer;