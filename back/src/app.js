import fastify from 'fastify'
import pino from 'pino'
import env from './lib/env.js'

import plugins from './lib/plugins.js'
import routes from './lib/controllers.js'

const Fastify = fastify.fastify({
  logger: pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
})

Fastify.register(env)
await Fastify.after()

Fastify.register(plugins)
Fastify.register(routes)
await Fastify.ready()

export default Fastify
