import * as React from 'react';
import { View } from '@tarojs/components';
import { AtProgress, AtRate } from 'taro-ui';
import './dishScore.scss';

export default function DishScore(props: { star: number; starNum: number[] }): JSX.Element {
  const totalNum = React.useMemo<number>(() => {
    let sum = 0;
    props.starNum.forEach((value) => {
      sum += value;
    });
    return sum;
  }, [props.starNum]);
  return (
    <View className='dish-star'>
      <View className='dish-star-top'>吃点啥评分</View>
      <View className='dish-star-content'>
        <View className='dish-star-value'>
          {props.star.toFixed(1)}
          <AtRate size={12} value={props.star} />
        </View>
        <View className='dish-star-detail'>
          {[...props.starNum].reverse().map((value, index) => {
            return (
              <View key={index} className='dish-star-detail-item'>
                <AtRate size={10} value={0} max={5 - index} />
                <AtProgress
                  strokeWidth={8}
                  isHidePercent
                  className='dish-star-progress'
                  percent={totalNum !== 0 ? (value / totalNum) * 100 : 0}
                  color='#FFCA3E'
                />
              </View>
            );
          })}
        </View>
      </View>
      <View className='dish-star-bottom'>{totalNum}人评分</View>
    </View>
  );
}
