import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  title: 'Inalia',
  description: 'Make your talks more engaging with real-time interactions.',
  vite: {
    plugins: [llmstxt({ domain: 'https://docs.inalia.app' })],
  },
  head: [
    ['script', { 'defer': '', 'data-domain': 'docs.inalia.app', 'src': 'https://plausible.soubiran.dev/js/script.outbound-links.js' }],
    ['script', {}, 'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }'],
  ],
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Examples', link: 'https://github.com/inalia-app/examples' },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/inalia-app' },
    ],
  },
})
