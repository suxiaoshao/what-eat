import { httpGet } from './main';

export interface AllTagData {
  tagId: number;
  tagName: string;
  tagNum: number;
}

export interface TagData{
  tagId: number;
  tagName: string;
}

export interface GetUserInfoData {
  preferredList: TagData[];
  avoidList: TagData[];
  allList: TagData[];
}

export async function getUserInfo(userId: number): Promise<GetUserInfoData> {
  return await httpGet<GetUserInfoData, { userId: number }>('/user/getInfo', { userId: userId });
}
