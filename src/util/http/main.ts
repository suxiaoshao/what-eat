import { request } from '@tarojs/taro';

const httpBaseUrl = 'http://127.0.0.1:9527';

export function httpGet<T, U>(url: string, data: U): Promise<[undefined, T] | [string, undefined]> {
  return new Promise<[undefined, T] | [string, undefined]>((resolve) => {
    request<T, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'GET',
      success: (value) => {
        if (value.statusCode === 200) {
          resolve([undefined, value.data]);
        }
        resolve(['网络错误', undefined]);
      },
      fail: () => {
        resolve(['网络错误', undefined]);
      },
    });
  });
}

export function httpPost<T, U>(url: string, data: U): Promise<[undefined, T] | [string, undefined]> {
  return new Promise<[undefined, T] | [string, undefined]>((resolve) => {
    request<T, U>({
      url: httpBaseUrl + url,
      data: data,
      method: 'POST',
      success: (value) => {
        if (value.statusCode === 200) {
          resolve([undefined, value.data]);
        } else {
          resolve(['网络错误', undefined]);
        }
      },
      fail: () => {
        resolve(['网络错误', undefined]);
      },
    });
  });
}
