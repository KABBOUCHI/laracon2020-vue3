import { Inertia } from '@inertiajs/inertia'
import Link from './link'
import Remember from './remember'
import { h } from 'vue'

let app = {}

export default {
  name: 'Inertia',
  props: {
    initialPage: {
      type: Object,
      required: true,
    },
    resolveComponent: {
      type: Function,
      required: true,
    },
    transformProps: {
      type: Function,
      default: props => props,
    },
  },
  data() {
    return {
      component: null,
      props: {},
      key: null,
    }
  },
  created() {
    app = this
    Inertia.init({
      initialPage: this.initialPage,
      resolveComponent: this.resolveComponent,
      updatePage: async (component, props, { preserveState }) => {
        this.component = component
        this.props = this.transformProps(props)
        this.key = preserveState ? this.key : Date.now()
      },
    })
  },
  render() {
    if (this.component) {
      const child = h(this.component, {
        key: this.key,
        ...this.props,
      })

      if (this.component.layout) {
        if (typeof this.component.layout === 'function') {
          return this.component.layout(h, child)
        }

        return h(this.component.layout, [child])
      }

      return child
    }
  },
  install(app) {
    app.config.globalProperties.$inertia = Inertia
    app.config.globalProperties.$page = app.props
    app.mixin(Remember)
    app.component('InertiaLink', Link)
  },
}
