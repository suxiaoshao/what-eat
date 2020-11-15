import { View, Text } from '@tarojs/components';
import { getSystemInfoSync, getMenuButtonBoundingClientRect, showToast, navigateBack, navigateTo } from '@tarojs/taro';
import * as React from 'react';
import { AtIcon } from 'taro-ui';
import { useUserId } from '../../../../util/store/user';
import './window-Navigation.scss';
import { postUpdateMarkedWindow } from '../../../../util/http/postUpdateMarkedWindow';
import MyIcon from '../../../../components/myIcon';

export default function WindowNavigation(props: {
  className: string;
  children: React.ReactNode;
  windowId: number;
  isMarked: boolean;
  windowName: string | undefined;
  onChangeMarked: (value: boolean) => void;
}): JSX.Element {
  const [statusBarHeight] = React.useState<number>(getSystemInfoSync().statusBarHeight);
  const [buttonRect] = React.useState<getMenuButtonBoundingClientRect.Rect>(getMenuButtonBoundingClientRect());
  const [userId] = useUserId();
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
          <AtIcon
            className='navigation-back'
            value='chevron-left'
            color='#ffffff'
            onClick={() => {
              navigateBack();
            }}
          />
          {props.windowName ? <Text className='navigation-title'>{props.windowName}</Text> : undefined}
          <View className='navigation-right-icon'>
            <MyIcon
              value='new-releases'
              size={26}
              color='#FFE0B2'
              onClick={() => {
                navigateTo({ url: '/pages/common/feedback/index' }).then();
              }}
            />
            {props.isMarked ? (
              <AtIcon
                className='navigation-star'
                value='star-2'
                color='#FFAB40'
                onClick={() => {
                  postUpdateMarkedWindow(props.windowId, userId)
                    .then(() => {
                      showToast({ title: '成功取消收藏' }).then();
                      props.onChangeMarked(false);
                    })
                    .catch((err) => {
                      showToast({ title: `${err},请重试`, image: require('../../../../assets/fail.svg') }).then();
                    });
                }}
              />
            ) : (
              <AtIcon
                className='navigation-star'
                value='star'
                color='#ffffff'
                onClick={() => {
                  postUpdateMarkedWindow(props.windowId, userId)
                    .then(() => {
                      showToast({ title: '成功收藏' });
                      props.onChangeMarked(true);
                    })
                    .catch((err) => {
                      showToast({ title: `${err},请重试`, image: require('../../../../assets/fail.svg') });
                    });
                }}
              />
            )}
          </View>
        </View>
      </View>
      <View className={`navigation-main ${props.className}`}>{props.children}</View>
    </View>
  );
}
