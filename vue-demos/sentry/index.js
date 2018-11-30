import * as Sentry from '@sentry/browser'
import Vue from 'vue'
import config from './config'
export default {
  run () {
    Sentry.init({
      dsn: config.dsn,
      integrations: [new Sentry.Integrations.Vue({ Vue })]
    })
  }
}
