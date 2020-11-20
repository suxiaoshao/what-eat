import { request } from '@tarojs/taro';

const httpBaseUrl = 'http://123.56.51.120';

export const errorInfo = {
  '-1': '系统繁忙',
  '0': '成功',
  '1001': '缺少相关参数',
  '2001': '更新菜品星级失败',
  '2002': '更新用户信息失败',
  '2003': '更新收藏窗口失败',
  '3001': '增添菜品星级失败',
  '3002': '增添反馈信息失败',
  '40029': 'code 无效',
};

export interface HttpData<T> {
  code: number;
  data: T;
}

export function httpBase<T, U>(url: string, data: U, method: 'GET' | 'POST'): Promise<T> {
  return new Promise<T>((resolve, reject: (string) => void) => {
    request<HttpData<T>, U>({
      url: httpBaseUrl + url,
      data: data,
      method: method,
      success: (value: request.SuccessCallbackResult<HttpData<T>>) => {
        if (value.statusCode === 200 && value.data.code === 0) {
          resolve(value.data.data);
        } else if (value.data.code !== 0) {
          reject(errorInfo[String(value.data.code)] ?? '系统错误');
        }
        reject('网络错误');
      },
      fail: () => {
        reject('网络错误');
      },
      timeout: 8000,
    });
  });
}

export async function httpGet<T, U>(url: string, data: U): Promise<T> {
  return await httpBase<T, U>(url, data, 'GET');
}

export async function httpPost<T, U>(url: string, data: U): Promise<T> {
  return await httpBase<T, U>(url, data, 'POST');
}
