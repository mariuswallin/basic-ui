import { App } from 'vue'
import * as components from './components'

function install(app: App) {
  let key: keyof typeof import('./components')
  for (key in components) {
    app.component(key, components[key])
  }
}

export default { install }

export * from './components'
