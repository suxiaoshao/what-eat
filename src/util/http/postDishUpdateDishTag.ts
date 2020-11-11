import { httpPost } from './main';

export interface PostDishUpdateDishTagData{
    dishName: string,
        tagId: number,
        count: number,
        markedTag:boolean
};

export async function postUserlogin(userId: number,dishId:number,tagId:number): Promise<[undefined, PostDishUpdateDishTagData] | [string, undefined]>{
    return await httpPost<PostDishUpdateDishTagData, { userId: number,dishId:number,tagId:number}>('/dish/updateDishTag', { userId: userId ,dishId:dishId,tagId:tagId});
}
