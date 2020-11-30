import { AtLoadMore } from 'taro-ui';
import * as React from 'react';
import { usePullDownRefresh } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { GetWindowDishRecommendData, getWindowRecommend } from '../../util/http/getWindowRecommend';
import { useAsyncFunc } from '../../util/hook/useAsyncFunc';
import { useUserId } from '../../util/store/user';
import WindowCard from '../../components/windowCard/windowCard';

export default function IndexList(props: { type: number; none: boolean }): JSX.Element {
  const [userId] = useUserId();
  const [fn, loading, errorString, recommendData] = useAsyncFunc<GetWindowDishRecommendData>(async () => {
    return await getWindowRecommend(props.type, userId);
  }, [userId]);
  React.useEffect(() => {
    if (userId !== -1) {
      fn();
    }
  }, [fn]);
  usePullDownRefresh(() => {
    if (!props.none) {
      fn();
    }
  });
  return (
    <View style={props.none ? { display: 'none' } : undefined} className='index-list'>
      {loading || errorString != undefined ? (
        <AtLoadMore
          moreText={`${errorString},请点击重试`}
          status={loading ? 'loading' : 'more'}
          onClick={() => {
            fn();
          }}
        />
      ) : (
        recommendData.windowList.map((value) => <WindowCard {...value} key={value.windowId} />)
      )}
    </View>
  );
}
