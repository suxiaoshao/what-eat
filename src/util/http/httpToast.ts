import { showToast, hideLoading, showLoading, hideToast } from '@tarojs/taro';

export function httpToast<T>(func: () => Promise<T>, successString: string): Promise<T> {
  showLoading().then();
  return func()
    .then((value) => {
      hideToast({
        fail:(res)=>{
          console.log(res)
        }
      });
      hideLoading({
        fail:res => {
          console.log(res)
        }
      });
      showToast({ title: successString }).then();
      return value;
    })
    .catch((err) => {
      showToast({ title: `${err}`, image: require('../../assets/fail.svg') }).then();
      throw '';
    });
}
