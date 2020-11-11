import { httpPost } from './main';

export interface PostDishUpdateDishStarData {
    
}
export async function postUserlogin(userId: number,dishId:number,star:number): Promise<[undefined, PostDishUpdateDishStarData] | [string, undefined]>{
    return await httpPost<PostDishUpdateDishStarData, { userId: number,dishId:number,star:number}>('/dish/updateDishStar', { userId: userId ,dishId:dishId,star:star});
}
