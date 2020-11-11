import { httpPost } from './main';

export interface PostUserloginData{
    userId: number;
    hasRegistered: boolean;
};

export async function postUserlogin(code: string): Promise<[undefined, PostUserloginData] | [string, undefined]>{
    return await httpPost<PostUserloginData, { code: string }>('/user/login', { code: code });
}
