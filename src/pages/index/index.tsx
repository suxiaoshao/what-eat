import * as React from 'react';
import { View } from '@tarojs/components';
import { AtLoadMore, AtSegmentedControl } from 'taro-ui';
import { useState } from 'react';
import './index.scss';
import WindowCard from '../../components/windowCard/windowCard';
import Taber from '../../components/tabar/taber';
import { useAsyncFunc } from '../../util/hook/useAsyncFunc';
import { getWindowRecommend, GetWindowDishRecommendData } from '../../util/http/getWindowRecommend';

export default function Index(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [fn, loading, errorString, data] = useAsyncFunc<GetWindowDishRecommendData>(async () => {
    return await getWindowRecommend(1, 1);
  });
  React.useEffect(() => {
    fn();
  }, []);
  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Taber className='index'>
      <View className='main'>
        <AtSegmentedControl
          current={tab}
          values={['推荐', '热门', '近期热门']}
          onClick={(index) => {
            setTab(index);
          }}
        />
        {loading || errorString != undefined ? (
          <AtLoadMore moreText={`${errorString},请点击重试`} status={loading ? 'loading' : 'more'} />
        ) : (
          data.windowList.map((value) => <WindowCard {...value} key={value.windowId} />)
        )}
      </View>
    </Taber>
  );
}
