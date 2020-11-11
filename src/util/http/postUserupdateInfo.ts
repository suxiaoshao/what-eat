import { httpPost } from './main';

export interface PostUserupdateInfoData{
    userId: number;
    preferredList: {
        tagId: number;
        tagName: string;
      }[];
      avoidList: {
        tagId: number;
        tagName: string;
      }[];
};

export async function postUserlogin(userId: number): Promise<[undefined, PostUserupdateInfoData] | [string, undefined]>{
    return await httpPost<PostUserupdateInfoData, { userId: number }>('/user/updateInfo', { userId: userId });
}
