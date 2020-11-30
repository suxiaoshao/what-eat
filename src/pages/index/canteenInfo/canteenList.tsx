import * as React from 'react';
import { View } from '@tarojs/components';
import { switchTab, usePullDownRefresh } from '@tarojs/taro';
import { AtList, AtListItem, AtLoadMore } from 'taro-ui';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getCanteenCrowded } from '../../../util/http/getCanteenCrowded';
import './canteenInfo.scss';
import { useFilterCanteenId } from '../../../util/store/filter';

export default function CanteenList(props: { none: boolean }): JSX.Element {
  const [fn, loading, errorString, canteenData] = useAsyncFunc(getCanteenCrowded);
  const [, setCanteenId] = useFilterCanteenId();
  React.useEffect(() => {
    fn();
  }, [fn]);
  usePullDownRefresh(() => {
    if (!props.none) {
      fn();
    }
  });
  return (
    <View className='canteen-list' style={props.none ? { display: 'none' } : undefined}>
      {loading || errorString != undefined ? (
        <AtLoadMore
          moreText={`${errorString},请点击重试`}
          status={loading ? 'loading' : 'more'}
          onClick={() => {
            fn();
          }}
        />
      ) : (
        <AtList>
          {canteenData.canteenList.map((value) => (
            <AtListItem
              onClick={() => {
                switchTab({ url: `/pages/filter/index` }).then();
                setCanteenId(value.canteenId);
              }}
              title={value.canteenName}
              extraText={`${value.peoNum}/${value.fullNum}`}
              arrow='right'
              key={value.canteenId}
              note={value.status}
              thumb={require(`../../../assets/canteen/${value.canteenId}.svg`)}
            />
          ))}
        </AtList>
      )}
    </View>
  );
}
