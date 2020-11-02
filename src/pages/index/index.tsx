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
        <WindowCard />
      </View>
    </View>
  );
}
