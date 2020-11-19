import * as React from 'react';
import { getUserInfo, redirectTo, login } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import 'taro-icons/scss/MaterialIcons.scss';
import { ThisUserInfo, useUserId, useUserInfo } from './util/store/user';
import './app.scss';
import { postUserlogin } from './util/http/postUserlogin';

function App(props: { children: React.ReactNode }) {
  const [, setUserInfo] = useUserInfo();
  const [, setUserId] = useUserId();
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
        redirectTo({ url: '/pages/common/authorization/index' });
      });
    login().then((e) => {
      console.log(e.code);
      postUserlogin(e.code)
        .then((userId) => {
          setUserId(userId.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [setUserId, setUserInfo]);
  return props.children;
}

export default App;
