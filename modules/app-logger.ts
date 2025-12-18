import { addPlugin, addServerPlugin, addTypeTemplate, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'

export interface ModuleOptions {
  tag?: string
  level?: number
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'app-logger',
    configKey: 'appLogger',
  },
  defaults: {
    tag: 'app',
    level: process.env.LOG_LEVEL ? Number(process.env.LOG_LEVEL) : 3,
  },
  setup (options, nuxt) {
    const level = options.level ?? 3
    const tag = options.tag ?? 'app'
    const logger = useLogger(tag, { level })
    logger.info('App logger module initialized')

    const { resolve } = createResolver(import.meta.url)

    // Inject a Nuxt plugin to provide `$logger` in runtime (client/server)
    addPlugin({ src: resolve('./runtime/nuxt-logger') })

    // Add a Nitro plugin to attach per-request logger & basic request logs
    addServerPlugin(resolve('./runtime/nitro-logger'))

    // Expose defaults to runtime config (optional)
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.loggerLevel = level
    nuxt.options.runtimeConfig.public.loggerTag = tag

    // Provide TS types for `$logger` and `event.context.logger`
    addTypeTemplate({
      filename: 'types/app-logger.d.ts',
      getContents: () => `
import type { ConsolaInstance } from 'consola'

declare module '#app' {
  interface NuxtApp {
    $logger: ConsolaInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $logger: ConsolaInstance
  }
}

export {}
`,
    }, { nitro: true })
  }
})
