import * as React from 'react';
import { View, Ad } from '@tarojs/components';
import * as Taro from '@tarojs/taro';
import './index.scss';
import WindowCard from '../../components/windowCard/windowCard';

export default function Index(): JSX.Element {
  React.useEffect(() => {
    Taro.login()
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
    // Taro.getUserInfo()
    //   .then((e) => {
    //     console.log(e);
    //   })
    //   .catch((e) => {
    //     Taro.redirectTo({ url: '/pages/common/authorization/index' }).catch();
    //   });
  }, []);
  return (
    <View className='index'>
      <View className='window-list'>
        <WindowCard
          desc={''}
          dishList={[]}
          name={''}
          src={'https://pic2.zhimg.com/50/v2-c2b82cbfbd74c2b012d5d1ee4fcb8c63_hd.jpg'}
          star={5}
          windowsId={1}
        />
      </View>
    </View>
  );
}
