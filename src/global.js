import Vue from 'vue'
import ElementUI from 'element-ui'
import Filters from './filters'
import VueI18n from 'vue-i18n'
import locales from './locales'

import Cookies from 'js-cookie'
import VueBus from 'vue-bus'
import { $apis, $util, $document, $auth, $lodash } from 'helper'

Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(VueBus)

Vue.prototype.$apis = $apis
Vue.prototype.$util = $util
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document
Vue.prototype.$_ = $lodash

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'en')
Vue.config.lang = lang
Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

import Icon from 'components/Icon/Icon.vue'
Vue.component('icon', Icon)

import AsideList from 'components/AsideList'
Vue.component('aside-list', AsideList)

import LinksList from 'components/LinksList'
Vue.component('links-list', LinksList)

/* Public Filter */
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}
