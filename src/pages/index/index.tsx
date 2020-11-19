import * as React from 'react';
import { AtTabs } from 'taro-ui';
import { useState } from 'react';
import { View } from '@tarojs/components';
import './index.scss';
import Taber from '../../components/tabar/taber';
import IndexList from './indexList';

export default function Index(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  return (
    <Taber className='index'>
      <AtTabs
        current={tab}
        tabList={[{ title: '推荐' }, { title: '热门' }, { title: '近期热门' }]}
        onClick={(index) => {
          setTab(index);
        }}
        className='index-tab'
      />
      <View className='index-main'>
        <IndexList type={1} none={tab !== 0} />
        <IndexList type={2} none={tab !== 1} />
        <IndexList type={3} none={tab !== 2} />
      </View>
    </Taber>
  );
}
