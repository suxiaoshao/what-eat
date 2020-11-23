import { httpPost } from './main';

export interface UpdateMarkedWindowData {}

export async function postUpdateMarkedWindow(windowId: number, userId: number): Promise<UpdateMarkedWindowData> {
  return await httpPost<UpdateMarkedWindowData, { windowId: number; userId: number }>('/window/updateMarkedWindow', {
    windowId: windowId,
    userId: userId,
  });
}
