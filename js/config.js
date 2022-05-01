// 站点配置
window.Site = {
  platform: 'outer',
  api: 'https://api.demo.com',
  i18n: null, langs: {cn: '简体中文', en: 'English'}, lang: localStorage.getItem('lang') || 'cn',
  home: {href: 'page/home.html'}, logo: {image: '', href: 'page/home.html'},
  menus: [
    {
      title: 'menu_one', href: 'javascript:void(0);', icon: 'fa fa-angle-double-right', target: '_self', childOpenClass: '',
      child: [
        {title: 'menu_child_one', href: 'page/one.html', icon: 'fa fa-users', target: '_self', childOpenClass: ''},
        {title: 'menu_child_two', href: 'page/two.html', icon: 'fa fa-pie-chart', target: '_self', childOpenClass: ''}
      ]
    }
  ]
};
window.UUID = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)).replace(/-/g, '');
window.Type = data => Object.prototype.toString.call(data).split(' ').pop().toLowerCase().replace(/]$/, '');
window.Keys = data => Type(data) === 'object' && Object.keys(data) || [];
window.HasKey = (data, key) => Type(key) === 'string' && (key = key.trim()) && Type(data) === 'object' && data.hasOwnProperty(key) || false;
window.Api = (router, data, success, fail) => {
  if (Site.wait_fetch) return;
  Site.wait_fetch = true;
  data = data ? JSON.stringify(data) : null;
  if (!fail || Type(fail) !== 'function') fail = () => null;
  if (!success || Type(success) !== 'function') success = () => null;
  const uid = sessionStorage.getItem('uid') || '';
  const lang = localStorage.getItem('lang') || 'cn';
  const token = sessionStorage.getItem('token') || '';
  const url = `${Site.api}${router}&token=${token}&user_id=${uid}&lang=${lang}`;
  fetch(url, {method: 'POST', body: data, cache: 'no-cache'}).then(r => r.json()).then(r => {
    if (r.ret !== 200) return fail(r.msg);
    return success(r.data);
  }).catch(e => fail(e.message)).finally(() => Site.wait_fetch = false);
};
window.Time = (format, time) => {
  let isOK = false;
  format = format.trim();
  if (format === 'now') return new Date().getTime();
  'YyMmDdHhIiSs'.split('').forEach(r => (format.includes(r)) && (isOK = true));
  if (!isOK) return '';
  let date = new Date;
  if (time) {
    if (time instanceof Date) {
      date = time;
    } else if (typeof time === 'string') {
      if (/^\d{4}(-\d{2}){2}(\s\d{2}(:\d{2}){2})?$/.test(time)) {
        date = new Date(time);
      } else if (/^[ymd][+-]\d+$/.test(time)) {
        let type = time.substring(0, 1), num = parseInt(time.substring(1)), suffix = type === 'm' ? 'Month' : (type === 'y' ? 'FullYear' : 'Date');
        date['set' + suffix](date['get' + suffix]() + num);
      } else {
        return '';
      }
    }
  }
  const mapper = {};
  mapper.Y = date.getFullYear();
  mapper.y = (mapper.Y + '').substring(2);
  mapper.M = ((date.getMonth() + 1) + '').padStart(2, '0');
  mapper.m = parseInt(mapper.M);
  mapper.D = (date.getDate() + '').padStart(2, '0');
  mapper.d = parseInt(mapper.D);
  mapper.H = (date.getHours() + '').padStart(2, '0');
  mapper.h = parseInt(mapper.H);
  mapper.I = (date.getMinutes() + '').padStart(2, '0');
  mapper.i = parseInt(mapper.I);
  mapper.S = (date.getSeconds() + '').padStart(2, '0');
  mapper.s = parseInt(mapper.S);
  return format.split('').map(function (r) {
    return mapper.hasOwnProperty(r) ? mapper[r] : r;
  }).join('');
};
window.rootPath = (src => {
  src = document.scripts[document.scripts.length - 1].src;
  return src.substring(0, src.lastIndexOf('/') + 1);
})();
layui.config({base: rootPath + 'modules/', version: true}).extend({menu: 'site/menu', page: 'site/page', theme: 'site/theme', admin: 'site/admin'});