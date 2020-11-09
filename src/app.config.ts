import { Config } from '@tarojs/taro';

const config: Config = {
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ec524b',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
  },
  pages: ['pages/index/index', 'pages/filter/index', 'pages/my/index','pages/common/authorization/index'],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/filter/index',
        text: '筛选',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
    custom:true
  },
};
export default config;
