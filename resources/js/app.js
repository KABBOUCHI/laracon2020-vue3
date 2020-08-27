import { InertiaApp } from '@inertiajs/vue/src'
import { createApp, h } from 'vue'

Vue.use(InertiaApp)

const el = document.getElementById('app')

const app = createApp({
  render: h =>
    h(InertiaApp, {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    }),
})
app.use(InertiaApp)
app.mount(el)
