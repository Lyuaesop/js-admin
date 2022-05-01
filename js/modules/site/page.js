/* 单页框架扩展 */
layui.define(['element', 'jquery', 'layer'], function (exports) {
  const $ = layui.$, element = layui.element, layer = layui.layer;
  const page = {
    /**
     * 初始化tab
     * @param options
     */
    render: options => {
      options.menus = options.menus || [];
      options.multiModule = options.multiModule || false;
      options.withVersion = options.withVersion || false;
      options.listenSwichCallback = options.listenSwichCallback || function () {};
      const href = location.hash.replace(/^#\//, '');
      if (href === null || href === undefined || href === '') {
        page.renderHome(options);
      } else {
        page.renderPage(href, options);
        if (options.multiModule) {
          page.listenSwitchMultiModule(href);
        } else {
          page.listenSwitchSingleModule(href);
        }
      }
      page.listen(options);
      page.listenHash(options);
    },
    /**
     * 初始化主页
     * @param options
     */
    renderHome: options => {
      options.withVersion = options.withVersion || false;
      $('.layuimini-page-header').addClass('layui-hide');
      page.renderPageContent(Site.home.href, options);
    },
    /**
     * 初始化页面
     * @param href
     * @param options
     */
    renderPage: (href, options) => {
      page.renderPageTitle(href, options);
      page.renderPageContent(href, options);
    },
    /**
     * 初始化页面标题
     * @param href
     * @param options
     */
    renderPageTitle: (href, options) => {
      options.menus = options.menus || [];
      const $header = $('.layuimini-page-header'), list = page.buildPageTitleArray(href, options.menus);
      $header.removeClass('layui-hide');
      let html = `<a href='#' class='layuimini-back-home' t='home'></a><span lay-separator>/</span>`;
      if (list.length > 0) {
        for (let key in list) {
          key = parseInt(key);
          if (key !== list.length - 1) {
            html += `<a href='javascript:void(0);'><cite>${list[key]}</cite></a><span lay-separator>/</span>`;
          } else {
            html += `<a href='javascript:void(0);'><cite>${list[key]}</cite></a>`;
          }
        }
      } else {
        const title = sessionStorage.getItem('layuimini_page_title');
        if (title === null || title === undefined || title === '') {
          $header.addClass('layui-hide');
        } else {
          html += `<a><cite>${title}</cite></a>`;
        }
      }
      $('.layuimini-page-header .layuimini-page-title').empty().html(html);
    },
    /**
     * 初始化语言
     */
    renderLang: () => {
      localStorage.setItem('lang', Site.lang);
      $('[t]').each((_, e) => {
        const key = $(e).attr('t'), prefix = key.startsWith('title_') ? Site.i18n.title_site : '';
        $(e).html(prefix + (HasKey(Site.i18n, key) ? Site.i18n[key] : '?'));
      });
      $('[p]').each((_, e) => {
        const key = $(e).attr('p');
        $(e).attr('placeholder', HasKey(Site.i18n, key) ? Site.i18n[key] : '?');
      });
    },
    /**
     * 初始化页面内容
     * @param options
     * @param href
     */
    renderPageContent: (href, options) => {
      options.withVersion = options.withVersion || false;
      const container = '.layuimini-content-page';
      if (options.withVersion) {
        const time = new Date().getTime();
        href = href.indexOf('?') > -1 ? href + '&v=' + time : href + '?v=' + time;
      }
      if ($('.layuimini-page-header').hasClass('layui-hide')) {
        $(container).removeAttr('style');
      } else {
        $(container).attr('style', 'height: calc(100% - 36px)');
      }
      $(container).html('');
      $.ajax({
        url: href, type: 'get', dataType: 'html',
        success: data => {
          $(container).html(data);
          page.renderLang();
          element.init();
        },
        error: xhr => layer.msg('Status:' + xhr.status + '，' + xhr.statusText + '，请稍后再试！')
      });
    },
    /**
     * 刷新页面内容
     * @param options
     */
    refresh: options => {
      const href = location.hash.replace(/^#\//, '');
      if (href === null || href === undefined || href === '') {
        page.renderHome(options);
        return;
      }
      page.renderPageContent(href, options);
    },
    /**
     * 构建页面标题数组
     * @param href
     * @param list
     */
    buildPageTitleArray: (href, list) => {
      let items = [], tmp = [];
      for (let v of list) {
        if (v.href === href) {
          items.push(v.title);
          break;
        }
        if (v.child) {
          tmp = page.buildPageTitleArray(href, v.child);
          if (tmp.length > 0) {
            tmp.unshift(v.title);
            items = items.concat(tmp);
            break;
          }
        }
      }
      return items;
    },
    /**
     * 获取指定链接内容
     * @param href
     * @returns {string}
     */
    getHrefContent: href => {
      let content = '';
      const time = new Date().getTime();
      $.ajax({
        url: href.indexOf('?') > -1 ? `${href}&v=${time}` : `${href}?v=${time}`,
        type: 'get', dataType: 'html', async: false,
        success: data => content = data,
        error: xhr => layer.msg('Status:' + xhr.status + '，' + xhr.statusText + '，请稍后再试！')
      });
      return content;
    },
    /**
     * 获取弹出层的宽高
     * @returns {jQuery[]}
     */
    getOpenWidthHeight: () => {
      const $e = $('.layuimini-content-page');
      return [$e.width(), $e.height(), $e.offset().top, $e.offset().left];
    },
    /**
     * 单模块切换
     * @param id
     */
    listenSwitchSingleModule: id => {
      $('[layuimini-href]').each(function () {
        // if ($(this).attr('layuimini-href') !== id) return;
        const todo = function ($e, type) {
          if (type === 1) {
            $e.addClass('layui-this');
            if ($e.hasClass('layui-nav-item') && $e.hasClass('layui-this')) {
              $('.layuimini-header-menu li').attr('class', 'layui-nav-item');
              return;
            }
            todo($e.parent().parent(), 2);
            return;
          }
          $e.addClass('layui-nav-itemed');
          if ($e.hasClass('layui-nav-item') && $e.hasClass('layui-nav-itemed')) {
            $('.layuimini-header-menu li').attr('class', 'layui-nav-item');
            return;
          }
          todo($e.parent().parent(), 2);
        };
        todo($(this).parent(), 1);
      });
    },
    /**
     * 多模块切换
     * @param id
     */
    listenSwitchMultiModule: id => {
      $('[layuimini-href]').each(function () {
        if ($(this).attr('layuimini-href') !== id) return;
        const todo = function ($e, type) {
          if (type === 1) {
            $e.addClass('layui-this');
            if ($e.hasClass('layui-nav-item') && $e.hasClass('layui-this')) {
              const mid = $e.parent().attr('id');
              $('.layuimini-header-menu li').attr('class', 'layui-nav-item');
              $('#' + mid + 'HeaderId').addClass('layui-this');
              $('.layuimini-menu-left .layui-nav.layui-nav-tree').attr('class', 'layui-nav layui-nav-tree layui-hide');
              $('#' + mid).attr('class', 'layui-nav layui-nav-tree layui-this');
              return;
            }
            todo($e.parent().parent(), 2);
            return;
          }
          $e.addClass('layui-nav-itemed');
          if ($e.hasClass('layui-nav-item') && $e.hasClass('layui-nav-itemed')) {
            const mid = $e.parent().attr('id');
            $('.layuimini-header-menu li').attr('class', 'layui-nav-item');
            $(`#${mid}HeaderId`).addClass('layui-this');
            $('.layuimini-menu-left .layui-nav.layui-nav-tree').attr('class', 'layui-nav layui-nav-tree layui-hide');
            $(`#${mid}`).attr('class', 'layui-nav layui-nav-tree layui-this');
            return;
          }
          todo($e.parent().parent(), 2);
        };
        todo($(this).parent(), 1);
      });
    },
    /**
     * 修改hash地址定位
     * @param href
     */
    hashChange: href => window.location.hash = '#/' + href + '?r=' + UUID(),
    /**
     * 修改hash地址为主页
     */
    hashHome: () => window.location.hash = '#/?r=' + UUID(),
    /**
     * 监听
     */
    listen: () => {
      const $body = $('body');
      /* 打开新窗口 */
      $body.on('click', '[layuimini-href]', function () {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const href = $(this).attr('layuimini-href');
        if (!href) return;
        const $e = $(`[layuimini-href='${href}']`, '.layuimini-menu-left'), $target = $(this).attr('target');
        if (window.openTips) layer.close(window.openTips);
        if ($e.length) {
          $($e).closest('.layui-nav-tree').find('.layui-this').removeClass('layui-this');
          $($e).parent().addClass('layui-this');
        }
        if ($target === '_blank') {
          layer.close(loader);
          window.open(href, '_blank');
          return;
        }
        page.hashChange(href);
        $('.layuimini-menu-left').attr('layuimini-page-add', 'yes');
        layer.close(loader);
      });
      /* 在子页面上打开新窗口 */
      $body.on('click', '[layuimini-content-href]', function () {
        const loader = parent.layer.load(0, {shade: false, time: 2 * 1000});
        const href = $(this).attr('layuimini-content-href');
        if (!href) return;
        const $e = $(`[layuimini-href='${href}']`, '.layuimini-menu-left');
        const title = $(this).text(), $target = $(this).attr('target');
        if (window.openTips) layer.close(window.openTips);
        if ($e.length) {
          $($e).closest('.layui-nav-tree').find('.layui-this').removeClass('layui-this');
          $($e).parent().addClass('layui-this');
        }
        if ($target === '_blank') {
          parent.layer.close(loader);
          window.open(href, '_blank');
          return false;
        }
        sessionStorage.setItem('layuimini_page_title', title);
        page.hashChange(href);
        parent.layer.close(loader);
      });
      /* 返回主页 */
      $body.on('click', '.layuimini-back-home', page.hashHome);
    },
    /**
     * 监听hash变化
     */
    listenHash: options => {
      options.multiModule = options.multiModule || false;
      options.listenSwichCallback = options.listenSwichCallback || (() => {});
      window.onhashchange = function () {
        const token = sessionStorage.getItem('token'), uid = sessionStorage.getItem('uid');
        if (Type(token) !== 'string' || !token.trim() || token.trim() === 'undefined' || isNaN(uid) || uid < 1) {
          location.href = '/#/page/login.html';
          location.reload();
          return;
        }
        const href = location.hash.replace(/^#\//, ''), $href = $('[layuimini-href]');
        if (typeof options.listenSwichCallback === 'function') options.listenSwichCallback();
        if (href === null || href === undefined || href === '') {
          $href.parent().removeClass('layui-this');
          page.renderHome(options);
        } else {
          page.renderPage(href, options);
        }
        const $left = $('.layuimini-menu-left');
        if ($left.attr('layuimini-page-add') === 'yes') {
          $left.attr('layuimini-page-add', 'no');
          return;
        }
        // 从页面中打开的话，浏览器前进后退、需要重新定位菜单焦点
        $href.parent().removeClass('layui-this');
        if (options.multiModule) {
          page.listenSwitchMultiModule(href);
          return;
        }
        page.listenSwitchSingleModule(href);
      };
    }
  };
  exports('page', page);
});