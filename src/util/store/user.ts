import { createUseStoreFunc } from './store';

export interface useUserInfo {
  userName: string;
  userAvatars: string;
  userId: number;
}

export const useUserInfo = createUseStoreFunc<useUserInfo>({
  userAvatars: '',
  userName: '',
  userId: -1,
});
