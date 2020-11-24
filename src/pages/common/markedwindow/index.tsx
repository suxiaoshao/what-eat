import { View } from '@tarojs/components';
import * as React from 'react';
import { AtLoadMore } from 'taro-ui';
import { usePullDownRefresh } from '@tarojs/taro';
import './index.scss';
import { useUserId } from '../../../util/store/user';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getMarkedWindow } from '../../../util/http/getMarkedWindow';
import WindowCard from '../../../components/windowCard/windowCard';

export default function MarkedWindow() {
  const [userId] = useUserId();
  const [fn, loading, errorString, windowList] = useAsyncFunc(async () => {
    return await getMarkedWindow(userId);
  }, [userId]);
  React.useEffect(() => {
    fn();
  }, [fn]);
  usePullDownRefresh(() => {
    fn();
  });
  return (
    <View className='marked-window'>
      {loading || errorString !== undefined || windowList.windowList.length === 0 ? (
        <AtLoadMore
          moreText={`${errorString},请点击重试`}
          status={loading ? 'loading' : errorString !== undefined ? 'more' : 'noMore'}
          onClick={() => {
            fn();
          }}
        />
      ) : (
        <React.Fragment>
          {windowList.windowList.map((value) => {
            return <WindowCard {...value} key={value.windowId} />;
          })}
        </React.Fragment>
      )}
    </View>
  );
}
