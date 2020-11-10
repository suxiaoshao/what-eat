import * as React from 'react';
import { Text, View } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import './index.scss';
import Taber from '../../components/tabar/taber';
import { useUserInfo } from '../../util/store/user';

export default function Index(): JSX.Element {
  const [userInfo] = useUserInfo();
  return (
    <Taber className='my'>
      <View className='top'>
        <View className='user-info'>
          <AtAvatar image={userInfo.userAvatars} size='large' circle />
          <Text className='name'>{userInfo.userName}</Text>
        </View>
        <View className='grid'>
          <View className='grid-item'>
            <AtIcon value='heart-2' size={40} color='#D32F2F' />
            <Text className='grid-text'>最爱的菜</Text>
          </View>
          <View className='grid-item'>
            <AtIcon value='star-2' size={40} color='#FFAB40' />
            <Text className='grid-text'>收藏窗口</Text>
          </View>
          <View className='grid-item'>
            <AtIcon value='mail' size={40} />
            <Text className='grid-text'>反馈</Text>
          </View>
        </View>
      </View>
      <View className='bottom'></View>
    </Taber>
  );
}
