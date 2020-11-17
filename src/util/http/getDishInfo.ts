import { httpGet } from './main';

export interface DishTag {
  tagId: number;
  tagNum: number;
  hasTagged: boolean;
  tagName: string;
}

export interface GetDishInfoData {
  dishName: string;
  price: number;
  userStar: number;
  star: number;
  starNum: number[];
  tagList: DishTag[];
}

export async function getDishInfo(dishId: number, userId: number): Promise<GetDishInfoData> {
  return await httpGet<GetDishInfoData, { dishId: number; userId: number }>('/dish/getDishInfo', {
    dishId: dishId,
    userId: userId,
  });
}
