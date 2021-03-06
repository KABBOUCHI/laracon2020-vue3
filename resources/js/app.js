import { InertiaApp } from './../../inertia-vue/src'
import { createApp, h } from 'vue'

const el = document.getElementById('app')

const app = createApp({
  render: () =>
    h(InertiaApp, {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    }),
})
app.use(InertiaApp)
app.mount(el)
