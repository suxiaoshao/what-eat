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

export async function getDishgetDishInfo(dishId: number): Promise<GetdishgetDishInfoData> {
  return await httpGet<GetdishgetDishInfoData, { dishId: number }>('/dish/getDishInfo', { dishId: dishId });
}
