import * as React from 'react';
import { useState } from 'react';
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { AtTabs } from 'taro-ui';
import { View } from '@tarojs/components';
import './index.scss';
import Taber from '../../components/tabar/taber';
import IndexList from './indexList';
import CanteenList from './canteenInfo/canteenList';

export default function Index(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  useShareTimeline(() => {
    return {
      imageUrl: require('../../assets/mini.png'),
    };
  });
  useShareAppMessage(() => {
    return {
      imageUrl: require('../../assets/mini.png'),
    };
  });
  return (
    <Taber className='index'>
      <AtTabs
        current={tab}
        tabList={[{ title: '热门' }, { title: '推荐' }, { title: '食堂拥挤' }]}
        onClick={(index) => {
          setTab(index);
        }}
        className='index-tab'
      />
      <View className='index-main'>
        <IndexList type={2} none={tab !== 0} />
        <IndexList type={1} none={tab !== 1} />
        <CanteenList none={tab !== 2} />
      </View>
    </Taber>
  );
}
