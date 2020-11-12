import { request } from '@tarojs/taro';

const httpBaseUrl = 'http://127.0.0.1:9527';

export function httpGet<T, U>(url: string, data: U): Promise<T> {
  return new Promise<T>((resolve, reject: (string) => void) => {
    request<T, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'GET',
      success: (value) => {
        if (value.statusCode === 200) {
          resolve(value.data);
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
    request<T, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'POST',
      success: (value) => {
        if (value.statusCode === 200) {
          resolve(value.data);
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
