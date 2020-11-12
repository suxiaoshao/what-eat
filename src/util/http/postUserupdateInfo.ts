import { httpPost } from './main';

export interface PostUserupdateInfoData {
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

export async function postUserupdateInfo(userId: number): Promise<PostUserupdateInfoData> {
  return await httpPost<PostUserupdateInfoData, { userId: number }>('/user/updateInfo', { userId: userId });
}
