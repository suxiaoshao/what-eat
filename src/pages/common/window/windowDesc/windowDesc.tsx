import { Image, Text, View } from '@tarojs/components';
import * as React from 'react';
import { AtFloatLayout } from 'taro-ui';
import './windowDesc.scss';

export default function WindowDesc(props: {
  windowName: string;
  pngSrc: string;
  description: string;
  mapSrc: string;
  star: number;
  canteenName: string;
}): JSX.Element {
  const [open, setOpen] = React.useState<boolean>();
  return (
    <View className='window-desc'>
      <View className='window-desc-top'>
        <View className='window-desc-top-text'>
          <Text className='window-desc-title'>{props.windowName}</Text>
          <View className='window-desc-canteen-star'>
            <Text className='window-desc-canteen'>{props.canteenName}</Text>
            <Text className='window-desc-star'>{props.star.toFixed(1)}分</Text>
          </View>
        </View>
        <Image className='window-desc-top-image' src={props.pngSrc} />
      </View>
      <View className='window-desc-desc'>{props.description}</View>
      <View
        className='window-desc-more'
        onClick={() => {
          setOpen(true);
        }}
      >
        展开更多
      </View>
      <AtFloatLayout
        title='详细信息'
        isOpened={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <View className='window-desc-map-title'>描述</View>
        <View className='window-desc-map-content'>{props.description}</View>
        <View className='window-desc-map-title'>地图指引</View>
        <Image src={props.mapSrc} className='window-desc-map-image' />
      </AtFloatLayout>
    </View>
  );
}
