import * as dotenv from 'dotenv'
import fastifyPlugin from 'fastify-plugin'

const dotEnvConfig = (Fastify, opts, done) => {
  try {
    const envConfig = dotenv.config()
    Fastify.decorate('config', envConfig.parsed)
    done()
  } catch (error) {
    done(error)
  }
}

export default fastifyPlugin(dotEnvConfig)
