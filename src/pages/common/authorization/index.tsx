import * as React from 'react';
import { Button, Image, Text, View } from '@tarojs/components';
import { reLaunch } from '@tarojs/taro';
import './index.scss';
import { ThisUserInfo, useUserInfo } from '../../../util/store/user';

export default function Index(): JSX.Element {
  const [, setUserInfo] = useUserInfo();
  return (
    <View className='authorization'>
      <View className='image'>
        <Image className='src' src={require('../../../assets/logo.png')} />
      </View>
      <View className='content'>
        <View className='info'>
          <Text className='title'>吃点儿啥小程序</Text>
          <Text className='desc'>福大校内美食推荐</Text>
        </View>
        <View className='features'>
          <View className='features-item'>
            <Image className='icon' src={require('../../../assets/think.svg')} />
            <Text className='desc'>think less</Text>
          </View>
          <View className='features-item'>
            <Image className='icon' src={require('../../../assets/eat.svg')} />
            <Text className='desc'>eat better</Text>
          </View>
        </View>
        <Button
          className='button'
          size='default'
          openType='getUserInfo'
          hoverClass='button-hover'
          onGetUserInfo={(e) => {
            if (e.detail.userInfo !== undefined) {
              const userInfo: ThisUserInfo = {
                userAvatars: e.detail.userInfo.avatarUrl,
                userName: e.detail.userInfo.nickName,
              };
              setUserInfo(userInfo);
              reLaunch({ url: '/pages/index/index' }).then();
            }
          }}
        >
          <Text className='button-content'>授权用户信息</Text>
        </Button>
      </View>
    </View>
  );
}
