import fastifyPlugin from 'fastify-plugin'
import fastifyCors from '@fastify/cors'

const cors = async (Fastify, opts, done) => {
  Fastify.register(fastifyCors, {})
  done()
}

export default fastifyPlugin(cors)
