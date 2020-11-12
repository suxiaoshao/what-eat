import { httpGet } from './main';

export interface GetsystemgetInfoData {
  tags: {
    tagId: number;
    tagName: string;
  }[];
  canteens: {
    tagId: number;
    tagName: string;
  }[];
}

export async function getUserInfo(): Promise<GetsystemgetInfoData> {
  return await httpGet<GetsystemgetInfoData, {}>('/system/getInfo', {});
}
