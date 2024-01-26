

//app/api/player-profile/[player_id]
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import React from "react";

export async function GET( 
    request: Request, 
    { params }: {params: { player_id: string }} 
    ) {
    const id = params.player_id;
    const profile = await prisma.player.findUnique({
        where:{
            player_id: parseInt(id, 10)
        } 
    
    })
    return NextResponse.json(profile)
}
/////////////DELETE////////////////
export async function DELETE( 
    request: Request, 
    { params }: {params: { player_id: string }} 
    ) {
    const id = params.player_id;
    const deleted = await prisma.player.delete({
        where:{
            player_id: parseInt(id, 10)
        } 
    
    })
    return NextResponse.json(deleted)
  }