import { httpGet } from './main';
import { TagData } from './getUserInfo';

export interface CanteenData {
  canteenId: number;
  canteenName: string;
}

export interface SystemInfoData {
  tags: TagData[];
  canteens: CanteenData[];
}

export async function getSystemInfo(): Promise<SystemInfoData> {
  return await httpGet<SystemInfoData, {}>('/system/getInfo', {});
}
