/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'

import { createI18n } from 'vue-i18n'
import './styles/styles.css';
import messages from './locale'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

const app = createApp(App)

registerPlugins(app)
app.use(i18n)

app.mount('#app')
