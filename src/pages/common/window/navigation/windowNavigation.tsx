import { Text, View } from '@tarojs/components';
import { navigateBack, navigateTo, switchTab } from '@tarojs/taro';
import * as React from 'react';
import { AtIcon } from 'taro-ui';
import { useUserId } from '../../../../util/store/user';
import './window-Navigation.scss';
import { postUpdateMarkedWindow } from '../../../../util/http/postUpdateMarkedWindow';
import MyIcon from '../../../../components/myIcon';
import { httpToast } from '../../../../util/http/httpToast';
import { useButtonRect, useStatusBarHeight } from '../../../../util/store/size';

export default function WindowNavigation(props: {
  className: string;
  children: React.ReactNode;
  windowId: number;
  isMarked: boolean;
  windowName: string | undefined;
  onChangeMarked: (value: boolean) => void;
}): JSX.Element {
  const [statusBarHeight] = useStatusBarHeight();
  const [buttonRect] = useButtonRect();
  const [userId] = useUserId();
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
          <AtIcon
            className='navigation-back'
            value='chevron-left'
            color='#ffffff'
            onClick={() => {
              navigateBack({ delta: 1 })
                .then()
                .catch((e) => {
                  switchTab({ url: '/pages/index/index' }).then();
                });
            }}
            size={30}
          />
          {props.windowName ? <Text className='navigation-title'>{props.windowName}</Text> : undefined}
          <View className='navigation-right-icon'>
            <MyIcon
              value='new-releases'
              size={30}
              color='#FFE0B2'
              onClick={() => {
                navigateTo({ url: `/pages/common/feedback/index?windowName=${props.windowName}` }).then();
              }}
            />
            {props.windowName ? (
              <MyIcon
                size={30}
                className='navigation-star'
                value={props.isMarked ? 'star' : 'star-border'}
                color='#FFAB40'
                onClick={() => {
                  httpToast<{}>(
                    async () => {
                      return await postUpdateMarkedWindow(props.windowId, userId);
                    },
                    props.isMarked ? '取消收藏成功' : '收藏成功',
                  ).then(() => {
                    props.onChangeMarked(!props.isMarked);
                  });
                }}
              />
            ) : undefined}
          </View>
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
