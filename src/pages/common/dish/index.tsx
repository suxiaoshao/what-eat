import { View } from '@tarojs/components';
import * as React from 'react';
import './index.scss';

export default function Dish() {
  return <View className='dish'>
  <View className='dish-star'></View>
  <View className='dish-tag-list'></View>
  <View className='dish-info'></View>
  <View className='dish-price'></View>
  <View className='dish-user-star'></View>
  
  </View>
}