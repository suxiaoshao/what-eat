import { httpGet } from './main';

export interface GetWindowInfoData {
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
}

export async function getWindowInfo(windowId: number, userId: number): Promise<GetWindowInfoData> {
  return await httpGet<GetWindowInfoData, { windowId: number; userId: number }>('/window/info', {
    windowId: windowId,
    userId: userId,
  });
}
