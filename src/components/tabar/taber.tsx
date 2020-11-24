import * as React from 'react';
import { AtTabBar } from 'taro-ui';
import { useRouter, switchTab } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './taber.scss';

const routerList = ['/pages/index/index', '/pages/filter/index', '/pages/my/index'];
export default function Taber(props: { children: React.ReactNode; className: string }) {
  const router = useRouter();
  return (
    <View className='tab-bar-main'>
      <View className={`page-main ${props.className}`}>{props.children}</View>
      <AtTabBar
        className='tab-tab'
        selectedColor='#D32F2F'
        current={routerList.indexOf(router.path)}
        tabList={[
          { title: '首页', iconType: 'home' },
          { title: '筛选', iconType: 'filter' },
          { title: '我的', iconType: 'user' },
        ]}
        onClick={(value) => {
          switchTab({
            url: routerList[value],
          }).then();
        }}
      />
    </View>
  );
}
