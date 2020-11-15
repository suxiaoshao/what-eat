import { Text, View, Image } from '@tarojs/components';
import * as React from 'react';
import './windowDesc.scss';

export default function WindowDesc(props: {
  windowName: string;
  pngSrc: string;
  description: string;
  mapSrc: string;
  star: number;
  canteenName: string;
}): JSX.Element {
  return (
    <View className='window-desc'>
      <View className='window-desc-top'>
        <View className='window-desc-top-text'>
          <Text className='window-desc-title'>{props.windowName}</Text>
          <View className='window-desc-canteen-star'>
            <Text className='window-desc-canteen'>{props.canteenName}</Text>
            <Text className='window-desc-star'>{props.star}分</Text>
          </View>
        </View>
        <Image className='window-desc-top-image' src={props.pngSrc} />
      </View>
      <View className='window-desc-desc'>{props.description}</View>
      <View className='window-desc-more'>展开更多</View>
    </View>
  );
}
