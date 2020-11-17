import * as React from 'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { pageScrollTo, navigateTo } from '@tarojs/taro';
import './windowContent.scss';
import { DishItem, Tag } from '../../../../util/http/getWindowInfo';

export default function WindowContent(props: { tags: Tag[]; dish: DishItem[] }): JSX.Element {
  const [activeTagIndex, setActiveTagIndex] = React.useState<number>(0);
  const [dishList, setDishList] = React.useState<DishItem[]>(props.dish);
  React.useEffect(() => {
    const newList = props.dish
      ?.filter(() => {
        return Math.random() > 0.5;
      })
      ?.reverse();
    setDishList(newList);
  }, [activeTagIndex, props.dish]);
  React.useEffect(() => {
    pageScrollTo({ selector: '.window-dish-list' }).then();
  }, [dishList]);
  return (
    <View className='window-content'>
      <View className='window-tag-list'>
        {props.tags?.map((value, index) => {
          return (
            <View
              className={`tag-item${index === activeTagIndex ? ' tag-item-active' : ''}`}
              key={value.tagId}
              onClick={() => {
                setActiveTagIndex(index);
              }}
            >
              {value.tagName}
            </View>
          );
        })}
      </View>
      <AtList className='window-dish-list'>
        {dishList?.map((value) => {
          return (
            <AtListItem
              key={value.dishId}
              title={value.dishName}
              note={`${value.price}元`}
              extraText={`${value.star}分`}
              arrow='right'
              onClick={() => {
                navigateTo({ url: `/pages/common/dish/index?dishId=${value.dishId}` }).then();
              }}
            />
          );
        })}
      </AtList>
    </View>
  );
}
