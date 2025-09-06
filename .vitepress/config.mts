import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Inalia",
  description: "Make your talks more engaging with real-time interactions.",
  head: [
    ['script', { defer: '', 'data-domain': 'docs.inalia.app', src: 'https://plausible.soubiran.dev/js/script.outbound-links.js' }],
    ['script', {}, 'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }']
  ],
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/inalia-app' }
    ]
  }
})
