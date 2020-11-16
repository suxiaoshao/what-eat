import { View } from '@tarojs/components';
import * as React from 'react';
import { AtBadge, AtButton, AtLoadMore } from 'taro-ui';
import { useRouter } from '@tarojs/taro';
import './index.scss';
import { GetDishInfoData, getDishInfo } from '../../../util/http/getDishInfo';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import DishScore from './dishScore/dishScore';

export default function Dish() {
  // 获取路由数据
  const router = useRouter<{ dishId: string }>();
  // 获取dish id
  const dishId = React.useMemo<number>(() => {
    return parseInt(router.params.dishId);
  }, [router.params.dishId]);
  // 用户id
  const [userId] = useUserId();
  const [fn, loading, errorString, dishData] = useAsyncFunc<GetDishInfoData>(async () => {
    return await getDishInfo(dishId, userId);
  }, [dishId, userId]);
  // 页面载入时网络请求
  React.useEffect(() => {
    fn();
  }, [fn]);
  React.useEffect(() => {
    console.log(dishData);
  }, [dishData]);
  return (
    <View className='dish'>
      {loading || errorString != undefined ? (
        <AtLoadMore
          moreText={`${errorString},请点击重试`}
          status={loading ? 'loading' : 'more'}
          onClick={() => {
            fn();
          }}
        />
      ) : (
        <React.Fragment>
          <View className='dish-info'>
            <View className='dish-name'>{dishData.dishName}</View>
            <View className='dish-price'>{dishData.price}元</View>
          </View>
          <DishScore {...dishData} />
          <View className='dish-tag-list'>
            {dishData.tagList.map((item) => {
              return (
                <AtBadge key={item.tagId} value={item.tagNum}>
                  <AtButton size='small' type={item.hasTagged ? 'primary' : undefined}>
                    {item.tagName}
                  </AtButton>
                </AtBadge>
              );
            })}
          </View>
          <View className='dish-user-star'>{dishData.userStar}</View>
        </React.Fragment>
      )}
    </View>
  );
}
