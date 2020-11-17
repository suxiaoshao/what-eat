import { httpPost } from './main';

export interface PostUserUpdateInfoData {
  userId: number;
  preferredList: {
    tagId: number;
    tagName: string;
  }[];
  avoidList: {
    tagId: number;
    tagName: string;
  }[];
}

export async function postUserUpdateInfo(userId: number): Promise<PostUserUpdateInfoData> {
  return await httpPost<PostUserUpdateInfoData, { userId: number }>('/user/updateInfo', { userId: userId });
}
