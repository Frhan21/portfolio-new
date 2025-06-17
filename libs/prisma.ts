import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalPrisma.prisma ?? new PrismaClient({
    log: ['query']
})

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma


export default prisma; 