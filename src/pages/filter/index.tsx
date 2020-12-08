import * as React from 'react';
import { View } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import {usePullDownRefresh, useShareAppMessage, useShareTimeline} from '@tarojs/taro';
import './index.scss';
import Taber from '../../components/tabar/taber';
import FilterNavigation from './navigation/filterNavigation';
import { useAsyncFunc } from '../../util/hook/useAsyncFunc';
import { getUserSearch } from '../../util/http/getUserSearch';
import FilterForm from './filterForm';
import WindowCard from '../../components/windowCard/windowCard';
import { useFilterCanteenId } from '../../util/store/filter';

export default function Index(): JSX.Element {
  const [canteenId, setCanteenId] = useFilterCanteenId();
  const [searchContent, setSearchContent] = React.useState<string>('');
  const [tagFilterList, setTagFilterList] = React.useState<number[] | undefined>(undefined);
  const [fn, loading, errorString, searchData] = useAsyncFunc(
    async () => {
      return await getUserSearch(searchContent, tagFilterList, canteenId);
    },
    [searchContent, canteenId, tagFilterList],
    [undefined, undefined, { searchList: [] }],
  );
  React.useEffect(() => {
    if(!(canteenId===undefined && tagFilterList===undefined && searchContent==="")){
      fn();
    }
  }, [canteenId, tagFilterList]);
  usePullDownRefresh(() => {
    fn();
  });
  useShareTimeline(()=>{
    return{
      imageUrl:require("../../assets/mini.png")
    }
  })
  useShareAppMessage(()=>{
    return {
      imageUrl:require("../../assets/mini.png")
    }
  })
  return (
    <Taber className='filter'>
      <FilterNavigation
        className=''
        searchContent={searchContent}
        onSearchContentChange={(value) => {
          setSearchContent(value);
        }}
        onSearch={() => {
          fn();
        }}
      >
        <view className='filter-content'>
          <FilterForm
            tagList={tagFilterList}
            canteenId={canteenId}
            onCanteenIdChange={(value) => {
              setCanteenId(value);
            }}
            onTagListChange={(value) => {
              setTagFilterList(value);
            }}
          />
          <View className='filter-data-list'>
            {loading || errorString !== undefined || searchData.searchList.length === 0 ? (
              <AtLoadMore
                moreText={`${errorString},请点击重试`}
                status={loading ? 'loading' : errorString !== undefined ? 'more' : 'noMore'}
                onClick={() => {
                  fn();
                }}
              />
            ) : (
              searchData.searchList.map((value) => <WindowCard {...value} key={value.windowId} />)
            )}
          </View>
        </view>
      </FilterNavigation>
    </Taber>
  );
}
