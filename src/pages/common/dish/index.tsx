import { View } from '@tarojs/components';
import * as React from 'react';
import { AtLoadMore } from 'taro-ui';
import { useRouter } from '@tarojs/taro';
import './index.scss';
import { GetDishInfoData, getDishInfo } from '../../../util/http/getDishInfo';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import DishScore from './dishScore/dishScore';
import DishTagList from './dishTag/dishTagList';
import DishUserStar from './dishUserStar/dishUserStar';

export default function Dish() {
  // 获取路由数据
  const router = useRouter<{ dishId: string }>();
  // 获取dish id
  const dishId = React.useMemo<number>(() => {
    return parseInt(router.params.dishId);
  }, [router.params.dishId]);
  // 用户id
  const [userId] = useUserId();
  const [fn, loading, errorString, dishData, setDishData] = useAsyncFunc<GetDishInfoData>(async () => {
    return await getDishInfo(dishId, userId);
  }, [dishId, userId]);
  // 页面载入时网络请求
  React.useEffect(() => {
    fn();
  }, [fn]);
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
          <DishTagList
            dishId={dishId}
            {...dishData}
            onUpdateDishTag={(newValue) => {
              const newDishData = { ...dishData };
              newDishData.tagList = newValue;
              setDishData(newDishData);
            }}
          />
          <DishUserStar
            onChangeUserStar={(newValue) => {
              const newDishData = { ...dishData };
              newDishData.userStar = newValue;
              setDishData(newDishData);
            }}
            dishId={dishId}
            {...dishData}
          />
        </React.Fragment>
      )}
    </View>
  );
}
