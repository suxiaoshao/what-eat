import { request } from '@tarojs/taro';

const httpBaseUrl = 'http://123.56.51.120';

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
        } else if (value.data.code !== 0) {
          reject(String(value.data.code));
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

export function httpPost<T, U>(url: string, data: U): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request<HttpData<T>, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'POST',
      success: (value: request.SuccessCallbackResult<HttpData<T>>) => {
        if (value.statusCode === 200) {
          resolve(value.data.data);
        } else if (value.data.code !== 0) {
          reject(String(value.data.code));
        } else {
          reject('网络错误');
        }
      },
      fail: () => {
        reject('网络错误');
      },
      timeout: 8000,
    });
  });
}
