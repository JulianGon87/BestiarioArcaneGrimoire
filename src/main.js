import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router'
import { vGlow } from './directives/vGlow.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faShieldHalved, faSkull, faDungeon, faDragon, faBookOpen, faChevronLeft, faBook, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faShieldHalved, faSkull, faDungeon, faDragon, faBookOpen, faChevronLeft, faBook, faPlus)

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.directive('glow', vGlow)

app.mount('#app')
