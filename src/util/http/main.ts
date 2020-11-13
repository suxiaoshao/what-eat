import { request } from '@tarojs/taro';

const httpBaseUrl = 'http://127.0.0.1:9527';

export interface HttpData<T> {
  code: number;
  data: T;
}

export function httpGet<T, U>(url: string, data: U): Promise<T> {
  return new Promise<T>((resolve, reject: (string) => void) => {
    request<HttpData<T>, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'GET',
      success: (value: request.SuccessCallbackResult<HttpData<T>>) => {
        if (value.statusCode === 200) {
          resolve(value.data.data);
        }
        reject('网络错误');
      },
      fail: () => {
        reject('网络错误');
      },
    });
  });
}

export function httpPost<T, U>(url: string, data: U): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request<HttpData<T>, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'POST',
      success: (value: request.SuccessCallbackResult<HttpData<T>>) => {
        if (value.statusCode === 200) {
          resolve(value.data.data);
        } else {
          reject('网络错误');
        }
      },
      fail: () => {
        reject('网络错误');
      },
    });
  });
}
