import { httpGet } from './main';

export interface GetUserInfoData {
  preferredList: {
    tagId: number;
    tagName: string;
  }[];
  avoidList: {
    tagId: number;
    tagName: string;
  }[];
}

export async function getUserInfo(userId: number): Promise<GetUserInfoData> {
  return await httpGet<GetUserInfoData, { userId: number }>('/user/getInfo', { userId: userId });
}
