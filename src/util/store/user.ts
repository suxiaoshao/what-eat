import { createUseStoreFunc } from './store';

export interface ThisUserInfo {
  userName: string;
  userAvatars: string;
}

export const useUserInfo = createUseStoreFunc<ThisUserInfo>({
  userAvatars: '',
  userName: '',
});

export const useUserId = createUseStoreFunc<number>(-1);
