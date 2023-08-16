import fastifyPlugin from 'fastify-plugin'
import autoload from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const filename = fileURLToPath(import.meta.url)

const controllers = async (Fastify, opts, done) => {
  try {
    Fastify.register(autoload, {
      dir: join(dirname(filename), '..', 'controllers'),
      options: { ...opts },
      forceESM: true,
    })
  } catch (error) {
    console.log(error)
  }
  done()
}

export default fastifyPlugin(controllers, {
  name: 'controllers',
})
