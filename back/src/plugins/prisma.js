import fastifyPlugin from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

const Prisma = async (Fastify, opts, done) => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })
  await prisma.$connect()
  Fastify.decorate('db', prisma)
  Fastify.addHook('onClose', async (Fastify) => {
    await Fastify.prisma.$disconnect()
  })
  done()
}

export default fastifyPlugin(Prisma)
