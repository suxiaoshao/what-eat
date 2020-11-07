import * as React from 'react';
import { View } from '@tarojs/components';
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
          desc={
            '一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的一家好吃的'
          }
          dishList={[
            { dishId: 1, name: '饭饭饭饭饭饭' },
            { dishId: 2, name: '菜菜菜菜菜菜' },
            { dishId: 3, name: '肉肉肉肉肉肉肉' },
          ]}
          name={
            '饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店饭店'
          }
          src={'https://pic2.zhimg.com/50/v2-c2b82cbfbd74c2b012d5d1ee4fcb8c63_hd.jpg'}
          star={3.7}
          windowsId={1}
          canteen='玫瑰园'
        />
      </View>
    </View>
  );
}
