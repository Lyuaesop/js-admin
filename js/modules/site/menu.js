/* 菜单框架扩展 */
layui.define(['element', 'laytpl', 'jquery', 'layer'], function (exports) {
  const $ = layui.$, element = layui.element, laytpl = layui.laytpl, layer = layui.layer;
  const menu = {
    /**
     * 菜单初始化
     * @param options.menus   菜单数据信息
     * @param options.multiModule 是否开启多模块
     * @param options.menuChildOpen 是否展开子菜单
     */
    render: options => {
      options.menus = options.menus || [];
      options.multiModule = options.multiModule || false;
      options.menuChildOpen = options.menuChildOpen || false;
      menu[options.multiModule ? 'renderMultiModule' : 'renderSingleModule'](options.menus, options.menuChildOpen);
      menu.listen();
    },
    /**
     * 单模块
     * @param list 菜单数据
     * @param open 是否默认展开
     */
    renderSingleModule: (list, open) => {
      if (!list) list = [];
      const html = this.renderLeftMenu(list, {childOpenClass: open ? ' layui-nav-itemed' : ''});
      $('.layui-layout-body').addClass('layuimini-single-module'); //单模块标识
      $('.layuimini-header-menu').remove();
      $('.layuimini-menu-left').html(html);
      element.init();
    },
    /**
     * 渲染一级菜单
     */
    compileMenu: (menu, isSub) => {
      let html = '<li{{#if(d.menu){}} data-menu="{{d.menu}}"{{#}}} class="layui-nav-item menu-li {{d.childOpenClass}} {{d.className}}"{{#if(d.id){}} id="{{d.id}}"{{#}}}><a{{#if(d.href){}} layuimini-href="{{d.href}}"{{#}}}{{#if(d.target){}} target="{{d.target}}"{{#}}} href="javascript:void(0);">{{#if(d.icon){}}<i class="{{d.icon}}"></i>{{#}}}<span class="layui-left-nav">{{d.title}}</span></a>{{# if(d.children){}}{{d.children}}{{#}}}</li>';
      if (isSub) html =
        '<dd class="menu-dd {{d.childOpenClass}} {{d.className}}"><a href="javascript:void(0);"{{#if(d.menu){}} data-menu="{{d.menu}}"{{#}}}{{#if(d.id){}} id="{{d.id}}"{{#}}}{{#if((!d.child||!d.child.length)&&d.href){}} layuimini-href="{{d.href}}"{{#}}}{{#if(d.target){}} target="{{d.target}}"{{#}}}>{{#if(d.icon){}}<i class="{{d.icon}}"></i>{{#}}}<span class="layui-left-nav">{{d.title}}</span></a>{{#if(d.children){}}{{d.children}}{{#}}}</dd>';
      return laytpl(html).render(menu);
    },
    compileMenuContainer: (menu, isSub) => {
      let html = `<ul class='layui-nav layui-nav-tree layui-left-nav-tree {{d.className}}' id='{{d.id}}'>{{d.children}}</ul>`;
      if (isSub) html = '<dl class="layui-nav-child">{{d.children}}</dl>';
      if (!menu.children) return '';
      return laytpl(html).render(menu);
    },
    each: (list, todo) => list.map((v, i) => todo(i, v)),
    renderChildrenMenu: function (list, options) {
      const self = this;
      if (!list) list = [];
      const html = this.each(list, (i, menu) => {
        if (menu.child && menu.child.length) menu.children = self.renderChildrenMenu(menu.child, {childOpenClass: options.childOpenClass || ''});
        menu.className = '';
        menu.childOpenClass = options.childOpenClass || '';
        return self.compileMenu(menu, true);
      }).join('');
      return self.compileMenuContainer({children: html}, true);
    },
    renderLeftMenu: function (leftMenus, options) {
      if (!options) options = {};
      const self = this;
      let html = self.each(leftMenus || [], function (idx, leftMenu) { // 左侧菜单遍历
        const children = self.renderChildrenMenu(leftMenu.child, {childOpenClass: options.childOpenClass});
        return self.compileMenu({
          href: leftMenu.href, target: leftMenu.target,
          childOpenClass: options.childOpenClass, icon: leftMenu.icon, title: leftMenu.title, children: children
        });
      }).join('');
      return self.compileMenuContainer({id: options.parentMenuId, className: options.leftMenuCheckDefault, children: html});
    },
    /**
     * 多模块
     * @param list 菜单数据
     * @param open 是否默认展开
     */
    renderMultiModule: function (list, open) {
      if (!list) list = [];
      const self = this;
      let header = '', left = '', leftDefault = 'layui-this', headerDefault = 'layui-this';
      const openClass = open ? ' layui-nav-itemed' : '';
      let headerMenuHtml = self.each(list, function (i, v) { //顶部菜单渲染
        const menu = 'multi_module_' + i, id = menu + 'HeaderId';
        let html = self.compileMenu({
          className: headerDefault, menu: menu,
          id: id, title: v.title, href: '', target: '', children: ''
        });
        left += self.renderLeftMenu(v.child, {parentMenuId: menu, childOpenClass: openClass, leftMenuCheckDefault: leftDefault});
        header += self.compileMenu({id: id, menu: menu, icon: v.icon, title: v.title}, true);
        headerDefault = '';
        leftDefault = 'layui-hide';
        return html;
      }).join('');
      $('.layui-layout-body').addClass('layuimini-multi-module'); //多模块标识
      $('.layuimini-menu-header-pc').html(headerMenuHtml); //电脑
      $('.layuimini-menu-left').html(left);
      $('.layuimini-menu-header-mobile').html(header); //手机
      element.init();
    },
    /**
     * 监听
     */
    listen: () => {
      const $body = $('body');
      /* 菜单模块切换 */
      $body.on('click', '[data-menu]', function () {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const id = $(this).attr('data-menu');
        // header
        $('.layuimini-header-menu .layui-nav-item.layui-this').removeClass('layui-this');
        $(this).addClass('layui-this');
        // left
        $('.layuimini-menu-left .layui-nav.layui-nav-tree.layui-this').addClass('layui-hide');
        $('.layuimini-menu-left .layui-nav.layui-nav-tree.layui-this.layui-hide').removeClass('layui-this');
        $('#' + id).removeClass('layui-hide').addClass('layui-this');
        layer.close(loader);
      });
      /* 菜单缩放 */
      $body.on('click', '.layuimini-site-mobile', function () {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const $icon = $('.layuimini-tool [data-side-fold]'), isHide = $icon.attr('data-side-fold') == 1;
        $icon.attr({'data-side-fold': isHide ? 0 : 1, class: isHide ? 'fa fa-indent' : 'fa fa-outdent'});
        $('.layui-layout-body')[isHide ? 'removeClass' : 'addClass']('layuimini-all')[isHide ? 'addClass' : 'removeClass']('layuimini-mini');
        if (!isHide) layer.close(window.openTips);
        element.init();
        layer.close(loader);
      });
      /* 菜单缩放 */
      $body.on('click', '[data-side-fold]', function () {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const $icon = $('.layuimini-tool [data-side-fold]'), isHide = $icon.attr('data-side-fold') == 1;
        $icon.attr({'data-side-fold': isHide ? 0 : 1, class: isHide ? 'fa fa-indent' : 'fa fa-outdent'});
        $('.layui-layout-body')[isHide ? 'removeClass' : 'addClass']('layuimini-all')[isHide ? 'addClass' : 'removeClass']('layuimini-mini');
        if (!isHide) layer.close(window.openTips);
        element.init();
        layer.close(loader);
      });
      /* 手机端点开模块 */
      $body.on('click', '.layuimini-header-menu.layuimini-mobile-show dd', () => {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const isOk = $('.layuimini-tool [data-side-fold]').attr('data-side-fold') == 1;
        if (isOk) {
          $('.layuimini-site-mobile').trigger('click');
          element.init();
        }
        layer.close(loader);
      });
    }
  };
  exports('menu', menu);
});