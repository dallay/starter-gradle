import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
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
					items: [
						{ label: 'Getting Started', slug: 'en/guides/getting-started' },
						{ label: 'Project Structure', slug: 'en/guides/structure' },
					],
				},
			],
		}),
	],
});
