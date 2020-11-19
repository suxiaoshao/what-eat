import { httpPost } from './main';
import { TagData } from './getUserInfo';

export interface PostUserUpdateInfoData {
  userId: number;
  preferredList: TagData[];
  avoidList: TagData[];
}

export async function postUserUpdateInfo(
  userId: number,
  preferredList: TagData[],
  avoidList: TagData[],
): Promise<PostUserUpdateInfoData> {
  return await httpPost<
    PostUserUpdateInfoData,
    {
      userId: number;
      preferredList: TagData[];
      avoidList: TagData[];
    }
  >('/user/updateInfo', { userId: userId, preferredList: preferredList, avoidList: avoidList });
}
