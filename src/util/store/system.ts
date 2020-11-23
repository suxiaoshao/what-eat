import { createUseStoreFunc } from './store';
import { TagData } from '../http/getUserInfo';
import { CanteenData } from '../http/getSystemInfo';

export const useTagList = createUseStoreFunc<TagData[]>([]);

export const useCanteenList = createUseStoreFunc<CanteenData[]>([]);
