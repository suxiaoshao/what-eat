import * as React from 'react';
import { getUserInfo, login, redirectTo,navigateTo } from '@tarojs/taro';
import './app.scss';
import { ThisUserInfo, useUserId, useUserInfo } from './util/store/user';
import { postUserlogin } from './util/http/postUserlogin';
import { httpToast } from './util/http/httpToast';
import { getSystemInfo } from './util/http/getSystemInfo';
import { useCanteenList, useTagList } from './util/store/system';

function App(props: { children: React.ReactNode }) {
  const [, setUserInfo] = useUserInfo();
  const [, setUserId] = useUserId();
  const [, setTagList] = useTagList();
  const [, setCanteenList] = useCanteenList();
  React.useEffect(() => {
    /* 获取用户头像 */
    getUserInfo()
      .then((e) => {
        const userInfo: ThisUserInfo = {
          userName: e.userInfo.nickName,
          userAvatars: e.userInfo.avatarUrl,
        };
        setUserInfo(userInfo);
      })
      .catch(() => {
        redirectTo({ url: '/pages/common/authorization/index' }).then();
      });

    /* 获取用户id 及跳转 */
    login()
      .then((e) => {
        return httpToast(async () => {
          return await postUserlogin(e.code);
        }, '登入成功');
      })
      .then((data) => {
        setUserId(data.userId);
        if (!data.hasRegistered) {
          return navigateTo({ url: '/pages/common/updateTag/index' });
        }
      });

    /* 获取系统信息*/
    httpToast(async () => {
      return await getSystemInfo();
    }, '获取系统信息成功').then((data) => {
      setTagList(data.tags);
      setCanteenList(data.canteens);
    });
  }, [setUserId, setUserInfo]);
  return props.children;
}

export default App;
