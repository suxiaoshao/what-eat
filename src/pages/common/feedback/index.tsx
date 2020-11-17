import { Button, View } from '@tarojs/components';
import * as React from 'react';
import { AtTextarea } from 'taro-ui';
import { useRouter, navigateBack } from '@tarojs/taro';
import './index.scss';
import { postUserFeedback } from '../../../util/http/postUserFeedback';
import { useUserId } from '../../../util/store/user';
import { httpToast } from '../../../util/http/httpToast';

export default function Feedback() {
  const [userId] = useUserId();
  const router = useRouter<{ dishName?: string; windowName?: string }>();
  const preText = React.useMemo<string>(() => {
    if (router.params.windowName === undefined) {
      return '';
    } else if (router.params.dishName === undefined) {
      return `对"${router.params.windowName}":`;
    } else {
      return `对"${router.params.windowName}"的"${router.params.dishName}":`;
    }
  }, [router]);
  const [userText, setUserText] = React.useState<string>('');
  React.useEffect(() => {
    setUserText(preText);
  }, [preText]);
  return (
    <View className='feedback'>
      <AtTextarea
        height={200}
        value={userText}
        onChange={(value) => {
          setUserText(value);
        }}
        maxLength={200}
        className='feedback-input'
      />
      <Button
        className='feedback-button'
        type='primary'
        onClick={() => {
          httpToast(async () => {
            return await postUserFeedback(userId, userText);
          }, '成功发送').then(() => {
            setTimeout(() => {
              navigateBack().then();
            }, 1000);
          });
        }}
      >
        发送
      </Button>
    </View>
  );
}
