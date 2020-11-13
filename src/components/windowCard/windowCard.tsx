import * as React from 'react';
import { Image, Text, View } from '@tarojs/components';
import { AtButton, AtTag } from 'taro-ui';
import { navigateTo } from '@tarojs/taro';
import './windowCard.scss';

interface WindowCardProps {
  pngSrc: string;
  star: number;
  windowName: string;
  description: string;
  windowId: number;
  dish: { dishName: string; dishId: number }[];
  canteenName: string;
}

export default function WindowCard(props: WindowCardProps): JSX.Element {
  return (
    <View
      className='window-card'
      onClick={() => {
        navigateTo({url: `/pages/common/window/index?windowId=${props.windowId}`}).then();
      }}
    >
      <View className='window-main'>
        <View className='left'>
          <Image src={props.pngSrc} />
        </View>
        <View className='desc'>
          <View className='title-star'>
            <Text className='title'>{props.windowName}</Text>
            <AtButton size='small'>窗口反馈</AtButton>
          </View>
          <View className='title-star'>
            <Text className='canteen'>{props.canteenName}</Text>
            <Text className='star'>{props.star}分</Text>
          </View>
          <View className='desc-content'>{props.description}</View>
        </View>
      </View>
      <View className='dish-list-feedback'>
        {props.dish.map((value) => (
          <AtTag className='dish' size='small' key={value.dishId} active>
            {value.dishName}
          </AtTag>
        ))}
      </View>
    </View>
  );
}
