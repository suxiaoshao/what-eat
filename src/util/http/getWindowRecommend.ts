import { httpGet } from './main';

export interface GetWindowDishRecommendData {
  windowList:{
    windowId: number;
    windowName: string;
    pngSrc: string;
    description: string;
    canteenName: string;
    star: number;
    dish: {
      dishId: number;
      dishName: string;
    }[];
  }[]
}

export async function getWindowRecommend(type: number, userId: number): Promise<GetWindowDishRecommendData> {
  return await httpGet<GetWindowDishRecommendData, { type: number; userId: number }>('/window/recommend', {
    type: type,
    userId: userId,
  });
}
