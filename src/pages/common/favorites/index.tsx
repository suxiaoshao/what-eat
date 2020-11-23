import { View } from '@tarojs/components';
import * as React from 'react';
import { navigateTo } from '@tarojs/taro';
import { AtList, AtListItem, AtLoadMore } from 'taro-ui';
import './index.scss';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getDishFavorites } from '../../../util/http/getDishFavorites';

export default function Favorites() {
  const [userId] = useUserId();
  const [fn, loading, errorString, dishList] = useAsyncFunc(async () => {
    return await getDishFavorites(userId);
  });
  React.useEffect(() => {
    fn();
  }, [userId]);
  return (
    <View className='favorites'>
      {loading || errorString !== undefined || dishList.dishList.length === 0 ? (
        <AtLoadMore
          moreText={`${errorString},请点击重试`}
          status={loading ? 'loading' : errorString !== undefined ? 'more' : 'noMore'}
          onClick={() => {
            fn();
          }}
        />
      ) : (
        <AtList>
          {dishList.dishList.map((value) => {
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
      )}
    </View>
  );
}
