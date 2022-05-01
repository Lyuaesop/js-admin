/* 主体框架扩展 */
layui.define(['jquery', 'menu', 'element', 'page', 'theme'], function (exports) {
  const $ = layui.$, element = layui.element, layer = layui.layer;
  const menu = layui.menu, theme = layui.theme, page = layui.page;
  if (!/http(s*):\/\//.test(location.href)) {
    return layer.alert('请先将项目部署至web容器（Apache/Tomcat/Nginx/IIS/等），否则部分数据将无法显示');
  }
  const admin = {
    /**
     * 后台框架初始化
     * @param options.iniUrl   后台初始化接口地址
     * @param options.clearUrl   后台清理缓存接口
     * @param options.withVersion 初始化页面是否加版本号
     * @param options.bgColorDefault 默认皮肤
     * @param options.multiModule 是否开启多模块
     * @param options.menuChildOpen 是否展开子菜单
     * @param options.loadingTime 初始化加载时间
     * @param options.pageAnim 切换菜单动画
     */
    render: async options => {
      // 是否是登录页
      const isLoginPage = location.href.includes('/#/page/login.html');
      if (!isLoginPage) {
        const token = sessionStorage.getItem('token'), uid = sessionStorage.getItem('uid');
        if (Type(token) !== 'string' || !token.trim() || token.trim() === 'undefined' || isNaN(uid) || uid < 1) {
          location.href = '/#/page/login.html';
          location.reload();
          return;
        }
      }
      // 解析参数
      options.withVersion = options.withVersion || false;
      options.bgColorDefault = options.bgColorDefault || 0;
      options.multiModule = options.multiModule || false;
      options.menuChildOpen = options.menuChildOpen || false;
      options.loadingTime = options.loadingTime || 1;
      options.pageAnim = options.pageAnim || false;
      const next = () => {
        const menus = Site.menus.map(m => {
          m.title = Site.i18n[m.title];
          if (m.child) m.child = m.child.map(s => {
            s.title = Site.i18n[s.title];
            return s;
          });
          return m;
        });
        Site.home.title = Site.i18n.home;
        if (!isLoginPage) {
          admin.renderLogo();
          admin.renderAnim(options.pageAnim);
          admin.listen({multiModule: options.multiModule});
          menu.render({
            menus: menus,
            multiModule: options.multiModule,
            menuChildOpen: options.menuChildOpen
          });
          theme.render({
            listen: true,
            bgColorDefault: options.bgColorDefault
          });
        }
        page.render({
          menus: menus,
          multiModule: options.multiModule,
          withVersion: options.withVersion,
          menuChildOpen: options.menuChildOpen,
          listenSwichCallback: () => admin.renderDevice()
        });
        admin.deleteLoader(options.loadingTime);
        if (!isLoginPage) {
          $('#account').html(localStorage.getItem('account'));
          const langs = Keys(Site.langs).map(r => {
            const active = r === Site.lang ? 'layui-this' : '';
            return `<dd data-site-lang='${r}' class='${active}'><a href='javascript:void(0);'>${Site.langs[r]}</a></dd>`;
          }).join('');
          $('#nav_actions').html(`${langs}<hr/><dd><a href='javascript:void(0);' class='login-out' t='logout'></a></dd>`);
        }
      };
      if (Site.i18n && Type(Site.i18n) === 'object') return next();
      fetch(`/lang/${Site.lang}.json`).then(r => r.json()).then(r => {
        if (r.laydate) r.laydate = JSON.parse(r.laydate);
        r.site_lang = Site.lang;
        Site.i18n = r;
        next();
      });
    },
    /**
     * 初始化logo
     */
    renderLogo: () => {
      const html = `<a href='javascript:void(0);'><img src='${Site.logo.image}' alt='logo'><h1>${Site.logo.title || ''}</h1></a>`;
      $('.layuimini-logo').html(html);
    },
    /**
     * 切换菜单动画
     * @param anim
     */
    renderAnim: anim => {
      if (!anim) return;
      let style = '.layuimini-page-anim{-webkit-animation-name:layuimini-upbit;-webkit-animation-duration:.3s;-webkit-animation-fill-mode:both}';
      style += '@keyframes layuimini-upbit{0%{transform:translate3d(0,30px,0);opacity:.3}100%{transform:translate3d(0,0,0);opacity:1}}';
      $('#layuimini-bg-color').after(`<style id='layuimini-page-anim'>${style}</style>`);
    },
    /**
     * 进入全屏
     */
    fullScreen: () => {
      let e = document.documentElement, func = e.requestFullScreen || e.webkitRequestFullScreen;
      if (typeof func != 'undefined' && func) {
        func.call(e);
        return;
      }
      if (typeof window.ActiveXObject != 'undefined') {
        const script = new ActiveXObject('WScript.Shell');
        if (script != null) script.SendKeys('{F11}');
        return;
      }
      func = e.msRequestFullscreen || e.oRequestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen;
      if (func) {
        func();
        return;
      }
      admin.error('浏览器不支持全屏调用！');
    },
    /**
     * 退出全屏
     */
    exitFullScreen: () => {
      let e = document, func = e.cancelFullScreen || e.webkitCancelFullScreen || e.exitFullScreen;
      if (typeof func != 'undefined' && func) {
        func.call(e);
        return;
      }
      if (typeof window.ActiveXObject != 'undefined') {
        const script = new ActiveXObject('WScript.Shell');
        if (script != null) script.SendKeys('{F11}');
        return;
      }
      func = e.msExitFullscreen || e.oRequestFullscreen || e.mozCancelFullScreen || e.webkitCancelFullScreen;
      if (func) {
        func();
        return;
      }
      admin.error('浏览器不支持全屏调用！');
    },
    /**
     * 判断是否为手机
     * @returns {boolean}
     */
    checkMobile: () => {
      const u = navigator.userAgent.toLocaleLowerCase(), p = navigator.platform.toLocaleLowerCase();
      const android = (/android/i).test(u) || ((/iPhone|iPod|iPad/i).test(u) && (/linux/i).test(p)) || (/ucweb.*linux/i.test(u));
      const ios = (/iPhone|iPod|iPad/i).test(u) && !android;
      const wp = (/Windows Phone|ZuneWP7/i).test(u);
      const width = document.documentElement.clientWidth;
      return android || ios || wp || width <= 1024;
    },
    /**
     * 初始化设备端
     */
    renderDevice: () => {
      if (!admin.checkMobile()) return;
      $('.layuimini-tool i').attr({'data-side-fold': 1, class: 'fa fa-outdent'});
      $('.layui-layout-body').removeClass('layuimini-mini').addClass('layuimini-all');
    },
    /**
     * 初始化加载时间
     * @param time
     */
    deleteLoader: time => setTimeout(() => $('.layuimini-loader').fadeOut(), time * 500),
    /**
     * 监听
     * @param options
     */
    listen: options => {
      const $body = $('body');
      /* 刷新 */
      $body.on('click', '[data-refresh]', () => {
        page.refresh(options);
        layer.msg(Site.i18n.success_refresh);
      });
      /* 切换语言 */
      $body.on('click', '[data-site-lang]', function () {
        const lang = $(this).attr('data-site-lang');
        localStorage.setItem('lang', lang);
        location.reload();
      });
      /* 监听提示信息 */
      $body.on('mouseenter', '.layui-nav-tree .menu-li', function () {
        if (admin.checkMobile()) return false;
        const isShow = $('.layuimini-tool i').attr('data-side-fold'), tips = $(this).prop('innerHTML');
        if (isShow == 0 && tips) {
          const html = `<ul class='layuimini-menu-left-zoom layui-nav layui-nav-tree layui-this'><li class='layui-nav-item layui-nav-itemed'>${tips}</li></ul>`;
          window.openTips = layer.tips(html, $(this), {
            tips: [2, '#2f4056'], time: 300000, skin: 'popup-tips',
            success: e => {
              $(e).css({left: $(e).position().left - 10});
              element.render();
            }
          });
        }
      });
      $body.on('mouseleave', '.popup-tips', () => {
        if (admin.checkMobile()) return;
        if ($('.layuimini-tool i').attr('data-side-fold') != 0) return;
        try {layer.close(window.openTips);} catch (_) {}
      });
      /* 全屏 */
      $body.on('click', '[data-check-screen]', function () {
        const isFull = $(this).attr('data-check-screen') == 'full';
        admin[isFull ? 'fullScreen' : 'exitFullScreen']();
        $(this).attr('data-check-screen', isFull ? 'exit' : 'full');
        $(this).html(`<i class='fa fa-${isFull ? 'compress' : 'arrows-alt'}'></i>`);
      });
      /* 点击遮罩层 */
      $body.on('click', '.layuimini-make', admin.renderDevice);
      /* 退出登录 */
      $body.on('click', '.login-out', () => layer.msg(Site.i18n.success_logout, {time: 500}, () => {
        sessionStorage.clear();
        location.href = '/';
      }));
      /*修改昵称*/
      $body.on('click', '.edit-nickname', () => {
        const uid = sessionStorage.getItem('uid');
        if (isNaN(uid) || uid < 1) return;
        const username = localStorage.getItem('account'), nickname = sessionStorage.getItem('nick') || '';
        let html = `<form id='modal_nickname' class='layui-form' style='margin:10px 20px'>`;
        html += `<div class='layui-form-item'><label class='layui-form-label'>${Site.i18n.username}</label>`;
        html += `<div class='layui-input-block'><input readonly class='layui-input' value='${username}'/></div></div>`;
        html += `<div class='layui-form-item'><label class='layui-form-label'>${Site.i18n.nickname}</label>`;
        html += `<div class='layui-input-inline'><input id='field_nickname' value='${nickname}' placeholder='${Site.i18n.pls_input_nickname}' autocomplete='off' class='layui-input'/></div></div>`;
        html += `</form>`;
        layer.open({
          type: 1, title: Site.i18n.edit_nickname, content: html,
          btn: [Site.i18n.submit, Site.i18n.cancel],
          btn2: index => layer.close(index),
          yes: index => {
            const nickname = $('#field_nickname').val().trim();
            if (!nickname) return layer.msg(Site.i18n.err_nickname_cannot_empty);
            Api('Agent_Agent.SetOrEditNickname', {user_id: uid, new_nickname: nickname}, r => {
              layer.msg(r.msg);
              layer.close(index);
              sessionStorage.setItem('nick', nickname);
            }, r => layer.msg(r));
          }
        });
      });
    }
  };
  exports('admin', admin);
});