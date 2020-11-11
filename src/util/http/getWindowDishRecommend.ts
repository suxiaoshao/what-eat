import { httpGet } from './main';

export interface GetWindowDishRecommendData {
  windowId: number;
  windowName: string;
  pngSrc: string;
  description: string;
  canteenName: string;
  star: number;
  dish: {
    dishid: number;
    dishName: string;
  }[];
  
}

export async function getUserInfo(
  type: number,
  userId: number,
): Promise<[undefined, GetWindowDishRecommendData] | [string, undefined]> {
  return await httpGet<GetWindowDishRecommendData, { type: number; userId: number }>('/window/dishRecommend', {
    type: type,
    userId: userId,
  });
}
