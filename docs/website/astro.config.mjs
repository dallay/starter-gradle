import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://starter-gradle.dallay.com',
  integrations: [
    starlight({
      title: 'Starter Gradle',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English' },
        es: { label: 'Español', lang: 'es' },
      },
      sidebar: [
        {
          label: 'Guides',
          translations: {
            es: 'Guías',
          },
          items: [
            {
              label: 'Getting Started',
              slug: 'guides/getting-started',
              translations: {
                es: 'Primeros Pasos',
              },
            },
            {
              label: 'Project Structure',
              slug: 'guides/structure',
              translations: {
                es: 'Estructura del Proyecto',
              },
            },
            {
              label: 'Features',
              slug: 'guides/features',
              translations: {
                es: 'Funcionalidades',
              },
            },
            {
              label: 'Architecture',
              slug: 'guides/architecture',
              translations: {
                es: 'Arquitectura',
              },
            },
            {
              label: 'Development',
              slug: 'guides/development',
              translations: {
                es: 'Desarrollo',
              },
            },
            {
              label: 'Configuration',
              slug: 'guides/configuration',
              translations: {
                es: 'Configuración',
              },
            },
          ],
        },
      ],
    }),
  ],
})
