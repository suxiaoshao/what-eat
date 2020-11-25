import { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro';
import { createUseStoreFunc } from './store';

export const useStatusBarHeight = createUseStoreFunc<number>(getSystemInfoSync().statusBarHeight);
export const useButtonRect = createUseStoreFunc(getMenuButtonBoundingClientRect());
