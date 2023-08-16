import fastifyPlugin from 'fastify-plugin'
import autoload from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const filename = fileURLToPath(import.meta.url)

const plugins = async (Fastify, opts, done) => {
  try {
    Fastify.register(autoload, {
      dir: join(dirname(filename), '..', 'plugins'),
      options: { ...opts },
      forceESM: true,
    })
  } catch (error) {
    console.log(error)
  }
  done()
}

export default fastifyPlugin(plugins, {
  name: 'plugins',
})
