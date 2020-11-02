import * as React from 'react';
import { View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui';
import 'taro-ui/dist/style/components/button.scss';
import './index.scss';

export default function Index(): JSX.Element {
  return (
    <View className='index'>
      <AtSearchBar value='' onChange={() => {}} />
    </View>
  );
}
