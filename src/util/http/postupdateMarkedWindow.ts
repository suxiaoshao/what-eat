import { httpPost } from './main';

export interface GetupdateMarkedWindowData {
  
}

export async function getUserInfo(
    windowId: number,
    userId: number,
  ): Promise<[undefined, GetupdateMarkedWindowData] | [string, undefined]> {
    return await httpPost<GetupdateMarkedWindowData, { windowId: number; userId: number }>('/updateMarkedWindow', {
      windowId: windowId,
      userId: userId,
    });
  }
