import * as React from 'react';
import { Text, View } from '@tarojs/components';
import { AtAvatar, AtIcon, AtList, AtListItem } from 'taro-ui';
import { navigateTo } from '@tarojs/taro';
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
          <View
            className='grid-item'
            onClick={() => {
              navigateTo({ url: '/pages/common/favorites/index' }).then();
            }}
          >
            <AtIcon value='heart-2' size={35} color='#D32F2F' />
            <Text className='grid-text'>最爱的菜</Text>
          </View>
          <View
            className='grid-item'
            onClick={() => {
              navigateTo({ url: '/pages/common/markedWindow/index' }).then();
            }}
          >
            <AtIcon value='star-2' size={35} color='#FFAB40' />
            <Text className='grid-text'>收藏窗口</Text>
          </View>
          <View
            className='grid-item'
            onClick={() => {
              navigateTo({ url: '/pages/common/feedback/index' }).then();
            }}
          >
            <AtIcon value='mail' size={35} />
            <Text className='grid-text'>反馈</Text>
          </View>
        </View>
      </View>
      <View className='bottom'>
        <AtList>
          <AtListItem
            title='喜欢标签'
            arrow='right'
            onClick={() => {
              navigateTo({ url: '/pages/common/updateTag/index?mode=0' }).then();
            }}
          />
          <AtListItem
            title='忌口标签'
            arrow='right'
            onClick={() => {
              navigateTo({ url: '/pages/common/updateTag/index?mode=1' }).then();
            }}
          />
        </AtList>
      </View>
    </Taber>
  );
}
