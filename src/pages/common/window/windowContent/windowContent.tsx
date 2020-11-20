import * as React from 'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { navigateTo, pageScrollTo } from '@tarojs/taro';
import './windowContent.scss';
import { DishItem, Tag } from '../../../../util/http/getWindowInfo';

export default function WindowContent(props: { tags: Tag[]; dishes: DishItem[] }): JSX.Element {
  const [activeTagIndex, setActiveTagIndex] = React.useState<number>(-1);
  const [dishList, setDishList] = React.useState<DishItem[]>(props.dishes);
  React.useEffect(() => {
    if (activeTagIndex !== -1) {
      const newList = props.dishes.filter((item) => {
        return item.tags.some((item2) => {
          return item2.tagId === props.tags[activeTagIndex].tagId;
        });
      });
      setDishList(newList);
    } else {
      setDishList(props.dishes);
    }
  }, [activeTagIndex, props.dishes, props.tags]);
  React.useEffect(() => {
    pageScrollTo({ selector: '.window-dish-list' }).then();
  }, [dishList]);
  return (
    <View className='window-content'>
      <View className='window-tag-list'>
        <View
          className={`tag-item${-1 === activeTagIndex ? ' tag-item-active' : ''}`}
          onClick={() => {
            setActiveTagIndex(-1);
          }}
        >
          全部
        </View>
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
              extraText={`${Number(value.star).toFixed(1)}分`}
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
