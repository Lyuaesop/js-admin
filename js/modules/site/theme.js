/* 主题框架扩展 */
layui.define(['jquery', 'layer'], function (exports) {
  const $ = layui.$, layer = layui.layer;
  const theme = {
    /**
     * 主题配置项
     * @param index
     * @returns {{headerLogo, menuLeftHover, headerRight, menuLeft, headerRightThis, menuLeftThis}|*|*[]}
     */
    config: index => {
      const bgColorConfig = [
        {
          headerRightBg: '#ffffff', //头部右侧背景色
          headerRightBgThis: '#e4e4e4', //头部右侧选中背景色,
          headerRightColor: 'rgba(107, 107, 107, 0.7)', //头部右侧字体颜色,
          headerRightChildColor: 'rgba(107, 107, 107, 0.7)', //头部右侧下拉字体颜色,
          headerRightColorThis: '#565656', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(160, 160, 160, 0.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#1E9FFF', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#565656', //头部缩放按钮样式,
          headerLogoBg: '#192027', //logo背景颜色,
          headerLogoColor: 'rgb(191, 187, 187)', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#28333E', //左侧菜单背景,
          leftMenuBgThis: '#1E9FFF', //左侧菜单选中背景,
          leftMenuChildBg: '#0c0f13', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#1e9fff' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#23262e', //头部右侧背景色
          headerRightBgThis: '#0c0c0c', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#0c0c0c', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#23262e', //左侧菜单背景,
          leftMenuBgThis: '#737373', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#23262e' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#ffa4d1', //头部右侧背景色
          headerRightBgThis: '#bf7b9d', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#ffa4d1', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#e694bd', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#1f1f1f', //左侧菜单背景,
          leftMenuBgThis: '#737373', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#ffa4d1' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#1aa094', //头部右侧背景色
          headerRightBgThis: '#197971', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#0c0c0c', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#23262e', //左侧菜单背景,
          leftMenuBgThis: '#1aa094', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#1aa094' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#1e9fff', //头部右侧背景色
          headerRightBgThis: '#0069b7', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#1e9fff', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#0c0c0c', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#1f1f1f', //左侧菜单背景,
          leftMenuBgThis: '#1e9fff', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#1e9fff' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#ffb800', //头部右侧背景色
          headerRightBgThis: '#d09600', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#243346', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#2f4056', //左侧菜单背景,
          leftMenuBgThis: '#8593a7', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#ffb800' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#e82121', //头部右侧背景色
          headerRightBgThis: '#ae1919', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#0c0c0c', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#1f1f1f', //左侧菜单背景,
          leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#e82121' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#963885', //头部右侧背景色
          headerRightBgThis: '#772c6a', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#243346', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#2f4056', //左侧菜单背景,
          leftMenuBgThis: '#586473', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#963885' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#2D8CF0', //头部右侧背景色
          headerRightBgThis: '#0069b7', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#0069b7', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#0069b7', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#1f1f1f', //左侧菜单背景,
          leftMenuBgThis: '#2D8CF0', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#2d8cf0' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#ffb800', //头部右侧背景色
          headerRightBgThis: '#d09600', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#d09600', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#2f4056', //左侧菜单背景,
          leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#ffb800' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#e82121', //头部右侧背景色
          headerRightBgThis: '#ae1919', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#d91f1f', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#1f1f1f', //左侧菜单背景,
          leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#e82121' //tab选项卡选中颜色,
        },
        {
          headerRightBg: '#963885', //头部右侧背景色
          headerRightBgThis: '#772c6a', //头部右侧选中背景色,
          headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
          headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
          headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
          headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
          headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
          headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
          headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
          headerLogoBg: '#772c6a', //logo背景颜色,
          headerLogoColor: '#ffffff', //logo字体颜色,
          leftMenuNavMore: 'rgb(191, 187, 187)', //左侧菜单更多下拉样式,
          leftMenuBg: '#2f4056', //左侧菜单背景,
          leftMenuBgThis: '#626f7f', //左侧菜单选中背景,
          leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
          leftMenuColor: 'rgb(191, 187, 187)', //左侧菜单字体颜色,
          leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
          tabActiveColor: '#963885' //tab选项卡选中颜色,
        }
      ];
      if (index === undefined) return bgColorConfig;
      return bgColorConfig[index];
    },
    /**
     * 初始化
     * @param options
     */
    render: options => {
      options.listen = options.listen || false;
      options.bgColorDefault = options.bgColorDefault || false;
      let index = sessionStorage.getItem('layuiminiBgcolorId');
      if (index === null || index === undefined || index === '') index = options.bgColorDefault;
      theme.buildThemeCss(index);
      if (options.listen) theme.listen(options);
    },
    /**
     * 构建主题样式
     * @param index
     * @returns {boolean}
     */
    buildThemeCss: index => {
      if (!index) return false;
      const data = theme.config(index);
      let style = `.layui-layout-admin .layui-header{background-color:${data.headerRightBg}!important}`;
      style += `.layui-layout-admin .layui-header .layuimini-header-content>ul>.layui-nav-item.layui-this,.layuimini-tool i:hover{background-color:${data.headerRightBgThis}!important}`;
      style += `.layui-layout-admin .layui-header .layui-nav .layui-nav-item a{color:${data.headerRightColor}}`;
      style += `.layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child a{color:${data.headerRightChildColor}!important}`;
      style +=
        `.layui-header .layuimini-menu-header-pc.layui-nav .layui-nav-item a:hover,.layui-header .layuimini-header-menu.layuimini-pc-show.layui-nav .layui-this a{color:${data.headerRightColorThis}!important}`;
      style += `.layui-header .layui-nav .layui-nav-more{border-top-color:${data.headerRightNavMore}!important}`;
      style += `.layui-header .layui-nav .layui-nav-mored,.layui-header .layui-nav-itemed>a .layui-nav-more{border-color:transparent transparent ${data.headerRightNavMore}!important}`;
      style +=
        `.layui-header .layui-nav .layui-nav-child dd.layui-this a,.layui-header .layui-nav-child dd.layui-this,.layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child .layui-this a{background-color:${data.headerRightNavMoreBg}!important;color:${data.headerRightNavMoreColor}!important}`;
      style += `.layui-layout-admin .layui-header .layuimini-tool i{color:${data.headerRightToolColor}}`;
      style += `.layui-layout-admin .layuimini-logo{background-color:${data.headerLogoBg}!important}`;
      style += `.layui-layout-admin .layuimini-logo h1{color:${data.headerLogoColor}}`;
      style += `.layuimini-menu-left .layui-nav .layui-nav-more,.layuimini-menu-left-zoom.layui-nav .layui-nav-more{border-top-color:${data.leftMenuNavMore}}`;
      style +=
        `.layuimini-menu-left .layui-nav .layui-nav-mored,.layuimini-menu-left .layui-nav-itemed>a .layui-nav-more,.layuimini-menu-left-zoom.layui-nav .layui-nav-mored,.layuimini-menu-left-zoom.layui-nav-itemed>a .layui-nav-more{border-color: transparent transparent${data.leftMenuNavMore}!important}`;
      style += `.layui-side.layui-bg-black,.layui-side.layui-bg-black>.layuimini-menu-left>ul,.layuimini-menu-left-zoom>ul{background-color:${data.leftMenuBg}!important}`;
      style +=
        `.layuimini-menu-left .layui-nav-tree .layui-this,.layuimini-menu-left .layui-nav-tree .layui-this>a,.layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this, .layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this a,.layuimini-menu-left-zoom.layui-nav-tree .layui-this,.layuimini-menu-left-zoom.layui-nav-tree .layui-this>a,.layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this,.layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this a{background-color:${data.leftMenuBgThis}!important}`;
      style += `.layuimini-menu-left .layui-nav-itemed>.layui-nav-child{background-color:${data.leftMenuChildBg}!important}`;
      style += `.layuimini-menu-left .layui-nav .layui-nav-item a,.layuimini-menu-left-zoom.layui-nav .layui-nav-item a{color:${data.leftMenuColor}!important}`;
      style +=
        `.layuimini-menu-left .layui-nav .layui-nav-item a:hover,.layuimini-menu-left .layui-nav .layui-this a,.layuimini-menu-left-zoom.layui-nav .layui-nav-item a:hover,.layuimini-menu-left-zoom.layui-nav .layui-this a{color:${data.leftMenuColorThis}!important}`;
      style += `.layuimini-tab .layui-tab-title .layui-this .layuimini-tab-active{background-color:${data.tabActiveColor}}`;
      $('#layuimini-bg-color').html(style);
    },
    /**
     * 构建主题选择html
     * @param options
     * @returns {string}
     */
    buildBgColorHtml: options => {
      options.bgColorDefault = options.bgColorDefault || 0;
      let index = parseInt(sessionStorage.getItem('layuiminiBgcolorId'));
      if (isNaN(index)) index = options.bgColorDefault;
      const config = theme.config();
      let html = '';
      $.each(config, function (i, v) {
        if (i === index) {
          html += `<li class='layui-this' data-select-bgcolor='${i}'>`;
        } else {
          html += `<li data-select-bgcolor='${i}'>`;
        }
        html += `<a href='javascript:void(0);' data-skin='skin-blue' class='clearfix full-opacity-hover'>`;
        html +=
          `<div><span style='display:block;width:20%;float:left;height:12px;background:${v.headerLogoBg}'></span><span style='display:block;width:80%;float:left;height:12px;background:${v.headerRightBg}'></span></div>`;
        html +=
          `<div><span style='display:block;width:20%;float:left;height:40px;background:${v.leftMenuBg}'></span><span style='display:block;width:80%;float:left;height:40px;background:#ffffff'></span></div></a></li>`;
      });
      return html;
    },
    /**
     * 监听
     * @param options
     */
    listen: function (options) {
      const $body = $('body');
      $body.on('click', '[theme-bgcolor]', function () {
        const loader = layer.load(0, {shade: false, time: 2 * 1000});
        const clientHeight = (document.documentElement.clientHeight) - 60;
        const bgColorHtml = theme.buildBgColorHtml(options);
        const html = `<div class='layuimini-color'><div class='color-title'><span>${Site.i18n.theme_color}</span></div><div class='color-content'><ul>${bgColorHtml}</ul></div>`;
        layer.open({
          type: 1, title: false, closeBtn: 0, shade: 0.2, anim: 2, shadeClose: true,
          id: 'layuiminiBgColor', area: ['340px', clientHeight + 'px'], offset: 'rb', content: html,
          end: () => $('.layuimini-select-bgcolor').removeClass('layui-this')
        });
        layer.close(loader);
      });
      $body.on('click', '[data-select-bgcolor]', function () {
        const index = $(this).attr('data-select-bgcolor');
        $('.layuimini-color .color-content ul .layui-this').attr('class', '');
        $(this).attr('class', 'layui-this');
        sessionStorage.setItem('layuiminiBgcolorId', index);
        theme.render({bgColorDefault: index, listen: false});
      });
    }
  };
  exports('theme', theme);
});