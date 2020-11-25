import { View } from '@tarojs/components';
import * as React from 'react';
import { AtSearchBar } from 'taro-ui';
import './filter-Navigation.scss';
import { useButtonRect, useStatusBarHeight } from '../../../util/store/size';

export default function FilterNavigation(props: {
  className: string;
  children: React.ReactNode;
  searchContent: string;
  onSearchContentChange(newValue: string): void;
  onSearch(): void;
}): JSX.Element {
  const [statusBarHeight] = useStatusBarHeight();
  const [buttonRect] = useButtonRect();
  return (
    <View className='navigation'>
      <View className='navigation-bar' style={{ height: `${buttonRect.bottom + 7}px` }}>
        <View
          className='navigation-button'
          style={{
            marginTop: `${statusBarHeight}px`,
            width: `${buttonRect.left - 7}px`,
            height: `${buttonRect.height + 14}px`,
          }}
        >
          <AtSearchBar
            className='filter-search'
            value={props.searchContent}
            onChange={(value) => {
              props.onSearchContentChange(value);
            }}
            onActionClick={() => {
              props.onSearch();
            }}
          />
        </View>
      </View>
      <View
        className={props.className}
        style={{ height: `calc(100% - ${buttonRect.bottom + 7}px)`, paddingTop: `${buttonRect.bottom + 7}px` }}
      >
        {props.children}
      </View>
    </View>
  );
}
