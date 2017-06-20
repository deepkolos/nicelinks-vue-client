import Vue from 'vue'
import Filters from './filters'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locales from './locales'
import Cookies from 'js-cookie'
import VueBus from 'vue-bus'
import { $apis, $util, $document, $auth } from 'helper'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueBus)

Vue.prototype.$apis = $apis
Vue.prototype.$util = $util
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'en')
Vue.config.lang = lang
Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

import Icon from 'components/Icon/Icon.vue'
import AsideList from 'components/AsideList'
Vue.component('icon', Icon)
Vue.component('aside-list', AsideList)

/* Public Filter */
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}
