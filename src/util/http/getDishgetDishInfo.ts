import { httpGet } from './main';

export interface GetdishgetDishInfoData {
  dishName: string;
  price: number;
  userStar: number;
  star: number;
  starNum: number[];
  tagList: {
    tagId: number;
    tagNum: number;
    hasTagged: boolean;
  }[];
}

export async function getUserInfo(dishId:number): Promise<[undefined, GetdishgetDishInfoData ] | [string, undefined]> {
  return await httpGet<GetdishgetDishInfoData , {dishId:number}>('/dish/getDishInfo', {dishId:dishId});
}
