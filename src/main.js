import Vue from 'vue'
import App from './App.vue'

import Info from '@/components/info'
Vue.prototype.$info = Info.install;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/monokai-sublime.css'
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')