import { defineConfig } from 'vitepress'
import implicitFigures from 'markdown-it-image-figures'

export default defineConfig({
  title: "Inalia",
  description: "Make your talks more engaging with real-time interactions.",

  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/inalia-app' }
    ]
  },

  appearance: true,
  cleanUrls: true,

  markdown: {
     config(md) {
      md
        .use(implicitFigures, { figcaption: 'alt' })
    },
  },
})
