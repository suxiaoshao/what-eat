import { httpGet } from './main';

export interface GetWindowlistData {
  windowList: {
    windowId: number;
    windowName: string;
    pngSrc: string;
    description: string;
    mapSrc: string;
    canteenName: string;
    star: number;
    tags: number[];
    isMarked: boolean;
    dish: {
      dishName: string;
      dishId: number;
      price: number;
      star: number;
    }[];
  }[];
}

export async function getUserInfo(windowId: number, userId: number): Promise<GetWindowlistData> {
  return await httpGet<GetWindowlistData, { windowId: number; userId: number }>('/window/list', {
    windowId: windowId,
    userId: userId,
  });
}
