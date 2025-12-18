import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { consola } from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const level = Number(config.public?.loggerLevel ?? 3)

  let logger = consola.create({ level })
  // On server, reuse Nitro logger if available for consistency
  if (import.meta.server) {
    try {
      const { useNitroApp } = require('nitropack/runtime')
      const nitro = useNitroApp?.()
      if (nitro?.logger) {
        logger = nitro.logger
      }
    } catch {
      // Fallback to consola instance
    }
  }

  nuxtApp.provide('logger', logger)
})
