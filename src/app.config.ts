import { Config } from '@tarojs/taro';

const config: Config = {
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#D32F2F',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
  },
  pages: [
    'pages/index/index',
    'pages/filter/index',
    'pages/my/index',
    'pages/common/authorization/index',
    'pages/common/window/index',
    'pages/common/dish/index',
    'pages/common/feedback/index',
    'pages/common/favorites/index',
    'pages/common/updateTag/index',
    'pages/common/markedWindow/index',
  ],
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
    custom: true,
  },
  enableShareAppMessage: true,
  enableShareTimeline: true,
};
export default config;
