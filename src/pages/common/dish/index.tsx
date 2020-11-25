import { View } from '@tarojs/components';
import * as React from 'react';
import { AtLoadMore, AtTag } from 'taro-ui';
import { navigateTo, usePullDownRefresh, useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import './index.scss';
import { getDishInfo, GetDishInfoData } from '../../../util/http/getDishInfo';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import DishScore from './dishScore/dishScore';
import DishTagList from './dishTag/dishTagList';
import DishUserStar from './dishUserStar/dishUserStar';
import MyIcon from '../../../components/myIcon';

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
  usePullDownRefresh(() => {
    fn();
  });
  useShareAppMessage((payload) => {
    console.log(payload);
    return {
      title: `「${dishData.windowName}」的「${dishData.dishName}」很不错呦~`,
    };
  });
  useShareTimeline(() => {
    return {
      title: `「${dishData.windowName}」的「${dishData.dishName}」很不错呦~`,
    };
  });
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
            <View className='dish-info-line'>
              <View className='dish-name'>{dishData.dishName}</View>
              <MyIcon
                value='feedback'
                size={30}
                color='#78909C'
                onClick={() => {
                  navigateTo({
                    url: `/pages/common/feedback/index?windowName=${dishData.windowName}&dishName=${dishData.dishName}`,
                  }).then();
                }}
              />
            </View>
            <View className='dish-info-line'>
              <AtTag
                active
                size='small'
                className='dish-window'
                onClick={() => {
                  navigateTo({ url: `/pages/common/window/index?windowId=${dishData.windowId}` }).then();
                }}
              >
                {dishData.windowName}
              </AtTag>
              <View className='dish-price'>{dishData.price}元</View>
            </View>
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
