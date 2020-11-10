import * as React from 'react';
import { View } from '@tarojs/components';
import { AtSegmentedControl } from 'taro-ui';
import { useState } from 'react';
import { getUserInfo, redirectTo } from '@tarojs/taro';
import './index.scss';
import WindowCard from '../../components/windowCard/windowCard';
import Taber from '../../components/tabar/taber';
import { ThisUserInfo, useUserInfo } from '../../util/store/user';

export default function Index(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [, setUserInfo] = useUserInfo();
  React.useEffect(() => {
    getUserInfo()
      .then((e) => {
        const userInfo: ThisUserInfo = {
          userName: e.userInfo.nickName,
          userAvatars: e.userInfo.avatarUrl,
        };
        setUserInfo(userInfo);
      })
      .catch(() => {
        redirectTo({ url: '/pages/common/authorization/index' });
      });
  }, [setUserInfo]);
  return (
    <Taber className='index'>
      <AtSegmentedControl
        selectedColor='#ff9a8c'
        current={tab}
        values={['推荐', '热门', '近期热门']}
        onClick={(index) => {
          setTab(index);
        }}
      />
      <View className='window-list'>
        <WindowCard
          desc='一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的'
          dishList={[
            { dishId: 1, name: '饭饭饭饭饭饭' },
            { dishId: 2, name: '菜菜菜菜菜菜' },
            { dishId: 3, name: '肉肉肉肉肉肉肉' },
          ]}
          name='饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店'
          src='https://pic2.zhimg.com/50/v2-c2b82cbfbd74c2b012d5d1ee4fcb8c63_hd.jpg'
          star={3.7}
          windowsId={1}
          canteen='玫瑰园'
        />
      </View>
    </Taber>
  );
}
