import { useRouter } from '@tarojs/taro';
import * as React from 'react';
import { AtLoadMore } from 'taro-ui';
import './index.scss';
import WindowNavigation from './navigation/windowNavigation';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getWindowInfo, GetWindowInfoData } from '../../../util/http/getWindowInfo';
import { useUserId } from '../../../util/store/user';
import WindowDesc from './windowDesc/windowDesc';
import WindowContent from './windowContent/windowContent';

export default function Window() {
  const router = useRouter<{ windowId: string }>();
  const windowId = React.useMemo<number>(() => {
    return parseInt(router.params.windowId);
  }, [router.params.windowId]);
  const [userId] = useUserId();
  const [fn, loading, errorString, windowData, setWindowData] = useAsyncFunc<GetWindowInfoData>(async () => {
    return await getWindowInfo(windowId, userId);
  }, [windowId, userId]);
  React.useEffect(() => {
    fn();
  }, []);
  return (
    <WindowNavigation
      windowName={windowData?.windowName}
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
          <WindowDesc {...windowData} />
          <WindowContent {...windowData} />
        </React.Fragment>
      )}
    </WindowNavigation>
  );
}
