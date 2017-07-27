function setTitleLang (zhStr, enStr) {
  return {
    zh: zhStr,
    en: enStr
  }
}

export default {
  path: '/about',
  meta: {
    title: setTitleLang('晚晴幽草轩', '晚晴幽草轩')
  },
  component: resolve => require(['views/AboutMe'], resolve)
}
