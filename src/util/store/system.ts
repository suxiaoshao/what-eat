import { createUseStoreFunc } from './store';
import { AllTagData } from '../http/getUserInfo';
import { CanteenData } from '../http/getSystemInfo';

export const useTagList = createUseStoreFunc<AllTagData[]>([]);

export const useCanteenList = createUseStoreFunc<CanteenData[]>([]);
