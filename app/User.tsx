'use client';
import { useSession } from 'next-auth/react'
import React from 'react'

function Player() {
    const {data: session} = useSession();
    return <pre>{JSON.stringify(session)}</pre>;
  
};

export default Player
