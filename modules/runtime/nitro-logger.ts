import { consola } from 'consola'

export default defineNitroPlugin((nitro) => {
  const rootLogger = consola.withTag('req')

  nitro.hooks.hook('request', (event) => {
    const logger = consola.withTag(`req:${event.method}`)
    ;(event as any).context.logger = logger
    logger.info({ url: (event as any).path }, 'request start')
  })

  nitro.hooks.hook('afterResponse', (event) => {
    const logger = ((event as any).context?.logger) || rootLogger
    const statusCode = (event as any)?.node?.res?.statusCode
    logger.info({ statusCode }, 'request end')
  })
})
