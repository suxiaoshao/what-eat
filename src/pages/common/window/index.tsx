import { View } from '@tarojs/components';
import * as React from 'react';
import './index.scss';

export default function Window() {
  return <View className='window'>
    <View className='window-desc'></View>
    <View className='window-jt'>
      <View className='tag-list'></View>
      <View className='dish-list'></View>
    </View>
  </View>;
}
