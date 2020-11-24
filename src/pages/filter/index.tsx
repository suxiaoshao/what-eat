import * as React from 'react';
import { View } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import { usePullDownRefresh } from '@tarojs/taro';
import './index.scss';
import Taber from '../../components/tabar/taber';
import FilterNavigation from './navigation/filterNavigation';
import { useAsyncFunc } from '../../util/hook/useAsyncFunc';
import { getUserSearch } from '../../util/http/getUserSearch';
import FilterForm from './filterForm';
import WindowCard from '../../components/windowCard/windowCard';

export default function Index(): JSX.Element {
  const [searchContent, setSearchContent] = React.useState<string>('');
  const [canteenId, setCanteenId] = React.useState<number | undefined>(undefined);
  const [tagList, setTagList] = React.useState<number[] | undefined>(undefined);
  const [fn, loading, errorString, searchData] = useAsyncFunc(
    async () => {
      return await getUserSearch(searchContent, tagList, canteenId);
    },
    [searchContent, canteenId, tagList],
    [undefined, undefined, { searchList: [] }],
  );
  usePullDownRefresh(() => {
    fn();
  });
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
            tagList={tagList}
            canteenId={canteenId}
            onCanteenIdChange={(value) => {
              setCanteenId(value);
              fn();
            }}
            onTagListChange={(value) => {
              setTagList(value);
              fn();
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
