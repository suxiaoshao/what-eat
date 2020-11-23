import { View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro';
import * as React from 'react';
import { AtSearchBar } from 'taro-ui';
import './filter-Navigation.scss';

export default function FilterNavigation(props: {
  className: string;
  children: React.ReactNode;
  searchContent: string;
  onSearchContentChange(newValue: string): void;
  onSearch():void
}): JSX.Element {
  const [statusBarHeight] = React.useState<number>(getSystemInfoSync().statusBarHeight);
  const [buttonRect] = React.useState<getMenuButtonBoundingClientRect.Rect>(getMenuButtonBoundingClientRect());
  return (
    <View className='navigation'>
      <View className='navigation-bar' style={{ flex: `0 0 ${buttonRect.bottom + 7}px` }}>
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
            onActionClick={()=>{
              props.onSearch()
            }}
          />
        </View>
      </View>
      <View className={`navigation-main ${props.className}`}>{props.children}</View>
    </View>
  );
}
