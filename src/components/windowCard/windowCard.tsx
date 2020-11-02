import * as React from 'react';
import { Image, View } from '@tarojs/components';
import { AtDivider } from 'taro-ui';
import './windowCard.scss';

interface WindowCardProps {
  src: string;
  star: number;
  name: string;
  desc: string;
  windowsId: number;
  dishList: { name: string; dishId: number }[];
}

export default function WindowCard(props:WindowCardProps): JSX.Element {
  return (
    <View className='window-card'>
      <View className='main'>
        <Image src='https://pic2.zhimg.com/50/v2-c2b82cbfbd74c2b012d5d1ee4fcb8c63_hd.jpg' />
      </View>
      <AtDivider height={1} className='divider' />
    </View>
  );
}
