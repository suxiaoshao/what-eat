import * as React from 'react';
import { Image, Text, View } from '@tarojs/components';
import { AtButton, AtTag } from 'taro-ui';
import './windowCard.scss';

interface WindowCardProps {
  src: string;
  star: number;
  name: string;
  desc: string;
  windowsId: number;
  dishList: { name: string; dishId: number }[];
  canteen: string;
}

export default function WindowCard(props: WindowCardProps): JSX.Element {
  return (
    <View className='window-card'>
      <View className='window-main'>
        <View className='left'>
          <Image src={props.src} />
        </View>
        <View className='desc'>
          <View className='title-star'>
            <Text className='title'>{props.name}</Text>
            <AtButton size='small'>窗口反馈</AtButton>
          </View>
          <View className='title-star'>
            <Text className='canteen'>{props.canteen}</Text>
            <Text className='star'>{props.star}分</Text>
          </View>
          <View className='desc-content'>{props.desc}</View>
        </View>
      </View>
      <View className='dish-list-feedback'>
        {props.dishList.map((value) => (
          <AtTag className='dish' size='small' key={value.dishId} active>
            {value.name}
          </AtTag>
        ))}
      </View>
    </View>
  );
}
