import { prisma } from '@/lib/prisma'

export default async function home() {
    const player = await prisma.player.findFirst({
        where: {
            email: 'bob@prisma.io'
        }
    })
    return <main> Hello {player?.first_name} </main>
}