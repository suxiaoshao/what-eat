import * as React from 'react';
import { Image, Text, View } from '@tarojs/components';
import { AtButton, AtDivider } from 'taro-ui';
import './windowCard.scss';

interface WindowCardProps {
  src: string;
  star: number;
  name: string;
  desc: string;
  windowsId: number;
  dishList: { name: string; dishId: number }[];
}

export default function WindowCard(props: WindowCardProps): JSX.Element {
  return (
    <View className='window-card'>
      <View className='main'>
        <View className='left'>
          <Image src={props.src} />
          <Text>窗口反馈</Text>
        </View>
        <View className='desc'>
          <View className='title-star'>
            <Text className='title'>{props.name}</Text>
            <Text className='star'>{props.star}分</Text>
          </View>
          <Text className='desc-content'>{props.desc}</Text>
          <View className='dish-list-feedback'>
            {props.dishList.map((value) => (
              <AtButton className='dish' type='primary' size='small' key={value.dishId}>
                {value.name}
              </AtButton>
            ))}
          </View>
        </View>
      </View>
      <AtDivider height={1} className='divider' />
    </View>
  );
}
