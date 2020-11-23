import * as React from 'react';
import { getUserInfo, login, redirectTo } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import 'taro-icons/scss/MaterialIcons.scss';
import { ThisUserInfo, useUserId, useUserInfo } from './util/store/user';
import './app.scss';
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
    login().then((e) => {
      httpToast(async () => {
        return await postUserlogin(e.code);
      }, '登入成功').then((data) => {
        setUserId(data.userId);
      });
    });
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
