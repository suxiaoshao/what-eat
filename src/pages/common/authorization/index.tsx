import * as React from 'react';
import { View, Image, Button, Text } from '@tarojs/components';
import { reLaunch } from '@tarojs/taro';
import 'taro-ui/dist/style/components/button.scss';
import './index.scss';

export default function Index(): JSX.Element {
  return (
    <View className='authorization'>
      <View className='image'>
        <Image className='src' src={require('../../../assets/logo.png')} />
      </View>
      <View className='content'>
        <View className='info'>
          <Text className='title'>
            吃点儿啥小程序
          </Text>
          <Text className='desc'>
            福大校内美食推荐
          </Text>
        </View>
        <Button
          className='button'
          size='default'
          type='primary'
          openType='getUserInfo'
          onGetUserInfo={(e) => {
            if (e.detail.userInfo !== undefined) {
              reLaunch({ url: '/pages/index/index' });
            }
          }}
        >
          <Text className='button-content'>授权用户信息</Text>
        </Button>
      </View>
    </View>
  );
}
