import { httpGet } from './main';
import { AllTagData } from './getUserInfo';

export interface CanteenData {
  canteenId: number;
  canteenName: string;
}

export interface SystemInfoData {
  tags: AllTagData[];
  canteens: CanteenData[];
}

export async function getSystemInfo(): Promise<SystemInfoData> {
  const systemInfoData = await httpGet<SystemInfoData, {}>('/system/getInfo', {});
  systemInfoData.tags = systemInfoData.tags.sort((a, b) => {
    return b.tagNum - a.tagNum;
  });
  return systemInfoData;
}
