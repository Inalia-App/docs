import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PropsTable from './components/PropsTable.vue'
import EventsTable from './components/EventsTable.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PropsTable', PropsTable)
    app.component('EventsTable', EventsTable)
  }
} satisfies Theme
