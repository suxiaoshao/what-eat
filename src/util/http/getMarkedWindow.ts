import { httpGet } from './main';

export interface GetMarkedWindowData {
  windowList: {
    windowId: number;
    windowName: string;
    pngSrc: string;
    description: string;
    canteenName: string;
    star: number;
    dish: {
      dishName: string;
      dishId: number;
    }[];
  }[];
}

export async function getMarkedWindow(userId: number): Promise<GetMarkedWindowData> {
  return await httpGet<GetMarkedWindowData, { userId: number }>('/window/getMarkedWindow', { userId: userId });
}
