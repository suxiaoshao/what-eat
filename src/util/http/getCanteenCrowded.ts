import { httpGet } from './main';

export interface CanteenData {
  canteenName: string;
  fullNum: number;
  peoNum: number;
  status: string;
  canteenId: number;
}

export interface CanteenCrowdedData {
  canteenList: CanteenData[];
}

export async function getCanteenCrowded(): Promise<CanteenCrowdedData> {
  return await httpGet<CanteenCrowdedData, {}>('/canteen/crowded', {});
}
