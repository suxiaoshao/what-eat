import { httpGet } from './main';

export interface Tag {
  tagName: string;
  tagId: number;
}

export interface DishItem {
  dishName: string;
  dishId: number;
  price: number;
  star: number;
  tags: Tag[];
}

export interface GetWindowInfoData {
  windowId: number;
  windowName: string;
  pngSrc: string;
  description: string;
  mapSrc: string;
  canteenName: string;
  star: number;
  tags: Tag[];
  isMarked: boolean;
  dish: DishItem[];
}

export async function getWindowInfo(windowId: number, userId: number): Promise<GetWindowInfoData> {
  return await httpGet<GetWindowInfoData, { windowId: number; userId: number }>('/window/info', {
    windowId: windowId,
    userId: userId,
  });
}
