import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import * as React from 'react';
import { AtLoadMore } from 'taro-ui';
import './index.scss';
import WindowNavigation from './navigation/windowNavigation';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getWindowInfo, GetWindowInfoData } from '../../../util/http/getWindowInfo';
import { useUserId } from '../../../util/store/user';

export default function Window() {
  const router = useRouter<{ windowId: string }>();
  const [windowData, setWindowData] = React.useState<undefined | GetWindowInfoData>(undefined);
  const windowId = React.useMemo<number>(() => {
    return parseInt(router.params.windowId);
  }, [router.params.windowId]);
  const [userId] = useUserId();
  const [fn, loading, errorString, httpWindowData] = useAsyncFunc<GetWindowInfoData>(async () => {
    return await getWindowInfo(windowId, userId);
  }, [windowId, userId]);
  React.useEffect(() => {
    fn();
  }, [fn]);
  React.useEffect(() => {
    setWindowData(httpWindowData);
  }, [httpWindowData]);
  return (
    <WindowNavigation
      onChangeMarked={(value) => {
        const newWindowData = { ...windowData };
        newWindowData.isMarked = value;
        setWindowData(newWindowData);
      }}
      windowId={windowId}
      className='window'
      isMarked={windowData === undefined ? false : windowData.isMarked}
    >
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
          <View className='window-desc'></View>
          <View className='window-jt'>
            <View className='tag-list'></View>
            <View className='dish-list'></View>
          </View>
        </React.Fragment>
      )}
    </WindowNavigation>
  );
}
