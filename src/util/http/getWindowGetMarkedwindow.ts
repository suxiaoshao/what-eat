import { httpGet } from './main';

export interface GetWindowgetMarkedWindowData {
  windowList: {
    windowId: number;
    windowName: string;
    pngSrc: string;
    description: string;
    mapSrc: string;
    canteenName: string;
    star: number;
    dish: {
      Name: string;
      Id: number;
    }[];
  }[];
}

export async function getWindowGetMarkedwindow(userId: number): Promise<GetWindowgetMarkedWindowData> {
  return await httpGet<GetWindowgetMarkedWindowData, { userId: number }>('/window/getMarkedWindow', { userId: userId });
}
