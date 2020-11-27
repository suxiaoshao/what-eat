import * as React from 'react';
import { View } from '@tarojs/components';
import { switchTab } from '@tarojs/taro';
import { AtList, AtListItem, AtLoadMore } from 'taro-ui';
import { useAsyncFunc } from '../../../util/hook/useAsyncFunc';
import { getCanteenCrowded } from '../../../util/http/getCanteenCrowded';
import './canteenInfo.scss';
import { useFilterCanteenId } from '../../../util/store/filter';

const imageMap = {
  朝阳餐厅: 5,
  丁香园一楼: 7,
  丁香园二楼: 8,
  玫瑰园二楼: 2,
  京元餐厅: 6,
  玫瑰园一楼: 1,
  紫荆园一楼: 3,
  紫荆园二楼: 4,
  教职工食堂: 9,
};

export default function CanteenList(props: { none: boolean }): JSX.Element {
  const [fn, loading, errorString, canteenData] = useAsyncFunc(getCanteenCrowded);
  const [, setCanteenId] = useFilterCanteenId();
  React.useEffect(() => {
    fn();
  }, [fn]);
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
              thumb={require(`../../../assets/canteen/${imageMap[value.canteenName]}.svg`)}
            />
          ))}
        </AtList>
      )}
    </View>
  );
}
