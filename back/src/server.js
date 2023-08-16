import Fastify from './app.js'

const start = async () => {
  try {
    await Fastify.listen(
      {
        port: Fastify.config.PORT,
      },
      (err, address) => {
        if (err) {
          Fastify.log.error(err)
          process.exit(1)
        }
      }
    )
  } catch (error) {
    Fastify.log.error(error)
    process.exit(0)
  }
}

start()
